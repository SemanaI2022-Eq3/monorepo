import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { AUTH_ENDPOINT, SURVEY_ENDPOINT } from "../constants";
import { styled } from "@mui/joy/styles";
import Button from "@mui/joy/Button";
import Box from "@mui/joy/Box";
import { useNavigate } from "react-router-dom";

const Separator = styled("div")(
  ({ theme }) => `
    height: ${theme.spacing(3)};`
);

const Home = () => {
  const [authServiceStatus, setAuthServiceStatus] = useState("Loading...");
  const [surveyServiceStatus, setSurveyServiceStatus] = useState("Loading...");
  const navigate = useNavigate();
  const navegarEscuela = () => {
    navigate("/school");
  };
  const navegarForms = () => {
    navigate("/qualify");
  };
  useEffect(() => {
    axios
      .get(`${AUTH_ENDPOINT}/api/auth/`)
      .then((res) => {
        setAuthServiceStatus(res.data.message);
      })
      .catch(() => {
        setAuthServiceStatus("Down");
      });

    axios
      .get(`${SURVEY_ENDPOINT}/api/survey/`)
      .then((res) => {
        setSurveyServiceStatus(res.data.message);
      })
      .catch(() => {
        setSurveyServiceStatus("Down");
      });
  }, []);

  return (
    <Sheet sx={{ p: 4, display: "flex", justifyContent: "center" }}>
      <div
        style={{ backgroundColor: "#151719", width: "100vw", height: "100vh" }}
      >
        <Box sx={{ p: 4, display: "flex", justifyContent: "center" }}>
          <h1
            style={{
              fontFamily: "Inter",
              fontSize: "52px",
              lineHeight: "62px",
              color: "#eceded",
              fontWeight: "800",
            }}
          >
            ¡Califica a tus
            <span style={{ color: "#5658dd" }}> profesores!</span>
          </h1>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <p style={{ color: "white" }}>
            Evalúa a tus maestros o revisa calificaciones de tus futuros
            profesores antes de inscribirlos.
          </p>
        </Box>

        <Separator />

        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Button onClick={navegarForms}>Calificar a un profesor</Button>
          &nbsp;&nbsp;&nbsp;
          <Button onClick={navegarEscuela}>Ver profesores</Button>
        </Box>

        <Box sx={{ p: 5, display: "flex", justifyContent: "center" }}>
          <img
            style={{ width: 600, height: 380 }}
            src="https://eresmama.com/wp-content/uploads/2019/07/reunion-grupo-apoyo-profesores.jpg"
            alt="Estudiantes"
          />
        </Box>
      </div>
    </Sheet>
  );
};

export default Home;
