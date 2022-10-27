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
import MenuIcon from "@mui/icons-material/Menu";

const routes = [
  {
    name: "Home",
    route: "/",
    hideTop: true,
  },
  {
    name: "Universidades",
    route: "/",
  },
  {
    name: "Profesores",
    route: "/teachers",
  },
  {
    name: "Calificar",
    route: "/qualify",
  },
];

export function Header(props) {
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElMenu, setAnchorElMenu] = React.useState(null);
  const { user, login, logout } = useAuthContext();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const isMenuOpen = Boolean(anchorElMenu);
  const openMenu = (event) => {
    setAnchorElMenu(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorElMenu(null);
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
        <IconButton
          variant="outlined"
          sx={{ display: { md: "none" } }}
          onClick={openMenu}
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="nav-menu"
          anchorEl={anchorElMenu}
          open={isMenuOpen}
          onClose={closeMenu}
        >
          {routes.map(({ route, name }) => (
            <MenuItem component={Link} to={route} key={name}>
              {name}
            </MenuItem>
          ))}
        </Menu>

        <Link style={{ textDecoration: "none" }} to={"/"}>
          <Typography component="h1" fontWeight="xl">
            Calificaciones de Profesores
          </Typography>
        </Link>

        <Box
          sx={{
            display: {
              xs: "none",
              md: "flex",
            },
          }}
        >
          {routes
            .filter((item) => item.hideTop !== true)
            .map(({ name, route }) => (
              <Link
                style={{ textDecoration: "none", paddingRight: 14 }}
                to={route}
                key={name}
              >
                <Typography component="h2" fontWeight="md">
                  {name}
                </Typography>
              </Link>
            ))}
        </Box>
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
            md: "flex",
          },
        }}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          gap: 1.5,
          width: {
            xl: "480px",
          },
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
