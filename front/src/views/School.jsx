import * as React from 'react';
import Box from '@mui/joy/Box';
import Sheet from '@mui/joy/Sheet';
import Grid from '@mui/joy/Grid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Typography } from '@mui/joy';
import StarIcon from '@mui/icons-material/Star';


function randomNumberInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}



const profesors = ["Citlali Ritter", "Javonte Grover", "Josh Dominguez", "Javion Pullen", "Leigh Durant", "Suzanne Blount", "Christian Wagner", "Iris Rubio", "Dante Slone", "Maddie Hatfield"]
const schoolCals = ["Reputacion", "Oportunidades", "Instalaciones", "Comida", "Ubicacion"]

const listSchoolCal = schoolCals.map((schoolCal) => 
  <Box m={5} sx={{display: "flex",}}>
    <Typography px={2}> {schoolCal} 
      <Typography> {randomNumberInRange(60, 100)} </Typography>
    </Typography>
    <StarIcon fontSize="large"></StarIcon>
  </Box>
)

const listProfesors = profesors.map((profesor, key) => 
  <Box m={5} sx={{display: "flex"}}>
    <AccountCircleIcon />
    <Box>
      <Typography px={12}> {profesor} </Typography> 
      <Typography px={12}>Resenas {randomNumberInRange(60,100)}</Typography>
    </Box>
  </Box>
)


export default function School() {
  return (
  <Box sx={{ flexGrow: 1, width: "98%"}} >
    <Grid container spacing={2} >
      <Grid item xs={6} > 
        <Box  sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: "100%",
            height: "100%",
            },
          }}>
          <Sheet elevation={3} >
          <Typography variant='h5' m={5}>Profesores mejores calificados</Typography>
            {listProfesors}
          </Sheet>
        </Box>
      </Grid>
      <Grid item xs={6}>
      <Box  sx={{
          display: 'flex',
          flexWrap: 'wrap',
          '& > :not(style)': {
            m: 1,
            width: "100%",
            height: "100%",
            },
          }}>
          <Sheet elevation={3}>
          <Typography variant='h5' m={5}>Calificacion de la escuela {}</Typography>
            {listSchoolCal}
          </Sheet>
        </Box>
      </Grid>
    </Grid>
  </Box>
  );
}
