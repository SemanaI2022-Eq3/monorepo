import { useState } from "react";
import TextField from "@mui/joy/TextField";
import { Button, Sheet } from "@mui/joy";
import axios from "axios";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import EditIcon from "@mui/icons-material/Edit";
import Slider from "@mui/joy/Slider";
import Box from "@mui/joy/Box";
import Typography from "@mui/joy/Typography";
import { styled } from "@mui/joy/styles";

const Separator = styled("div")(
  ({ theme }) => `
    height: ${theme.spacing(3)};`
);

const marks = [
  {
    value: 25,
    label: "Dificil",
  },
  {
    value: 50,
    label: "Normal",
  },
  {
    value: 75,
    label: "Facil",
  },
  {
    value: 100,
    label: "Super Facil",
  },
];
const marksclaridad = [
  {
    value: 25,
    label: "Nada claro",
  },
  {
    value: 50,
    label: "Poco claro",
  },
  {
    value: 75,
    label: "Claro",
  },
  {
    value: 100,
    label: "Super Claro",
  },
];

const marksayuda = [
  {
    value: 25,
    label: "No Ayuda",
  },
  {
    value: 50,
    label: "Poca Ayuda",
  },
  {
    value: 75,
    label: "Ayuda",
  },
  {
    value: 100,
    label: "Mucha Ayuda",
  },
];

const markcalfs = [
  {
    value: 0,
    label: "0",
  },
  {
    value: 10,
    label: "1",
  },
  {
    value: 20,
    label: "2",
  },
  {
    value: 30,
    label: "3",
  },
  {
    value: 40,
    label: "4",
  },
  {
    value: 50,
    label: "5",
  },
  {
    value: 60,
    label: "6",
  },
  {
    value: 70,
    label: "7",
  },
  {
    value: 80,
    label: "8",
  },
  {
    value: 90,
    label: "9",
  },
  {
    value: 100,
    label: "10",
  },
];

function valueText(value) {
  return `${value}`;
}

const QualifyTeacher = () => {
  const [inputFirstName, setInputFirstName] = useState("");
  const [inputLastName, setInputLastName] = useState("");
  const [inputmateria, setInputmateria] = useState("");
  const [inputFacilidad, setInputFacilidad] = useState("");
  const [inputQuality, setInputQuality] = useState("");
  const [inputAyuda, setInputAyuda] = useState("");
  const [inputCalfAverage, setInputCalfAverage] = useState("");
  const [inputComments, setInputComments] = useState("");

  const handleSaveInfo = (e) => {
    e.preventDefault();

    axios.post(`https://localhost:4000/api/form/teacher`, {
      firstName: inputFirstName,
      lastName: inputLastName,
      materia: inputmateria,
      facilidad: inputFacilidad,
      ayuda: inputAyuda,
      claridad: inputQuality,
      Calificacionpromedio: inputCalfAverage,
      Comments: inputComments,
    });

    setInputFirstName("");
    setInputLastName("");
    setInputmateria("");
    setInputFacilidad("");
    setInputQuality("");
    setInputAyuda("");
    setInputCalfAverage("");
    setInputComments("");
  };

  return (
    <Sheet sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <Sheet>
        <Box sx={{ width: 400 }}>
          <TextField
            color="neutral"
            disabled={false}
            label="Nombre(s)"
            size="md"
            startDecorator={<PersonRoundedIcon />}
            variant="soft"
            placeholder="First Name"
            value={inputFirstName}
            onChange={(e) => setInputFirstName(e.target.value)}
          />
          <TextField
            color="neutral"
            disabled={false}
            label="Apellido(s)"
            size="md"
            startDecorator={<PersonRoundedIcon />}
            variant="soft"
            placeholder="Last Name"
            value={inputLastName}
            onChange={(e) => setInputLastName(e.target.value)}
          />
          <TextField
            color="neutral"
            disabled={false}
            label="Materia"
            size="md"
            startDecorator={<EditIcon />}
            variant="soft"
            placeholder="Materia"
            value={inputmateria}
            onChange={(e) => setInputmateria(e.target.value)}
          />
        </Box>

        <Box sx={{ width: 400 }}>
          <Typography gutterBottom>Facilidad</Typography>
          <Slider
            defaultValue={0}
            getAriaValueText={valueText}
            marks={marks}
            step={25}
            value={inputFacilidad}
            onChange={(e) => setInputFacilidad(e.target.value)}
          />

          <Separator />
          <Typography gutterBottom>Claridad</Typography>
          <Slider
            defaultValue={0}
            getAriaValueText={valueText}
            marks={marksclaridad}
            step={25}
            value={inputQuality}
            onChange={(e) => setInputQuality(e.target.value)}
          />

          <Separator />
          <Typography gutterBottom>Ayuda</Typography>
          <Slider
            defaultValue={0}
            getAriaValueText={valueText}
            marks={marksayuda}
            step={25}
            value={inputAyuda}
            onChange={(e) => setInputAyuda(e.target.value)}
          />

          <Separator />
          <Separator />

          <Typography gutterBottom>Calificacion general profesor</Typography>
          <Slider
            defaultValue={0}
            getAriaValueText={valueText}
            marks={markcalfs}
            step={10}
            value={inputCalfAverage}
            onChange={(e) => setInputCalfAverage(e.target.value)}
          />
        </Box>

        <Separator />

        <TextField
          label="Comentarios"
          placeholder="Escribe aqui los comentarios sobre tu profesor..."
          fullWidth
          value={inputComments}
          onChange={(e) => setInputComments(e.target.value)}
        />
        <Separator />
        <Button onClick={(e) => handleSaveInfo(e)}>Guardar</Button>
      </Sheet>
    </Sheet>
  );
};

export default QualifyTeacher;
