import React from "react";
import { useParams } from "react-router-dom";
import TripPlanner from "./TripPackage";

function Trip() {
  const { planId } = useParams();

  return (
    <>
      <TripPlanner />
    </>
  );
}

export default Trip;
