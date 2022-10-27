import Box from "@mui/joy/Box";

import { Link } from "react-router-dom";

import Typography from "@mui/joy/Typography";
import { TextField, IconButton } from "@mui/joy";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";

function Header(props) {
  return (
    <Box
      component="header"
      className="Header"
      {...props}
      sx={[
        {
          p: 2,
          gap: 2,
          bgcolor: "background.componentBg",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          gridColumn: "1 / -1",
          borderBottom: "1px solid",
          borderColor: "divider",
          position: "sticky",
          top: 0,
          zIndex: 1100,
        },
        ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
      ]}
    >
      <Link style={{ textDecoration: "none" }} to={"/"}>
        <Link style={{textDecoration: "none"}} to={"/school"}>
          <Typography component="h1" fontWeight="xl">
            Califica Profesores
          </Typography>
        </Link>
      </Link>

      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Link
          style={{ textDecoration: "none", paddingRight: "2%" }}
          to={"/universities"}
        >
          <Typography component="h2" fontWeight="md">
            Universidades
          </Typography>
        </Link>
        <Link style={{ textDecoration: "none", paddingRight: "2%" }} to={"/teachers"}>
          <Typography component="h2" fontWeight="md">
            Profesores
          </Typography>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/school"}>
          <Typography component="h2" fontWeight="md">
            Escuela
          </Typography>
        </Link>
      </Box>

      <TextField
        size="sm"
        placeholder="Buscar profesores"
        startDecorator={<SearchRoundedIcon color="primary" />}
        endDecorator={
          <IconButton variant="outlined" size="sm" color="neutral">
            <Typography fontWeight="lg" fontSize="sm" textColor="text.tertiary">
              /
            </Typography>
          </IconButton>
        }
        sx={{
          flexBasis: "500px",
          display: {
            xs: "none",
            sm: "flex",
          },
        }}
      />
    </Box>
  );
}

export default Header;
