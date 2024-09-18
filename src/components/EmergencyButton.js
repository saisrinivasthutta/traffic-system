import React, { useContext } from "react";
import { GiSiren } from "react-icons/gi";
import { TrafficLightContext } from "../context/TrafficLightContext";
import "./EmergencyButton.css"; //

const EmergencyButton = () => {
  const { dispatch, state } = useContext(TrafficLightContext);
  //Dispatches The EMERGENCY Reducer on Click events
  const handleClick = () => {
    dispatch({
      statusText: "EMERGENCY! PLEASE STOP!",
      type: "EMERGENCY_OVERRIDE",
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`emergency-button ${state.emergencyOverride && "blink"}`}
    >
      Emergency Override <GiSiren />
    </button>
  );
};

export default EmergencyButton;
