import React, { useContext } from "react";
import { FaWalking } from "react-icons/fa";
import { TrafficLightContext } from "../context/TrafficLightContext";
import "./PedestrianButton.css";

const PedestrianButton = () => {
  //Dispatches the REQUEST_CROSSING Reducer on Click events
  const { dispatch, state } = useContext(TrafficLightContext);
  const handleClick = () => {
    dispatch({ timer: 12, type: "REQUEST_CROSSING" });
  };

  return (
    <button
      onClick={handleClick}
      className={`pedestrian-button ${state.pedestrianRequested && "blink"}`}
    >
      Request Crossing
      <FaWalking />
    </button>
  );
};

export default PedestrianButton;
