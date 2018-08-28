import app from "../../lib/app";
import * as mongoose from "mongoose";
import chai = require("chai");
import ChaiHttp = require("chai-http");

describe("Happening", () => {
  chai.use(ChaiHttp);
  let should = chai.should();
  let adminMock = {
    email: "admin@admin.com",
    password: "admin"
  };
  let token;

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
              res.body.should.have.property("token");
              token = res.body.token;

              done();
            });
        });
      }
    );
  });

  describe("basic operations: POST, GET, PUT, DELETE that should return status 200  ", () => {
    let happeningId: string;

    let happeningMock = {
      title: "Sumer Party",
      description:
        "Only this summer you can get your as on beach and dance with nice leadys!Only this summer you can get your as on beach and dance with nice leadys!Only this summer you can get your as on beach and dance with nice leadys! ",
      days: ["25-08-2018", "01-09-2018", "08-09-2018"],
      price: "10$"
    };

    let happeningUpdateMock = {
      title: "AirShow",
      description:
        "You will be able to see the bravest pilots the world has seen!You will be able to see the bravest pilots the world has seen!You will be able to see the bravest pilots the world has seen! ",
      days: ["29-08-2018"],
      price: "10$"
    };

    it("should post new happening", done => {
      chai
        .request(app)
        .post("/api/happening")
        .set("authorization", token)
        .send(happeningMock)
        .set("auth-token", "tokenValue")
        .end((err, res) => {
          happeningId = res.body._id;

          res.should.be.json;
          res.should.have.status(200);

          res.body.should.have.property("_id");
          res.body.should.have.property("title");
          res.body.should.have.property("description");
          res.body.should.have.property("days");
          res.body.should.have.property("price");

          done();
        });
    });

    it("should get created happening by id", done => {
      chai
        .request(app)
        .get("/api/happening/" + happeningId)
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);

          res.body.should.have.property("_id");
          res.body.should.have.property("title");
          res.body.should.have.property("description");
          res.body.should.have.property("days");
          res.body.should.have.property("price");

          done();
        });
    });

    it("should get created happening as list", done => {
      chai
        .request(app)
        .get("/api/happenings")
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);

          res.body[0].should.have.property("_id");
          res.body[0].should.have.property("title");
          res.body[0].should.have.property("description");
          res.body[0].should.have.property("days");
          res.body[0].should.have.property("price");

          done();
        });
    });

    it("should update created happening by id", done => {
      chai
        .request(app)
        .put("/api/happening/" + happeningId)
        .set("authorization", token)
        .send(happeningUpdateMock)
        .end((err, res) => {
          happeningId = res.body._id;

          res.should.be.json;
          res.should.have.status(200);

          res.body.should.have.property("_id");
          res.body.should.have.property("title");
          res.body.should.have.property("description");
          res.body.should.have.property("days");
          res.body.should.have.property("price");

          done();
        });
    });

    it("should delete created happening by id", done => {
      chai
        .request(app)
        .del("/api/happening/" + happeningId)
        .set("authorization", token)
        .send(happeningUpdateMock)
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(200);
          res.body.message.should.equal("Successfully deleted happening!");

          done();
        });
    });
  });

  describe("POST operations that should not return status 200  ", () => {
    it("should return error message due to missing token", done => {
      chai
        .request(app)
        .post("/api/happening")
        .send({
          title: "",
          description: "",
          days: "",
          price: ""
        })
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(401);

          done();
        });
    });

    it("should return erros messages due to require validation", done => {
      chai
        .request(app)
        .post("/api/happening")
        .set("authorization", token)
        .send({
          title: "",
          description: "",
          days: "",
          price: ""
        })
        .end((err, res) => {
          res.should.be.json;
          res.should.have.status(400);

          res.body.errors[0].msg.should.equal("title is required");
          res.body.errors[1].msg.should.equal("description is required");
          res.body.errors[2].msg.should.equal("days is required");
          res.body.errors[3].msg.should.equal("price is required");

          done();
        });
    });
  });
});
