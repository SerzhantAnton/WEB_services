const express = require("express");
const dotenv = require("dotenv").config({ path: "../.env" }).parsed;
const bodyParser = require("body-parser");
const app = express();
const request = require("request");

app.use(bodyParser.json());

const statusService = `http://localhost:${dotenv.STATUS_PORT}`;

const teachers = [
  {
    id: 1,
    statusId: null,
    name: "Anton",
    status: null,
  },
  {
    id: 2,
    statusId: null,
    name: "Mikhail",
    status: null,
  },
  {
    id: 3,
    statusId: null,
    name: "Victor",
    status: null,
  },
  {
    id: 4,
    statusId: null,
    name: "Natalya",
    status: null,
  },
  {
    id: 5,
    statusId: null,
    name: "Boris",
    status: null,
  },
];

app.get("/teachers", (req, res) => {
  console.log("Returning teachers list");
  res.send(teachers);
});

app.post("/determineteacherstatus", (req, res) => {
  request.post(
    {
      headers: { "content-type": "application/json" },
      url: `${statusService}/teacher/${req.body.statusId}`,
      body: JSON.stringify({ teacherId: req.body.teacherId }),
    },
    (err, response, body) => {
      if (!err) {
        const teacherId = parseInt(req.body.teacherId);
        const teacher = teachers.find((subject) => subject.id === teacherId);
        teacher.status = body;
        teacher.statusId = req.body.statusId;
        res.status(202).send(teacher);
      } else {
        res.status(400).send({ problem: err });
      }
    }
  );
});

app.post("/assignteacher/**", (req, res) => {
  const teacherId = parseInt(req.params[0]);
  const teacher = teachers.find((acc) => acc.id === teacherId);

  if (teacher) {
    res
      .status(202)
      .header({
        Location: `http://localhost:${dotenv.REPORT_PORT}/determineReportteacher/${teacherId}`,
      })
      .send(teacher.name);
  } else {
    console.log(`not found.`);
    res.status(404).send();
  }
});

app.listen(dotenv.TEACHER_PORT, () =>
  console.log(`teachers listening on port ${dotenv.TEACHER_PORT}`)
);
