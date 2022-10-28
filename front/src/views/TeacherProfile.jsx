import { useState, useEffect } from "react";
import axios from "axios";
import { AUTH_ENDPOINT, SURVEY_ENDPOINT } from "../constants";

import { Typography, Card } from "@mui/joy";
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
          component="ul"
          color="neutral"
          variant="outlined"
          sx={{
            bgcolor: "#fff",
            boxShadow: 1,
            borderRadius: 2,
            marginTop: 2,
            p: 2,
            minHeight: 300,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <Card
            component="li"
            sx={{
              minWidth: 200,
              flexGrow: 1,
              textAlign: "center",
              paddingY: 12,
            }}
          >
            <Typography level="h2" fontSize="lg" sx={{ mb: 0.5 }}>
              Calificacion General
            </Typography>
            <Typography level="display1">{teacherData.finalGrade}%</Typography>
          </Card>
          <Card
            component="li"
            sx={{
              minWidth: 200,
              flexGrow: 1,
              textAlign: "center",
              paddingY: 5,
            }}
          >
            <Typography level="h2" fontSize="lg" sx={{ mb: 0.5 }}>
              Ayuda Ofrecida
            </Typography>
            <Typography level="display1">{teacherData.helpOffered}%</Typography>
            <Typography level="h2" fontSize="lg" sx={{ mb: 0.5 }}>
              Dificultad
            </Typography>
            <Typography level="display1">{teacherData.classDifficulty}%</Typography>
          </Card>
          <Card component="li" sx={{ minWidth: 300, flexGrow: 3 }}>
            <Typography level="h2" fontSize="lg" sx={{ mb: 0.5 }}>Comentarios:</Typography>
            <Divider />
            <Typography sx={{ mt: 0.5 }}>{teacherData.comments}</Typography>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
