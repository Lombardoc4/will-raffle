import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';


import Logo from './summer-festival-tour-lams.png'
import './drawing.css'
import { listRaffleEntries } from './graphql/queries';

export default function Drawing() {
    const [entries, setEntries] = useState([]);
    const [patreons, setPatreons] = useState([]);
    const [nextToken, setNextToken] = useState(null);

    useEffect(() => {
        fetchEntries()
    }, [nextToken])

    useEffect(() => {
        fetchPatreons();
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

    return (
        <div className='drawing'>
          <img src={Logo} alt="The Rat Club" />

            <h2>Polls are closed</h2>

            <div className="entry-list">
                <p>{[...entries, ...patreons].length} Total Entries</p>
                {[...entries, ...patreons].map((entry, index) =>
                    <p key={entry.id + index}>{entry.name}</p>
                )}
            </div>

        </div>
    )
}