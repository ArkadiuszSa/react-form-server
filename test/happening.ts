import app from '../lib/app'
import * as mongoose from 'mongoose';
import chai = require('chai')
import ChaiHttp = require('chai-http');

chai.use(ChaiHttp);
let should = chai.should();

before((done) => {
  mongoose.connect(process.env.CONNECTION_STRING_TEST, () => {
    mongoose.connection.db.dropDatabase(() => {
      done()
    })
  })
})

describe('Happening - basic operations: POST, GET, PUT, DELETE that should return status 200  ', () => {

  let happeningId: string;

  let happeningMock = {
    firstName: "Jan",
    lastName: "Kowalski",
    email: "test@gmail.com",
    date: "2016-05-18T16:00:00Z"
  }

  let happeningUpdateMock = {
    firstName: "Dariusz",
    lastName: "Niekowalski",
    email: "test2@gmail.com",
    date: "2016-05-18T17:00:00Z"
  }

  it('should post new happening', (done) => {
    chai.request(app)
      .post('/happening')
      .send(happeningMock)
      .end((err, res) => {
        happeningId = res.body._id;

        res.should.be.json;
        res.should.have.status(200);

        res.body.should.have.property('_id');
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.should.have.property('email');
        res.body.should.have.property('date');

        res.body._id.should.equal(happeningId);
        res.body.firstName.should.equal(happeningMock.firstName);
        res.body.lastName.should.equal(happeningMock.lastName);
        res.body.email.should.equal(happeningMock.email);

        done();
      })
  })

  it('should get created happening by id', (done) => {
    chai.request(app)
      .get('/happening/' + happeningId)
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(200);

        res.body.should.have.property('_id');
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.should.have.property('email');
        res.body.should.have.property('date');

        res.body._id.should.equal(happeningId);
        res.body.firstName.should.equal(happeningMock.firstName);
        res.body.lastName.should.equal(happeningMock.lastName);
        res.body.email.should.equal(happeningMock.email);

        done();
      })
  })

  it('should get created happening as list', (done) => {
    chai.request(app)
      .get('/happenings')
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(200);

        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('firstName');
        res.body[0].should.have.property('lastName');
        res.body[0].should.have.property('email');
        res.body[0].should.have.property('date');

        res.body[0]._id.should.equal(happeningId);
        res.body[0].firstName.should.equal(happeningMock.firstName);
        res.body[0].lastName.should.equal(happeningMock.lastName);
        res.body[0].email.should.equal(happeningMock.email);

        done();
      })
  })

  it('should update created happening by id', (done) => {
    chai.request(app)
      .put('/happening/' + happeningId)
      .send(happeningUpdateMock)
      .end((err, res) => {
        happeningId = res.body._id;

        res.should.be.json;
        res.should.have.status(200);

        res.body.should.have.property('_id');
        res.body.should.have.property('firstName');
        res.body.should.have.property('lastName');
        res.body.should.have.property('email');
        res.body.should.have.property('date');

        res.body._id.should.equal(happeningId);
        res.body.firstName.should.equal(happeningUpdateMock.firstName);
        res.body.lastName.should.equal(happeningUpdateMock.lastName);
        res.body.email.should.equal(happeningUpdateMock.email);

        done();
      })
  })

  it('should delete created happening by id', (done) => {
    chai.request(app)
      .del('/happening/' + happeningId)
      .send(happeningUpdateMock)
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(200);
        res.body.message.should.equal('Successfully deleted happening!');

        done();
      })
  })
})

describe('Happening - POST operation that should return status 400  ', () => {

  it('should return erros messages due to require validation', (done) => {
    chai.request(app)
      .post('/happening')
      .send({
        firstName: "",
        lastName: "",
        email: "",
        date: ""
      })
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(400);
        res.body.errors[0].msg.should.equal('firstName is required');
        res.body.errors[1].msg.should.equal('lastName is required');
        res.body.errors[2].msg.should.equal('email is required');
        res.body.errors[3].msg.should.equal('date is required');

        done();
      })
  })

  it('should return erros messages due to email and date validation', (done) => {
    chai.request(app)
      .post('/happening')
      .send({
        firstName: "Adam",
        lastName: "Kowalski",
        email: "kowal2amorki.wp.pl",
        date: "13 sierpnia 2018"
      })
      .end((err, res) => {
        res.should.be.json;
        res.should.have.status(400);
        res.body.errors[0].msg.should.equal('email must be in email format, e.g. some@some.com');
        res.body.errors[1].msg.should.equal('date must be in ISO8601 format, e.g. 2016-05-18T16:00:00Z');

        done();
      })
  })


})