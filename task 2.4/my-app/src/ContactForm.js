import React, { useState } from 'react';

function ContactForm({ addContact }) {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        addContact({ name, phone });
        setName('');
        setPhone('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <br />
            <label>
                Phone:
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <br />
            <button type="submit">Add Contact</button>
        </form>
    );
}

export default ContactForm;
