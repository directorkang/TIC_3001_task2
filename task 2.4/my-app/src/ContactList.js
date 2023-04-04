// ContactList.js

import { useState, useEffect } from 'react';
import axios from 'axios';

function ContactList() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        axios.get('/api/contacts').then((response) => {
            setContacts(response.data.data);
        });
    }, []);

    return (
        <div>
            <h1>Contacts</h1>
            <ul>
                {contacts.map((contact) => (
                    <li key={contact._id}>
                        <a href={`/${contact._id}`}>{contact.name}</a>
                    </li>
                ))}
            </ul>
            <a href="/add">Add Contact</a>
        </div>
    );
}

export default ContactList;
