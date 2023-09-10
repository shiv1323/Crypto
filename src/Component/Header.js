import {
  AppBar,
  Container,
  MenuItem,
  Select,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  makeStyles,
} from "@material-ui/core";
import React from "react";

import { useNavigate } from "react-router-dom";
import { CryptoState } from "../Contextapi/CryptoContext";
import Authentication from "../Auth/Authentication";
import Sidebar from "../Auth/Sidebar";

const useStyles = makeStyles(() => ({
  title: {
    flex: 1,
    color: "#3F51B5",
    fontFamily: "Lato",
    fontWeight: "bold",
    cursor: "pointer",
  },
}));

const Header = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const { currency, setCurrency, user } = CryptoState();

  const handleTypographyClick = () => {
    // Use the navigate function to programmatically navigate to the specified route
    navigate("/");
  };

  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#fff",
      },
      type: "dark",
    },
  });

  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar color="transparent" position="static">
        <Container>
          <Toolbar>
            <Typography
              onClick={handleTypographyClick}
              className={classes.title}
              variant="h6"
            >
              Crypto
            </Typography>
            <Select
              style={{
                width: 100,
                height: 40,
                marginRight: 15,
              }}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              <MenuItem value={"USD"}>USD</MenuItem>
              <MenuItem value={"INR"}>INR</MenuItem>
            </Select>
            {user ? <Sidebar /> : <Authentication />}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
