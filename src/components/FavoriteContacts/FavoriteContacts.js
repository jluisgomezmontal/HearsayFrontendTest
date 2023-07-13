import React, { useState } from 'react'
import callHistory from '../../callHistory.json';
import './favoriteContacts.css'

function lastCallInDaysFunc(timestamp) {
  const currentTime = Math.floor(Date.now() / 1000); // Timestamp UNIX in seconds
  const lastCallinSeconds = currentTime - timestamp;
  const lastCallinDays = Math.floor(lastCallinSeconds / (24 * 60 * 60)); // Convertir segundos a días
  return lastCallinDays;
}

const uniqueFirstNamesSet = new Set();

// Filter duplicate objects based on "firstName"
const contacts = callHistory.filter((obj) => {
  if (uniqueFirstNamesSet.has(obj.firstName)) {
    return false;
  } else {
    uniqueFirstNamesSet.add(obj.firstName);
    return true;
  }
});

const objectsWithLastCallInDays = contacts.map((obj) => {
  const lastCallInDays = lastCallInDaysFunc(obj.called);
  return { ...obj, lastCallInDays };
});

export const FavoriteContacts = () => {

    return (
    <div className='container'>
      <h2>My Favorite Contacts</h2>

      {
        objectsWithLastCallInDays.map( favoriteContacts => (
          <div className='favoriteContacts'>
          <div className="completeName">
              <h3 className='name'>{favoriteContacts.firstName}</h3>
              <h3 className='lastName'>{favoriteContacts.lastName}</h3>
          </div>
          <h3>{favoriteContacts.lastCallInDays} days ago</h3>

          </div>

        ))
      }

    </div>
  )
}
