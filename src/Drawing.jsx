import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import { RaffleEntry } from './models';


import Logo from './summer-festival-tour-lams.png'
import './drawing.css'
import { listRaffleEntries } from './graphql/queries';
import { createWinner } from './graphql/mutations';

export default function Drawing() {
    const [entries, setEntries] = useState([]);
    const [patreons, setPatreons] = useState([]);
    const [nextToken, setNextToken] = useState(null);

    useEffect(() => {
        fetchEntries()
    }, [nextToken])

    async function fetchEntries() {
        try {
          const entryData = await API.graphql(graphqlOperation(listRaffleEntries, {limit: 1000, nextToken: nextToken}))

            // Get DB Entries
            const dbEntries = entryData.data.listRaffleEntries.items
            // Seperate Patreons
            const dbPatreons = dbEntries.filter(e => e.patreon)

            // Remove duplicates
            const filteredDoubles = [...entries, ...dbEntries].filter((value, index, self) =>
            index === self.findIndex((t) => (t.email === value.email))
            )


            // If next token add values, patreons, and token
            if (entryData.data.listRaffleEntries.nextToken) {
                setEntries(filteredDoubles)
                setPatreons([...patreons, ...dbPatreons]);
                setNextToken(entryData.data.listRaffleEntries.nextToken);
            } else {
                // if final search filter duplicate patreons
                const filteredPatreons = patreons.filter((value, index, self) =>
                    index === self.findIndex((t) => (t.email === value.email))
                )

                setEntries([...filteredDoubles, ...filteredPatreons])
            }

        } catch (err) { console.log('error fetching todos') }
    }



    return (
        <div className='drawing'>
          <img src={Logo} alt="The Rat Club" />

            <h2>Polls are closed</h2>

            <div className="entry-list">
                <p>{entries.length} Total Entries</p>
                {entries.map((entry, index) =>
                    <p key={entry.id + index}>{entry.name}</p>
                )}
            </div>

        </div>
    )
}