import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import ArrowForwardRoundedIcon from "@mui/icons-material/ArrowForwardRounded";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { IconButton, List, ListItem, ListItemText } from "@mui/material";

const TaskView = ({
  stage,
  tasks,
  handlePreviousStage,
  handleNextStage,
  handleDeleteTask,
}) => {
  const [lists, setList] = useState();

  useEffect(() => {
    const flist = tasks.filter((task) => task.stage === stage.no);
    setList(flist);
  }, [tasks]);

  return (
    <Card>
      <Typography variant="h6" color="primary" align="center">
        {stage.no + 1}. {stage.name}
      </Typography>
      <CardContent>
        <List>
          {Array.isArray(lists) &&
            lists.map((task, i) => {
              return (
                <ListItem disablePadding key={task.name + i}>
                  <ListItemText primary={task.name} />
                  {stage.no > 0 && (
                    <IconButton
                      color="secondary"
                      aria-label="previous-stage"
                      component="span"
                      onClick={() => handlePreviousStage(task.name)}
                    >
                      <ArrowBackRoundedIcon />
                    </IconButton>
                  )}
                  {stage.no < 3 && (
                    <IconButton
                      color="secondary"
                      aria-label="next-stage"
                      component="span"
                      onClick={() => handleNextStage(task.name)}
                    >
                      <ArrowForwardRoundedIcon />
                    </IconButton>
                  )}
                  <IconButton
                    color="secondary"
                    aria-label="delete"
                    component="span"
                    onClick={() => handleDeleteTask(task.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </ListItem>
              );
            })}
        </List>
      </CardContent>
    </Card>
  );
};

export default TaskView;
