import React, { useEffect, useReducer, useState } from "react";
import {
  TrafficLightContext,
  trafficLightReducer,
  initialState,
} from "./TrafficLightContext";

const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficLightReducer, initialState);
  const [countdown, setCountdown] = useState(initialState.greenTimer);

  // Effect to change the light based on the current state
  useEffect(() => {
    let timer;

    const changeLight = () => {
      switch (state.currentLight) {
        case "Green":
          dispatch({
            statusText: "PLEASE STOP!",
            timer: state.timers.Yellow,
            type: "CHANGE_LIGHT",
            payload: "Yellow",
          });
          break;
        case "Yellow":
          dispatch({
            statusText: "PLEASE STOP!",
            timer: state.timers.Red,
            type: "CHANGE_LIGHT",
            payload: "Red",
          });
          break;
        case "Red":
          if (state.pedestrianRequested) {
            dispatch({
              statusText: "PLEASE STOP!",
              timer: state.timers.PedestrianRed,
              type: "CHANGE_LIGHT",
              payload: "Red",
            });
            dispatch({ statusText: "GO!", type: "RESET_TIMER" });
          } else {
            dispatch({
              statusText: "GO NOW!",
              timer: state.timers.Green,
              type: "CHANGE_LIGHT",
              payload: "Green",
            });
          }
          break;
        default:
          dispatch({ type: "CHANGE_LIGHT", timer: 10, payload: "Green" });
      }
    };

    timer = setTimeout(changeLight, state.timers[state.currentLight] * 1000);

    return () => clearTimeout(timer);
  }, [state.currentLight, state.pedestrianRequested]);

  // Effect to handle emergency override
  useEffect(() => {
    if (state.emergencyOverride) {
      dispatch({
        statusText: "EMERGENCY! PLEASE STOP!",
        timer: state.timers.Red,
        type: "CHANGE_LIGHT",
        payload: "Red",
      });
    }
  }, [state.emergencyOverride]);

  // Effect to update the countdown timer
  useEffect(() => {
    let timer;

    if (state.currentLight !== "Red" || !state.pedestrianRequested) {
      timer = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown > 0) {
            return prevCountdown - 1;
          } else {
            dispatch({
              statusText: "GO NOW!",
              timer: state.timers.Green,
              type: "CHANGE_LIGHT",
              payload: "Green",
            });
            return 0;
          }
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [state.currentLight, state.pedestrianRequested]);

  // Effect to reset the countdown when the light changes
  useEffect(() => {
    setCountdown(state.timers[state.currentLight]);
  }, [state.currentLight]);

  //Effect to reset the State when Emergency  Overriding is completed
  useEffect(() => {
    if (state.currentLight === "Green" && state.emergencyOverride) {
      dispatch({ type: "RESET_EMERGENCY_OVERRIDE" });
    }
  }, [state.currentLight, state.emergencyOverride]);

  return (
    <TrafficLightContext.Provider value={{ state, dispatch, countdown }}>
      {children}
    </TrafficLightContext.Provider>
  );
};

export default TrafficLightProvider;
