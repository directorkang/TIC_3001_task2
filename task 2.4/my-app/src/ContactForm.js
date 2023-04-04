// ContactForm.js

import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

function ContactForm() {
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const history = useHistory();
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            axios.get(`/api/contacts/${id}`).then((response) => {
                setName(response.data.data.name);
                setGender(response.data.data.gender);
                setEmail(response.data.data.email);
                setPhone(response.data.data.phone);
            });
        }
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const contact = { name, gender, email, phone };
        if (id) {
            axios.put(`/api/contacts/${id}`, contact).then(() => {
                history.push(`/${id}`);
            });
        } else {
            axios.post('/api/contacts', contact).then((response) => {
                history.push(`/${response.data.data._id}`);
            });
        }
    };

    return (
        <div>
