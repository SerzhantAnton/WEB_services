const express = require("express");
const path = require("path");
const dotenv = require("dotenv").config({ path: "../.env" }).parsed;
const bodyParser = require("body-parser");
const request = require("request");
const app = express();

app.use(bodyParser.json());

const statusService = `http://localhost:${dotenv.STATUS_PORT}`;
const teacherService = `http://localhost:${dotenv.TEACHER_PORT}`;

const reports = [
  {
    id: 1,
    displayName: "Report 1",
    status: null,
    statusId: null,
    teacher: null,
    teacherId: null,
  },
  {
    id: 2,
    displayName: "Report 2",
    status: null,
    teacher: null,
    statusId: null,
    teacherId: null,
  },
  {
    id: 3,
    status: null,
    teacher: null,
    displayName: "Report 3",
    statusId: null,
    teacherId: null,
  },
  {
    id: 4,
    status: null,
    teacher: null,
    displayName: "Report 5",
    statusId: null,
    teacherId: null,
  },
  {
    id: 5,
    status: null,
    teacher: null,
    displayName: "Report 5",
    statusId: null,
    teacherId: null,
  },
];

app.get("/reports", (req, res) => {
  console.log("Returning reports list");
  res.send(reports);
});

app.post("/determineReportteacher", (req, res) => {
  request.post(
    {
      headers: { "content-type": "application/json" },
      url: `${teacherService}/assignteacher/${req.body.teacherId}`,
    },
    (err, response, body) => {
      console.log(body);
      if (!err) {
        const reportId = parseInt(req.body.reportId);
        const report = reports.find((report) => report.id === reportId);
        report.teacher = body;
        report.teacherId = req.body.teacherId;
        res.status(202).send(report);
      } else {
        res.status(400).send({ problem: err });
      }
    }
  );
});

app.post("/determineReportStatus", (req, res) => {
  request.post(
    {
      headers: { "content-type": "application/json" },
      url: `${statusService}/report/${req.body.statusId}`,
      body: JSON.stringify({ reportId: req.body.reportId }),
    },
    (err, response, body) => {
      if (!err) {
        const reportId = parseInt(req.body.reportId);
        const report = reports.find((report) => report.id === reportId);
        report.status = body;
        report.statusId = req.body.statusId;
        res.status(202).send(report);
      } else {
        res.status(400).send({ problem: err });
      }
    }
  );
});

app.listen(dotenv.REPORT_PORT, () =>
  console.log(`Reports listening on port ${dotenv.REPORT_PORT}`)
);
