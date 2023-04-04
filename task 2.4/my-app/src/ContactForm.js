import React, { useState } from 'react';

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [gender, setGender] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = {
            name: name,
            email: email,
            gender: gender,
            phone: phone
        };
        try {
            const response = await fetch('/api/contacts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (response.ok) {
                alert('Contact saved successfully');
            } else {
                alert('Failed to save contact');
            }
        } catch (error) {
            console.error(error);
            alert('Failed to save contact');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </label>
            <label>
                Email:
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
                Gender:
                <select value={gender} onChange={(e) => setGender(e.target.value)}>
                    <option value="">--Select Gender--</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                </select>
            </label>
            <label>
                Phone:
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default ContactForm;
