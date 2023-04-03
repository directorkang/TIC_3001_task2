const chai = require('chai');
const expect = chai.expect;
const app = require('../src/index');
const request = require('supertest');
const mongoose = require('mongoose');

const contactController = require('../src/contactController');
const contactModel = require('../src/contactModel');
const apiRoutes = require('../src/api-routes');

describe('Contacts API', () => {
    let contactId;

    // Test the GET route
    describe('GET /api/contacts', () => {
        it('should get all contacts', (done) => { // added done parameter
            request(app)
                .get('/api/contacts')
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.status).to.equal('success');
                    expect(res.body.message).to.equal('Contacts retrieved successfully');
                    expect(res.body.data).to.be.an('array');
                    done(); // called done after assertions
                });
        });
    });

    // Test the POST route
    describe('POST /api/contacts', () => {
        it('should create a new contact', (done) => { // added done parameter
            const contact = {
                name: 'John Doe',
                gender: 'Male',
                email: 'johndoe@example.com',
                phone: '1234567890'
            };
            request(app)
                .post('/api/contacts')
                .send(contact)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('New contact created!');
                    expect(res.body.data).to.be.an('object');
                    contactId = res.body.data._id;
                    done(); // called done after assertions
                });
        });
    });

    // Test the PUT route
    describe('PUT /api/contacts/:contact_id', () => {
        it('should update an existing contact', (done) => { // added done parameter
            const updatedContact = {
                name: 'Jane Doe',
                gender: 'Female',
                email: 'janedoe@example.com',
                phone: '0987654321'
            };
            request(app)
                .put(`/api/contacts/${contactId}`)
                .send(updatedContact)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.message).to.equal('Contact Info updated');
                    expect(res.body.data).to.be.an('object');
                    expect(res.body.data.name).to.equal(updatedContact.name);
                    expect(res.body.data.gender).to.equal(updatedContact.gender);
                    expect(res.body.data.email).to.equal(updatedContact.email);
                    expect(res.body.data.phone).to.equal(updatedContact.phone);
                    done(); // called done after assertions
                });
        });
    });

    // Test the DELETE route
    describe('DELETE /api/contacts/:contact_id', () => {
        it('should delete an existing contact', (done) => { // added done parameter
            request(app)
                .delete(`/api/contacts/${contactId}`)
                .end((err, res) => {
                    expect(res.status).to.equal(200);
                    expect(res.body.status).to.equal('success');
                    expect(res.body.message).to.equal('Contact deleted');
                    expect(res.body.data).to.be.an('object');
                    done(); // called done after assertions
                });
        });
    });

    // Close server connection after all tests are completed
    after((done) => {
        mongoose.connection.close();
        app.close(done);
    });
});
