import React, { useState } from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/joy";
import StarIcon from "@mui/icons-material/Star";
import axios from "axios";
import { Link } from "react-router-dom";
import { SURVEY_ENDPOINT } from "../constants";

function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const schoolCals = [
  "Reputacion",
  "Oportunidades",
  "Instalaciones",
  "Comida",
  "Ubicacion",
];

export default function School() {
  const [teachers, setTeachers] = useState([]);
  const [resenas, setResenas] = useState([]);

  React.useEffect(() => {
    axios
      .get(`${SURVEY_ENDPOINT}/api/survey/teachers`)
      .then((res) => setTeachers(res.data.teachers));
  }, []);

  return (
    <Box sx={{ flexGrow: 1, width: "98%" }}>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: "100%",
                height: "100%",
              },
            }}
          >
            <Sheet elevation={3}>
              <Typography variant="h5" m={5}>
                Profesores mejores calificados
              </Typography>
              {teachers.map(({ name: teacherName, _id: id }) => {
                console.log(id)
                return (
                  <Link to={"/teacher/" + id}>
                    <Box m={5} sx={{ display: "flex" }} key={teacherName}>
                      <AccountCircleIcon />
                      <Box>
                        <Typography px={12}> {teacherName} </Typography>
                        <Typography px={12}>
                          Reseñas {randomNumberInRange(60, 100)}
                        </Typography>
                      </Box>
                    </Box>
                  </Link>
                )
              })}
            </Sheet>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              "& > :not(style)": {
                m: 1,
                width: "100%",
                height: "100%",
              },
            }}
          >
            <Sheet elevation={3}>
              <Typography variant="h5" m={5}>
                Calificacion de la escuela {}
              </Typography>
              {schoolCals.map((schoolCal) => (
                <Box m={5} sx={{ display: "flex" }} key={schoolCal}>
                  <Typography px={2}>
                    {" "}
                    {schoolCal}
                    <Typography> {randomNumberInRange(60, 100)} </Typography>
                  </Typography>
                  <StarIcon fontSize="large"></StarIcon>
                </Box>
              ))}
            </Sheet>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
