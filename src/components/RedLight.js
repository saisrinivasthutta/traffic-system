import React, { useContext } from "react";
import { TrafficLightContext } from "../context/TrafficLightContext";
import "./RedLight.css";

const RedLight = () => {
  const { state, dispatch } = useContext(TrafficLightContext);

  // Function to decrement the redTimer
  const decrementRedTimer = () => {
    if (state.redTimer > 0) {
      dispatch({
        type: "DECREMENT_RED_TIMER",
        payload: state.redTimer - 1,
      });
    } else {
      // Reset the timer to its initial value
      dispatch({
        type: "RESET_RED_TIMER",
        payload: 7,
      });
    }
  };

  // Use useEffect to decrement the timer every second
  React.useEffect(() => {
    const timer = setInterval(decrementRedTimer, 1000);
    return () => clearInterval(timer);
  }, [state.redTimer]);

  return (
    <div
      className={`light red-light ${
        state.currentLight === "Red" ? "active-red" : "inactive-red"
      }`}
    >
      {state.currentLight === "Red" && (
        <div className="countdown">
          <h1>{state.redTimer}</h1>
        </div>
      )}
    </div>
  );
};

export default RedLight;
