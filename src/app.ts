import express from "express";
import { IPeople } from "./types/people";
import { IGrade } from "./types/grades";
import { ITracker } from "./types/tracker";
import morgan from "morgan";
import { v4 as uuidv4 } from "uuid";

const app = express();
const port = 5001;
app.use(morgan("dev"));

let names: IPeople[] = [];
let grades: IGrade[] = [];
let trackers: ITracker[] = [];

names.push({
  id: "123",
  name: "shrouq",
});

grades.push({
  id: "993",
  grade: 99,
});

trackers.push({
  id: "993",
  deadline: "Two weeks",
  title: "xxx",
  description: "xxxxx",
  statusDone: false,
});

app.use(express.json());

//Q1
app.get("/names", (req, res) => {
  return res.json(names);
});

app.post("/names", (req, res) => {
  console.log(req.body);
  const newName = req.body as IPeople;
  names.push(newName);

  res.json({
    message: "Name Added!",
  });
});

app.put("/names/:id", (req, res) => {
  const updatedNames = req.body as IPeople;
  const { id } = req.params;
  const updatedNamesList = names.filter((upName) => {
    return upName.id !== id;
  });
  updatedNamesList.push(updatedNames);
  names = updatedNamesList;
  res.json({
    message: "Names Updated",
  });
});

app.delete("/names/:id", (req, res) => {
  const { id } = req.params;
  const deletedNamesList = names.filter((deName) => {
    return deName.id !== id;
  });
  names = deletedNamesList;
  res.json({
    message: "Name Deleted",
  });
});

//Q2

app.get("/grades", (req, res) => {
  return res.json(grades);
});

app.post("/grades", (req, res) => {
  const newGrade = req.body as IGrade;
  grades.push(newGrade);

  res.json({
    message: "Grade Added!",
  });
});

app.put("/grades/:id", (req, res) => {
  const updatedGrades = req.body as IGrade;
  const { id } = req.params;
  const updatedGradeList = grades.filter((uGrade) => {
    return uGrade.id !== id;
  });
  updatedGradeList.push(updatedGrades);
  grades = updatedGradeList;
  res.json({
    message: "Grade Updated",
  });
});

app.delete("/grades/:id", (req, res) => {
  const { id } = req.params;
  const deletedGradesList = grades.filter((dGrade) => {
    return dGrade.id !== id;
  });
  grades = deletedGradesList;
  res.json({
    message: "Grade Deleted",
  });
});

//Q3
app.get("/trackers", (req, res) => {
  return res.json(trackers);
});

app.get("/trackers/:title", (req, res) => {
  const { title } = req.params;
  const updatedList = trackers.filter((uTrack) => {
    return uTrack.title === title;
  });
  // console.log(tracker.title);
  return res.json(updatedList);
});

app.post("/trackers", (req, res) => {
  const newTask = req.body as ITracker;
  newTask.id = uuidv4();
  trackers.push(newTask);
  res.json({
    message: "Task Added!",
  });
});

app.put("/trackers/:title", (req, res) => {
  const updatedTaks = req.body as ITracker;
  const { title } = req.params;
  const updatedList = trackers.filter((uTrack) => {
    return uTrack.title !== title;
  });
  updatedList.push(updatedTaks);
  trackers = updatedList;
  res.json({
    message: "Task Updated",
  });
});

app.delete("/trackers/:title", (req, res) => {
  const { title } = req.params;
  const deletedList = trackers.filter((dTrack) => {
    return dTrack.title !== title;
  });
  trackers = deletedList;
  res.json({
    message: "Task Deleted",
  });
});

app.listen(port, () => {
  console.log(`The server running in port ${port}`);
});
