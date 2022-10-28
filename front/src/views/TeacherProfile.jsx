import { useState, useEffect } from "react";
import axios from "axios";
import { AUTH_ENDPOINT, SURVEY_ENDPOINT } from "../constants";

import { Typography } from "@mui/joy";
import Divider from "@mui/joy/Divider";
import { Box, ThemeProvider, createTheme } from "@mui/system";
import { useParams } from "react-router-dom";

// TODO: Take this out from here
const theme = createTheme({
  palette: {
    background: {
      paper: "#fff",
    },
    text: {
      primary: "#173A5E",
      secondary: "#46505A",
    },
    action: {
      active: "#001E3C",
    },
    success: {
      dark: "#009688",
    },
  },
});

export function TeacherProfile() {
  const { id } = useParams();

  const [teacher, setTeacher] = useState([]);
  const [teacherData, setTeacherData] = useState([]);

  useEffect(() => {
    axios
      .get(`${SURVEY_ENDPOINT}/api/survey/teachers`)
      .then((res) => setTeacher(res.data.teachers.find(elem => elem._id == id)));
  }, []);

  useEffect(() => {
    axios
      .get(`${SURVEY_ENDPOINT}/api/survey/teacher/${id}`)
      .then((res) => setTeacherData(res.data.grades[0]));
  }, []);

  console.log(teacherData);
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: "rgb(231, 235, 240)",
          p: 5,
          marginLeft: -2,
          marginRight: -1,
        }}
      >
        <Typography level="h1">
          {teacher.name}
        </Typography>
        <Divider />
        <Box
          color="neutral"
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            boxShadow: 1,
            borderRadius: 2,
            marginTop: 2,
            p: 2,
            minHeight: 300,
          }}
        >
          {id}
        </Box>
      </Box>
    </ThemeProvider>
  );
}
