import app from "../../lib/app";
import * as mongoose from "mongoose";
import chai = require("chai");
import ChaiHttp = require("chai-http");

chai.use(ChaiHttp);
let should = chai.should();

let adminMock = {
  email: "admin@admin.com",
  password: "admin"
};

let happeningMock = {
  title: "Sumer Party",
  description:
    "Only this summer you can get your as on beach and dance with nice leadys!Only this summer you can get your as on beach and dance with nice leadys!Only this summer you can get your as on beach and dance with nice leadys! ",
  days: ["25-08-2018", "01-09-2018", "08-09-2018"],
  price: "10$"
};

let token;

let applicationMock = {
  happeningId: "",
  firstName: "Jan",
  lastName: "Kowalski",
  email: "test@gmail.com",
  date: "2016-05-18T16:00:00Z"
};

let applicationUpdateMock = {
  happeningId: "",
  firstName: "Dariusz",
  lastName: "Niekowalski",
  email: "test2@gmail.com",
  date: "2016-05-18T17:00:00Z"
};

before(done => {
  mongoose.connect(
    process.env.CONNECTION_STRING_TEST,
    { useNewUrlParser: true },
    () => {
      mongoose.connection.db.dropDatabase(() => {
        chai
          .request(app)
          .post("/api/register")
          .send(adminMock)
          .end((err, res) => {
            token = res.body.token;

            chai
              .request(app)
              .post("/api/happening")
              .set("authorization", token)
              .send(happeningMock)
              .set("auth-token", "tokenValue")
              .end((err, res) => {
                applicationMock.happeningId = res.body._id;
                applicationUpdateMock.happeningId = res.body._id;

                done();
              });
          });
      });
    }
  );
});

describe("Application", () => {
  describe("basic operations: POST, GET, PUT, DELETE that should return status 200  ", () => {
    let applicationId: string;

    it("should post new application", done => {
      chai
        .request(app)
        .post("/api/application")
        .send(applicationMock)
        .end((err, res) => {
          applicationId = res.body._id;

          res.should.be.json;
          res.should.have.status(200);

          res.body.should.have.property("_id");
          res.body.should.have.property("firstName");
          res.body.should.have.property("lastName");
          res.body.should.have.property("email");
          res.body.should.have.property("date");

          res.body._id.should.equal(applicationId);
          res.body.firstName.should.equal(applicationMock.firstName);
          res.body.lastName.should.equal(applicationMock.lastName);
          res.body.email.should.equal(applicationMock.email);

          done();
        });
    });

    it("should get created application by id", done => {
      chai
        .request(app)
        .get("/api/application/" + applicationId)
        .set("authorization", token)
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);

          res.body.should.have.property("_id");
          res.body.should.have.property("firstName");
          res.body.should.have.property("lastName");
          res.body.should.have.property("email");
          res.body.should.have.property("date");

          res.body._id.should.equal(applicationId);
          res.body.firstName.should.equal(applicationMock.firstName);
          res.body.lastName.should.equal(applicationMock.lastName);
          res.body.email.should.equal(applicationMock.email);

          done();
        });
    });

    it("should get created application as list", done => {
      chai
        .request(app)
        .get("/api/applications")
        .set("authorization", token)
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);

          res.body[0].should.have.property("_id");
          res.body[0].should.have.property("firstName");
          res.body[0].should.have.property("lastName");
          res.body[0].should.have.property("email");
          res.body[0].should.have.property("date");

          res.body[0]._id.should.equal(applicationId);
          res.body[0].firstName.should.equal(applicationMock.firstName);
          res.body[0].lastName.should.equal(applicationMock.lastName);
          res.body[0].email.should.equal(applicationMock.email);

          done();
        });
    });

    it("should update created application by id", done => {
      chai
        .request(app)
        .put("/api/application/" + applicationId)
        .set("authorization", token)
        .send(applicationUpdateMock)
        .end((err, res) => {
          applicationId = res.body._id;

          res.should.be.json;
          res.should.have.status(200);

          res.body.should.have.property("_id");
          res.body.should.have.property("firstName");
          res.body.should.have.property("lastName");
          res.body.should.have.property("email");
          res.body.should.have.property("date");

          res.body._id.should.equal(applicationId);
          res.body.firstName.should.equal(applicationUpdateMock.firstName);
          res.body.lastName.should.equal(applicationUpdateMock.lastName);
          res.body.email.should.equal(applicationUpdateMock.email);

          done();
        });
    });

    it("should delete created application by id", done => {
      chai
        .request(app)
        .del("/api/application/" + applicationId)
        .send(applicationUpdateMock)
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);

          res.body.message.should.equal("Successfully deleted application!");

          done();
        });
    });
  });

  describe("POST operation that should return status 400  ", () => {
    it("should return erros messages due to require validation", done => {
      chai
        .request(app)
        .post("/api/application")
        .send({
          firstName: "",
          lastName: "",
          email: "",
          date: ""
        })
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(400);

          done();
        });
    });

    it("should return erros messages due to email and date validation", done => {
      chai
        .request(app)
        .post("/api/application")
        .send({
          firstName: "Adam",
          lastName: "Kowalski",
          email: "kowal2amorki.wp.pl",
          date: "13 sierpnia 2018"
        })
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(400);

          done();
        });
    });
  });
});
