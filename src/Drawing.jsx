import { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { RaffleEntry } from './models';

import Logo from './the-rat-club.png'
import './drawing.css'

export default function Drawing() {
    const [entries, setEntries] = useState([]);
    const [winner, setWinner] = useState(' ');

    useEffect(() => {

        const getEntries = async () => {
            const models = await DataStore.query(RaffleEntry);
            models.map(entry => {
                if (entry.patreon)
                    models.push(entry);
            })
            setEntries(models);
            return models;
        }

        getEntries();

    })

    const generateRandomWinner = () => {
        setWinner(entries[Math.floor(Math.random()*entries.length)])
    }

    return (
        <div className='drawing'>
          <img src={Logo} alt="The Rat Club" />

            <h2>{winner.name}</h2>
            <p style={{fontSize: '0.66rem'}}>{winner.id}</p>

            <button onClick={() => generateRandomWinner()}>Generate Winner</button>


            <div className="entry-list">
                <p>{entries.length} Total Entries</p>
                {entries.map(entry => (
                    <p>{entry.name}</p>
                ))}
            </div>

        </div>
    )
}