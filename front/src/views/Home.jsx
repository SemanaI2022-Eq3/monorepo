import Sheet from "@mui/joy/Sheet";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

const Home = () => {
  const [authServiceStatus, setAuthServiceStatus] = useState("Loading...");
  const [surveyServiceStatus, setSurveyServiceStatus] = useState("Loading...");

  useEffect(() => {
    axios
      .get("/api/auth/")
      .then((res) => {
        setAuthServiceStatus(res.data.message);
      })
      .catch(() => {
        setAuthServiceStatus("Down");
      });

    axios
      .get("/api/survey/")
      .then((res) => {
        setSurveyServiceStatus(res.data.message);
      })
      .catch(() => {
        setSurveyServiceStatus("Down");
      });
  }, []);

  return (
    <Sheet
      sx={{
        width: 300,
        mx: "auto",
        my: 4,
        py: 3,
        px: 2,
        display: "flex",
        flexDirection: "column",
        gap: 2,
        borderRadius: "sm",
        boxShadow: "md",
      }}
    >
      Welcome!
      <br />
      Auth service status: {authServiceStatus}
      <br />
      Survey service status: {surveyServiceStatus}
    </Sheet>
  );
};

export default Home;
