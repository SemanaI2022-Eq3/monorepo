import { Typography, Card } from "@mui/joy";
import Sheet, { SheetProps } from "@mui/joy/Sheet";
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

  const teacher = {
    id: "90449",
    nombre: "Angel",
    apellido: "Abasolo Sotres",
    clase: "Publicidad y Mercadotecnia",
    numeroCalificaciones: "5",
    calificacion: "7.6",
  };
  console.log(id);
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
          {teacher.nombre + " " + teacher.apellido}
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
            <Typography level="display1">{teacher.calificacion}%</Typography>
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
              Recomendado
            </Typography>
            <Typography level="display1">5.4%</Typography>
            <Typography level="h2" fontSize="lg" sx={{ mb: 0.5 }}>
              Dificultad
            </Typography>
            <Typography level="display1">4/5</Typography>
          </Card>
          <Card component="li" sx={{ minWidth: 300, flexGrow: 3 }}>
            <Typography>Hello world!</Typography>
          </Card>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
