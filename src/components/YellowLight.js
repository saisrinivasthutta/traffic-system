import React, { useContext } from "react";
import { TrafficLightContext } from "../context/TrafficLightContext";
import "./YellowLight.css";

const YellowLight = () => {
  const { state, dispatch } = useContext(TrafficLightContext);

  const decrementYellowTimer = () => {
    if (state.yellowTimer > 0) {
      dispatch({
        type: "DECREMENT_YELLOW_TIMER",
        payload: state.yellowTimer - 1,
      });
    } else {
      // Reset the timer to its initial value
      dispatch({
        type: "RESET_YELLOW_TIMER",
        payload: 3,
      });
    }
  };

  // Using useEffect to decrement the timer every second
  React.useEffect(() => {
    const timer = setInterval(decrementYellowTimer, 1000);
    return () => clearInterval(timer);
  }, [state.yellowTimer]);

  return (
    <div
      className={`light yellow-light ${
        state.currentLight === "Yellow" ? "active-yellow" : "inactive-yellow"
      }`}
    >
      {state.currentLight === "Yellow" && (
        <div className="countdown">
          <h1>{state.yellowTimer}</h1>
        </div>
      )}
    </div>
  );
};

export default YellowLight;
