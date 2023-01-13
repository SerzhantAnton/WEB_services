const express = require("express");
const path = require("path");
const dotenv = require("../node_modules/dotenv").config({
  path: "../.env",
}).parsed;
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

const reportStatuses = {
  1: "New",
  2: "Approved",
  3: "Rejected",
  4: "Qualified",
};

const teacherStatuses = {
  1: "Currently work",
  2: "On vacation",
  3: "Retired",
  4: "Thesis",
};

const reportInfo = [];
const teacherInfo = [];

app.get("/reportStatuses", (req, res) => {
  console.log("Returning report statuses");
  res.send(reportStatuses);
});

app.get("/teacherstatuses", (req, res) => {
  console.log("Returning teacher statuses");
  res.send(teacherStatuses);
});

app.get("/reportInfo", (req, res) => {
  console.log("Returning report info");
  res.send(reportInfo);
});

app.get("/teacherInfo", (req, res) => {
  console.log("Returning teacher info");
  res.send(teacherInfo);
});

app.post("/report/**", (req, res) => {
  const statusId = req.params[0];
  const foundReportStatus = updateInfo(
    req,
    reportStatuses,
    reportInfo,
    statusId,
    "reportId"
  );

  if (foundReportStatus) {
    res
      .status(202)
      .header({
        Location: `http://localhost:${dotenv.STATUS_PORT}/report/${statusId}`,
      })
      .send(foundReportStatus);
  } else {
    console.log(`not found.`);
    res.status(404).send();
  }
});

app.post("/teacher/**", (req, res) => {
  const statusId = req.params[0];
  const foundTeacherStatus = updateInfo(
    req,
    teacherStatuses,
    teacherInfo,
    statusId,
    "teacherId"
  );

  if (foundTeacherStatus) {
    res
      .status(202)
      .header({
        Location: `http://localhost:${dotenv.STATUS_PORT}/teacher/${statusId}`,
      })
      .send(foundTeacherStatus);
  } else {
    console.log(`not found.`);
    res.status(404).send();
  }
});

function updateInfo(req, statuses, info, id, key) {
  const foundStatus = statuses[id];
  const foundIndex = info.findIndex((report) => report[key] === req.body[key]);
  if (foundIndex !== -1) {
    info[foundIndex] = {
      ...info[foundIndex],
      id,
    };
  } else {
    info.push({ [key]: req.body[key], id });
  }
  return foundStatus;
}

app.listen(dotenv.STATUS_PORT, () =>
  console.log(`Statuses listening on port ${dotenv.STATUS_PORT}`)
);
