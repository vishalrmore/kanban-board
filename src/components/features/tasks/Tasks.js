import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import TasksOverview from "./TasksOverview";
import TaskView from "./TaskView";
import taskdata from "../../db.json";

const Tasks = ({ loggedUser }) => {
  const [newtask, setNewTask] = useState({
    id: "",
    name: "",
    stage: 0,
    createdat: "",
    updatedat: "",
  });
  const [tasks, setTasks] = useState([]);
  const [errormessage, setErrorMessage] = useState("");
  const [isValid, setIsValid] = useState(false);

  const stages = [
    { no: 0, name: "Begining" },
    { no: 1, name: "To do" },
    { no: 2, name: "Doing" },
    { no: 3, name: "Done" },
  ];

  useEffect(() => {
    console.log(taskdata);
    const loggedUserTasks = taskdata.filter(
      (task) => task.created_by === loggedUser?.username
    );
    setTasks(loggedUserTasks);
    console.log(loggedUserTasks);
  }, [loggedUser]);

  const handlePreviousStage = (name) => {
    const ntasks = [...tasks];
    const [task] = ntasks.filter((t) => t.name === name);
    task.stage -= 1;
    task.updated_at = new Date().toLocaleString();
    setTasks(ntasks);
  };
  const handleNextStage = (name) => {
    const ntasks = [...tasks];
    const [task] = ntasks.filter((t) => t.name === name);
    task.stage += 1;
    task.updated_at = new Date().toLocaleString();
    setTasks(ntasks);
  };

  const handleDeleteTask = (id) => {
    const ntasks = [...tasks];
    const i = ntasks.findIndex((t) => t.id === id);
    ntasks.splice(i, 1);
    setTasks(ntasks);
    console.log("tasks", tasks);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newtask,
      id: tasks.length + 1,
      stage: 0,
      created_by: loggedUser.username,
      created_at: new Date().toLocaleString(),
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedtasks = [...tasks];
    const [task] = updatedtasks.filter((task) => task.name === newtask.name);

    if (newtask.name?.trim() == 0) {
      setIsValid(true);
      setErrorMessage("Please enter a task name");
      setNewTask({ name: "" });
    } else if (task !== undefined) {
      setIsValid(true);
      setErrorMessage("This task already exist Please enter diffrent name.");
      setNewTask({ name: "" });
    } else {
      updatedtasks.push(newtask);
      setTasks(updatedtasks);
      setNewTask({ name: "" });
      setIsValid(false);
      setErrorMessage("");
      console.log(newtask);
    }
  };

  return (
    <>
      <Container maxWidth="xl" sx={{ paddingTop: "1.5rem" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TasksOverview tasks={tasks} />
          </Grid>
          <Grid item xs={12} sm={6} md={6}>
            <TextField
              required
              fullWidth
              name="name"
              label="create task"
              type="text"
              value={newtask.name}
              id="name"
              autoComplete="task"
              onChange={handleChange}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Button
              type="submit"
              fullWidth
              size="large"
              variant="contained"
              sx={{ padding: "15px 22px" }}
              onClick={handleSubmit}
            >
              Create task
            </Button>
          </Grid>
          <Grid item xs={12} sx={{ paddingTop: 0, paddingBottom: "15px" }}>
            {isValid && (
              <Typography variant="body2" color="red">
                {errormessage}
              </Typography>
            )}
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {stages.map((stage, i) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={stage.name + i}>
              <TaskView
                stage={stage}
                tasks={tasks}
                handlePreviousStage={handlePreviousStage}
                handleNextStage={handleNextStage}
                handleDeleteTask={handleDeleteTask}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Tasks;
