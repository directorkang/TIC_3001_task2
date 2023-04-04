import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import axios from "axios";

function App() {
    const [contacts, setContacts] = useState([]);

    useEffect(() => {
        const fetchContacts = async () => {
            const response = await axios.get("/api/contacts");
            setContacts(response.data.data);
        };
        fetchContacts();
    }, []);

    const handleDelete = async (contactId) => {
        await axios.delete(`/api/contacts/${contactId}`);
        setContacts((prevContacts) =>
            prevContacts.filter((contact) => contact._id !== contactId)
        );
    };

    return (
        <Router>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to="/" className="navbar-brand">
                        Contacts App
                    </Link>
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Contacts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/add" className="nav-link">
                                Add Contact
                            </Link>
                        </li>
                    </ul>
                </nav>

                <br />

                <Route path="/" exact>
                    <h3>Contacts</h3>
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {contacts.map((contact) => (
                                <tr key={contact._id}>
                                    <td>{contact.name}</td>
                                    <td>{contact.email}</td>
                                    <td>{contact.phone}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(contact._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </Route>

                <Route path="/add">
                    <h3>Add Contact</h3>
                    <form>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Email:</label>
                            <input type="email" className="form-control" />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="text" className="form-control" />
                        </div>
                        <button type="submit" className="btn btn-primary">
                            Save
                        </button>
                    </form>
                </Route>
            </div>
        </Router>
    );
}

export default App;
