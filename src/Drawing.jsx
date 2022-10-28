import { useEffect, useState } from 'react';
import { API, graphqlOperation } from 'aws-amplify';


import Logo from './imgs/pwd-festival-set-lists.png'
import './drawing.css'
import { conf } from './conf';
import { usePatreonData } from './hooks/usePatreonData';
import { useEntriesData } from './hooks/useEntriesData';

export default function Drawing() {
    // const [entries, setEntries] = useState([]);
    // const [patreons, setPatreons] = useState([]);
    // const [nextToken, setNextToken] = useState(null);

    const patreons = usePatreonData();
    const entries = useEntriesData();



    return (
        <div className='drawing'>
          <img src={Logo} alt="The Rat Club" />

            <h2>Drawing is on <br/>{new Date(conf.raffle_drawing_date).toLocaleString()}</h2>

            <div className="entry-list">
                <p>{[...entries, ...patreons].length} Total Entries</p>
                {[...entries, ...patreons].map((entry, index) =>
                    <p key={entry.id + index}>{entry.name}</p>
                )}
            </div>

        </div>
    )
}