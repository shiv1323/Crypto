import React, { Suspense, lazy } from "react";
import { ErrorBoundary } from "react-error-boundary";

import Banner from "../Component/Banner";
import Loading from "../Component/Loading";
import { Button } from "@material-ui/core";
const Coinstable = lazy(() => import("../Component/Coinstable"));

const Homepage = () => {
  return (
    <>
      <Banner />
      <ErrorBoundary
        fallback={
          <Button
            variant="contained"
            style={{ width: "100%", display: "flex", placeItems: "center" }}
            onClick={() => {
              window.location.reload();
            }}
          >
            Something went wrong
          </Button>
        }
      >
        <Suspense fallback={<Loading />}>
          <Coinstable />
        </Suspense>
      </ErrorBoundary>
    </>
  );
};

export default Homepage;
