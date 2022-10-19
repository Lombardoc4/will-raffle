import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { RaffleEntry } from './models';


import Logo from './summer-festival-tour-lams.png'
import './drawing.css'
import { listRaffleEntries } from './graphql/queries';

export default function Drawing() {
    const [entries, setEntries] = useState([]);
    const [winner, setWinner] = useState(' ');
    const [nextToken, setNextToken] = useState(null);

    useEffect(() => {
        fetchEntries()
    }, [nextToken])

    async function fetchEntries() {
        console.log('fetch')
        try {
          const entryData = await API.graphql(graphqlOperation(listRaffleEntries, {limit: 1000, nextToken: nextToken}))
          console.log('entryData', entryData.data.listRaffleEntries);

          const dbEntries = entryData.data.listRaffleEntries.items
          setEntries([...entries, ...dbEntries])

          if (entryData.data.listRaffleEntries.nextToken) {
            setNextToken(entryData.data.listRaffleEntries.nextToken);
          }
        } catch (err) { console.log('error fetching todos') }
      }

    const generateRandomWinner = () => {
        setWinner(entries[Math.floor(Math.random()*entries.length)])
    }

    console.log('nextToken', nextToken);

    return (
        <div className='drawing'>
          <img src={Logo} alt="The Rat Club" />

            <h2>{winner.name}</h2>
            <p style={{fontSize: '0.66rem'}}>{winner.id}</p>

            {/* <button onClick={() => generateRandomWinner()}>Generate Winner</button> */}


            <div className="entry-list">
                <p>{entries.length} Total Entries</p>
                {entries.map((entry, index) =>
                    <p key={entry.id + index}>{entry.name}</p>
                )}
            </div>

        </div>
    )
}