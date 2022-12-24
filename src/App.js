import { useState } from 'react';
// import Logo from './imgs/pwd-festival-set-lists.png';
import Logo from './imgs/the-rat-club.png';
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

const JoinPatreon = () => {
  return (
    <>
      <p>This raffle is exclusively for Patreons</p>
      <a className='button pink-btn' href="https://www.patreon.com/thewillramos">
          Join The Rat Club
      </a>
    </>
  )
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
              {/* <h1>Raffles Closed</h1> */}
              <p>
                  {Date.now() < new Date(conf.raffle_drawing_date).getTime() ? 'Enter to Win:' : 'Raffles Closed'}<br/>
                  <i style={{fontSize: '1.5rem'}}>{conf.raffle_item}</i>
              </p>


            {Date.now() < new Date(conf.raffle_drawing_date).getTime() &&
              <>
              { Date.now() > new Date(conf.raffle_opening_date).getTime() ?
                <>
                <p>Raffle Closes:<br/> {new Date(conf.raffle_drawing_date).toLocaleString()}</p>

                { (conf.patreon_only && window.location.pathname.includes('patreon'))   ?
                <>
                <input type="text" id="name" placeholder="Name" onChange={e => setName(e.target.value)}/>
                <input type="email" id="email" placeholder="Email" onChange={e => setEmail(e.target.value)}/>
                <button type="submit">Enter Now</button>
                </>
                :
                <JoinPatreon/>
              }

              </>
              :
              <>
                <p>Raffle Opens:<br/> {new Date(conf.raffle_opening_date).toLocaleString()}</p>
                <JoinPatreon/>
              </>
              }
              </>
            }

            </>
          )}
        </form>
    );
}

export default RaffleForm;
