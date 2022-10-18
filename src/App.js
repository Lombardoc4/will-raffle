import { useState } from 'react';
import Logo from './summer-festival-tour-lams.png';
// import Logo from './the-rat-club.png';
import './App.css';

import { DataStore } from '@aws-amplify/datastore';
import { RaffleEntry } from './models';


const validateInput = (name, options) => {
  if (name.length <= options.minLength)
    return false;

  if (options.type && typeof name !== options.type)
    return false;

  if (options.contains && !name.includes(options.contains))
    return false;

  return true;
}

const checkExisting = async (email) => {
  const models = await DataStore.query(RaffleEntry, c => c.email('eq', email));
  return models;
}

function App() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();

        // validate inputs
        if (!validateInput(name, {minLength: 0, type:"string"})) return;
        if (!validateInput(email, {minLength: 0, type:"string", contains: '@'})) return;

        // Check to see if email is already been used
        const emailExist = await checkExisting(email)


        if (emailExist.length === 0) {

          await DataStore.save(
              new RaffleEntry({
              "name": name,
              "email": email,
              "raffle_id": "October",
              "patreon": window.location.pathname.includes('patreon')
            })
          );

        }

        setSubmitted(true);
    };


    return (
        <form id="raffle-form" onSubmit={handleSubmit}>
          <img src={Logo} alt="The Rat Club" />
          { submitted && (
            <>
              <h1>Thanks for you submission</h1>
              <p>The drawing is on October 19th</p>
            </>
          )}
          {!submitted && (
            <>
              <p>
                  Enter the Raffle to Win:<br/>
                  Summer Festival Tour Lams
              </p>
              <input type="text" id="name" placeholder="Name" onChange={e => setName(e.target.value)}/>
              <input type="email" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
              <button type="submit">Enter Now</button>
            </>
          )}
        </form>
    );
}

export default App;
