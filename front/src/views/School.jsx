import * as React from "react";
import Box from "@mui/joy/Box";
import Sheet from "@mui/joy/Sheet";
import Grid from "@mui/joy/Grid";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Typography } from "@mui/joy";
import StarIcon from "@mui/icons-material/Star";

// function randomNumberInRange(min, max) {
//   min = 1;
//   max = 100;
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

const profesors = [
  "Aaran",
  "Aaren",
  "Aarez",
  "Aarman",
  "Aaron",
  "Aaron-Jamesafdsasfdsafasdfasdfs",
  "Aarron",
  "Aaryan",
  "Aaryn",
  "Aayan",
  "Aazaan",
  "Abaan",
  "Abbas",
];
const schoolCals = [
  "Reputacion",
  "Oportunidades",
  "Instalaciones",
  "Comida",
  "Ubicacion",
];

const listSchoolCal = schoolCals.map((schoolCal) => (
  <Box m={5} sx={{ display: "flex", justifyContent: "space-between" }}>
    <Typography mx={2}>
      {" "}
      {schoolCal}
      <Typography> 9.0 </Typography>
    </Typography>
    <StarIcon fontSize="large"></StarIcon>
  </Box>
));

const listProfesors = profesors.map((profesor, key) => (
  <Box m={5} sx={{ display: "flex" }}>
    <AccountCircleIcon />
    <Typography mx={12}>
      {" "}
      {profesor}
      <Typography>Resenas </Typography>
    </Typography>
  </Box>
));

export default function School() {
  return (
    <Box sx={{ flexGrow: 1, width: "100%" }}>
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
            <Sheet elevation={3} sx={{ backgroundColor: "#808080" }}>
              <Typography variant="h5" m={5}>
                Profesores mejores calificados
              </Typography>
              {listProfesors}
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
                Calificacion de la escuela
              </Typography>
              {listSchoolCal}
            </Sheet>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
