import { Suspense, lazy } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./Component/Header";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "./Component/Alert";
import Loading from "./Component/Loading";

const Homepage = lazy(() => import("./Pages/Homepage"));
const Coinpage = lazy(() => import("./Pages/Coinpage"));

// Define styles using makeStyles
const useStyles = makeStyles({
  root: {
    background: "#161616", // Set the background color to dark gray
    color: "#fff", // Set the text color to white
    minHeight: "100vh", // Ensure a minimum height of 100 viewport heights
  },
});

function App() {
  // Create an instance of useStyles
  const classes = useStyles();

  return (
    <Router>
      <div className={classes.root}>
        {/* on every page Header present */}
        <Header />
        <Suspense fallback={<Loading />}>
          <Routes>
            {/* homepage  */}
            <Route path="/" element={<Homepage />} />
            {/* Coinpage for detail */}
            <Route path="/coins/:id" element={<Coinpage />} />
          </Routes>
        </Suspense>
      </div>
      <Alert />
    </Router>
  );
}

export default App;
