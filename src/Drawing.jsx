import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { RaffleEntry } from './models';


import Logo from './summer-festival-tour-lams.png'
import './drawing.css'
import { listRaffleEntries } from './graphql/queries';
import { createWinner } from './graphql/mutations';

export default function Drawing() {
    const [entries, setEntries] = useState([]);
    const [winner, setWinner] = useState(' ');
    const [nextToken, setNextToken] = useState(null);

    useEffect(() => {
        fetchEntries()
    }, [nextToken])

    async function fetchEntries() {
        // console.log('fetch')
        try {
          const entryData = await API.graphql(graphqlOperation(listRaffleEntries, {limit: 1000, nextToken: nextToken}))

            const dbEntries = entryData.data.listRaffleEntries.items
            const filteredDoubles = [...entries, ...dbEntries].filter((value, index, self) =>
                index === self.findIndex((t) => (t.email === value.email))
            )

          setEntries(filteredDoubles)

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

        await API.graphql(graphqlOperation(createWinner, {input: newWinner}))
    } catch (err) {
        console.log('error creating todo:', err)
    }
    }

    const generateRandomWinner = () => {
        const newWinner = entries[Math.floor(Math.random()*entries.length)];
        setWinner(newWinner)
        addWinner(newWinner)
    }


    // console.log('nextToken', nextToken);

    return (
        <div className='drawing'>
          <img src={Logo} alt="The Rat Club" />

            <h2>Polls are closed</h2>
            {/* <h2>{winner.name}</h2> */}
            {/* <p style={{fontSize: '0.66rem'}}>{winner.id}</p> */}

            {/* {window.location.pathname.includes('button') && <button onClick={() => generateRandomWinner()}>Generate Winner</button>} */}

            <div className="entry-list">
                <p>{entries.length} Total Entries</p>
                {entries.map((entry, index) =>
                    <p key={entry.id + index}>{entry.name}</p>
                )}
            </div>

        </div>
    )
}