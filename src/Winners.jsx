import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';


import Logo from './summer-festival-tour-lams.png'
import './drawing.css'
import { listRaffleEntries, listWinners } from './graphql/queries';
import { createWinner } from './graphql/mutations';

export default function Drawing() {
    const [entries, setEntries] = useState([]);
    const [winners, setWinners] = useState([]);
    const [winner, setWinner] = useState(' ');
    const [patreons, setPatreons] = useState([]);
    const [nextToken, setNextToken] = useState(null);

    useEffect(() => {
        fetchEntries()
    }, [nextToken])

    useEffect(() => {
        fetchPatreons();
        fetchWinners();
    }, [])

    async function fetchPatreons() {
        try {
            // Bug some reason need 10000000 to show full results
            const patreonData = await API.graphql(graphqlOperation(listRaffleEntries, {filter: {patreon: {eq: true}}, limit: 10000000, nextToken: nextToken}))

            // Get DB Entries
            const patreonEntries = patreonData.data.listRaffleEntries.items
            // Seperate Patreons
            setPatreons(patreonEntries.filter((value, index, self) =>
                index === self.findIndex((t) => (t.email === value.email))
            ));
        } catch (err) { console.log('error fetching todos') }
    }

    async function fetchEntries() {
        try {
          const entryData = await API.graphql(graphqlOperation(listRaffleEntries, {limit: 1000, nextToken: nextToken}))

            // Get DB Entries
            const dbEntries = entryData.data.listRaffleEntries.items
            // Seperate Patreons

            // Remove duplicates
            const filteredDoubles = [...entries, ...dbEntries].filter((value, index, self) =>
            index === self.findIndex((t) => (t.email === value.email))
            )

            setEntries(filteredDoubles)

            // If next token add token
            if (entryData.data.listRaffleEntries.nextToken) {
                setNextToken(entryData.data.listRaffleEntries.nextToken);
            }

        } catch (err) { console.log('error fetching todos') }
    }


    async function addWinner(winningEntry) {
        try {
            const newWinner = {
            "name": winningEntry.name,
            "email": winningEntry.email,
            "raffle_id": "October",
            }

            const addedData = await API.graphql(graphqlOperation(createWinner, {input: newWinner}))
            // console.log();
            setWinner(addedData.data.createWinner);

        } catch (err) {
            console.log('error creating todo:', err)
        }
    }



    async function fetchWinners() {
        console.log('get winners')
        try {
          const winnerData = await API.graphql(graphqlOperation(listWinners, {limit: 1000, nextToken: nextToken}))

            const dbWinners = winnerData.data.listWinners.items;

            setWinners([...winners, ...dbWinners])

          if (winnerData.data.listWinners.nextToken) {
            setNextToken(winnerData.data.listWinners.nextToken);
          }
        } catch (err) { console.log('error fetching todos') }
    }


    const generateRandomWinner = () => {
        const allEntries = [...entries, ...patreons]
        const newWinner = allEntries[Math.floor(Math.random()*allEntries.length)];
        setWinners([...winners, newWinner])
        addWinner(newWinner)
    }



    return (
        <div className='drawing'>
          <img src={Logo} alt="The Rat Club" />

            <h2>{winner.name}</h2>
            <p style={{fontSize: '0.66rem'}}>{winner.id}</p>

            <button onClick={() => generateRandomWinner()}>Generate Winner</button>

            <div className="entry-list">
                <p>Total Winners: {winners.length}</p>
                {winners.map((winner, index) =>
                    <p key={winner.id + index}>{winner.name}</p>
                )}
            </div>

        </div>
    )
}