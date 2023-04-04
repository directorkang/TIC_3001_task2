import React, { useState } from 'react';
import ContactForm from './ContactForm';
import ContactList from './ContactList';

function App() {
    const [contacts, setContacts] = useState([]);

    const addContact = (contact) => {
        setContacts([...contacts, contact]);
    };

    return (
        <div className="App">
            <ContactForm addContact={addContact} />
            <ContactList contacts={contacts} />
        </div>
    );
}

export default App;
