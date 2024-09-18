import React, { useContext } from "react";
import { TrafficLightContext } from "../context/TrafficLightContext";
import "./GreenLight.css";

const GreenLight = () => {
  const { state, dispatch } = useContext(TrafficLightContext);

  // Function to decrement the greenTimer
  const decrementGreenTimer = () => {
    if (state.greenTimer > 1) {
      dispatch({
        type: "DECREMENT_GREEN_TIMER",
        payload: state.greenTimer - 1,
      });
    } else {
      // Reset the timer to its initial value
      dispatch({
        type: "RESET_GREEN_TIMER",
        payload: 10,
      });
    }
  };

  // Use useEffect to decrement the timer every second
  React.useEffect(() => {
    const timer = setInterval(decrementGreenTimer, 1000);
    return () => clearInterval(timer);
  }, [state.greenTimer]);

  return (
    <div>
      <div
        className={`light green-light ${
          state.currentLight === "Green" ? "active-green" : "inactive-green"
        }`}
      >
        {state.currentLight === "Green" && (
          <div className="countdown">
            <h1>{state.greenTimer}</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default GreenLight;
