import React from "react";
import Box from "@mui/joy/Box";
import { Link } from "react-router-dom";
import Typography from "@mui/joy/Typography";
import {
  TextField,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Button,
  ListItemDecorator,
} from "@mui/joy";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import ColorSchemeToggle from "./ColorSchemeToggle";
import { useAuthContext } from "../context/auth-context";
import Logout from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export function Header(props) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { user, login, logout } = useAuthContext();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: 1.5,
        }}
      >
        <Link style={{ textDecoration: "none" }} to={"/qualify"}>
          <Typography component="h1" fontWeight="xl">
            Califica Profesores
          </Typography>
        </Link>

        <Link
          style={{ textDecoration: "none", paddingRight: "2%" }}
          to={"/universities"}
        >
          <Typography component="h2" fontWeight="md">
            Universidades
          </Typography>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/teachers"}>
          <Typography component="h2" fontWeight="md">
            Profesores
          </Typography>
        </Link>
        <Link style={{ textDecoration: "none" }} to={"/school"}>
          <Typography component="h2" fontWeight="md">
            Escuelas
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
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          width: "340px",
          justifyContent: "end",
        }}
      >
        <IconButton
          size="sm"
          variant="outlined"
          color="primary"
          sx={{ display: { xs: "inline-flex", sm: "none" } }}
        >
          <SearchRoundedIcon />
        </IconButton>

        <ColorSchemeToggle />

        {user !== undefined ? (
          <>
            <IconButton
              onClick={handleOpenUserMenu}
              variant="outlined"
              color="primary"
            >
              <AccountCircleIcon />
            </IconButton>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
              placement="bottom-end"
            >
              <MenuItem>
                <Avatar />
                {user.firstName} {user.lastName}
              </MenuItem>

              <Divider />
              <MenuItem onClick={logout}>
                <ListItemDecorator>
                  <Logout fontSize="small" />
                </ListItemDecorator>
                Logout
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Button sx={{ color: "white", display: "block" }} onClick={login}>
            Login
          </Button>
        )}
      </Box>
    </Box>
  );
}
