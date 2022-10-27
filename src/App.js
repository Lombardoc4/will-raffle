import { useState } from 'react';
import Logo from './imgs/pwd-festival-set-lists.png';
// import Logo from './the-rat-club.png';
import './App.css';

import {  API, graphqlOperation } from 'aws-amplify'
import { createRaffleEntry } from './graphql/mutations';
import { listRaffleEntries } from './graphql/queries';
import { conf } from './conf';

const validateInput = (name, options) => {
  if (name.length <= options.minLength)
    return false;

  if (options.type && typeof name !== options.type)
    return false;

  if (options.contains && !name.includes(options.contains))
    return false;

  return true;
}


function RaffleForm() {
    const [submitted, setSubmitted] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');



    const handleSubmit = async (e) => {
        e.preventDefault();


        // validate inputs
        if (!validateInput(name, {minLength: 0, type:"string"})) return;
        if (!validateInput(email, {minLength: 0, type:"string", contains: '@'})) return;

        // Check to see if email is already been used
        const emailExist = await API.graphql(
          graphqlOperation(listRaffleEntries, {
            filter: {
              email: {eq: email},
              raffle_id: {eq: conf.raffle_id}
            }
          })
        );

        if (!emailExist.data.listRaffleEntries.items || emailExist.data.listRaffleEntries.items.length === 0) {
          await addEntry();
        }

        setSubmitted(true);
    };

    async function addEntry() {
      try {
        const entry = {
          "name": name,
          "email": email,
          "raffle_id": conf.raffle_id,
          "patreon": window.location.pathname.includes('patreon')
        }

        await API.graphql(graphqlOperation(createRaffleEntry, {input: entry}))
      } catch (err) {
        console.log('error creating entry:', err)
      }
    }


    return (
        <form id="raffle-form" onSubmit={handleSubmit}>
          <img src={Logo} alt="The Rat Club" />
          { submitted && (
            <>
              <h1>Thanks for you submission</h1>
              <p>Drawing is on {conf.raffle_drawing_date}</p>
            </>
          )}
          {!submitted && (
            <>
            <p>Raffle Opening Soon</p>
              <p>
                  Enter the Raffle to Win:<br/>
                  {conf.raffle_item}
              </p>
              {/* <input type="text" id="name" placeholder="Name" onChange={e => setName(e.target.value)}/>
              <input type="email" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
              <button type="submit">Enter Now</button> */}
            </>
          )}
        </form>
    );
}

export default RaffleForm;
