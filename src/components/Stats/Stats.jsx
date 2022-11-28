import React, { useContext, useState } from "react";

import { Box, Paper, Typography } from "@mui/material";
import TodoContext from "../../store/todo-context";
import { useEffect } from "react";

const dayHourMonth = (t) => {
  var cd = 24 * 60 * 60 * 1000,
    ch = 60 * 60 * 1000,
    d = Math.floor(t / cd),
    h = Math.floor((t - d * cd) / ch),
    m = Math.round((t - d * cd - h * ch) / 60000),
    pad = (n) => {
      return n < 10 ? "0" + n : n;
    };

  if (m === 60) {
    h++;
    m = 0;
  }
  if (h === 24) {
    d++;
    h = 0;
  }
  return `${d} days, ${pad(h)} hours, ${pad(m)} minutes`;
};

const getAverage = (todoList, priority) => {
  const doneTodos =
    priority === undefined
      ? todoList.filter((n) => n.doneDate != null)
      : todoList
          .filter((n) => n.doneDate != null)
          .filter((n) => n.priority === priority);

  const timeBetween = doneTodos.map(
    (n) => Date.parse(n.doneDate) - Date.parse(n.creationDate)
  );

  const averageMiliseconds =
    timeBetween.reduce((a, b) => a + b, 0) / timeBetween.length;

  if (isNaN(averageMiliseconds)) {
    return `No completed tasks`;
  }

  const timeTotal = dayHourMonth(averageMiliseconds);

  return timeTotal;
};

const Stats = () => {
  const [average, setAverage] = useState(0);
  const [averageLow, setAverageLow] = useState(0);
  const [averageMedium, setAverageMedium] = useState(0);
  const [averageHigh, setAverageHigh] = useState(0);

  const todoCtx = useContext(TodoContext);

  useEffect(() => {
    setAverage(getAverage(todoCtx.allTodos));
    setAverageLow(getAverage(todoCtx.allTodos, "Low"));
    setAverageMedium(getAverage(todoCtx.allTodos, "Medium"));
    setAverageHigh(getAverage(todoCtx.allTodos, "High"));
  }, [todoCtx.allTodos]);

  return (
    <Box sx={{ marginTop: 2, width: "100%" }}>
      <Paper
        variant="outlined"
        sx={{
          height: "150px",
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" fontSize={"12px"}>
            Average time to finish tasks:{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {average}
          </Typography>
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Typography variant="body1" fontSize={"12px"}>
            Average time to finish tasks by priority:{" "}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Low: {averageLow}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Medium: {averageMedium}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            High: {averageHigh}
          </Typography>
        </Box>
      </Paper>
    </Box>
  );
};

export default Stats;
