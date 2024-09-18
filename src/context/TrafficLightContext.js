import React, { createContext, useReducer } from "react";

// Initial state
const initialState = {
  currentLight: "Green",
  greenTimer: 10,
  redTimer: 7,
  yellowTimer: 3,
  pedestrianRequested: false,
  emergencyOverride: false,
  statusText: "GO NOW!",
  timers: {
    Green: 10,
    Yellow: 3,
    Red: 7,
    PedestrianRed: 5,
  },
};

// Reducer
const trafficLightReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_LIGHT":
      return {
        ...state,
        yellowTimer: action.timer,
        redTimer: state.timers.Red,
        timers: {
          ...state.timers,
          Red: state.pedestrianRequested ? 12 : 7,
        },
        greenTimer: state.timers.Green,
        statusText: action.statusText,
        currentLight: action.payload,
      };
    case "REQUEST_CROSSING":
      return {
        ...state,
        redTimer: action.timer,
        pedestrianRequested: true,
      };
    case "EMERGENCY_OVERRIDE":
      return {
        ...state,
        statusText: action.statusText,
        emergencyOverride: true,
        currentLight: "Red",
        redTimer: state.timers.Red,
        yellowTimer: state.timers.Yellow,
        greenTimer: state.timers.Green,
      };
    case "RESET_TIMER":
      return {
        ...initialState,
      };
    case "RESET_EMERGENCY_OVERRIDE":
      return {
        ...state,
        emergencyOverride: false,
      };
    case "DECREMENT_GREEN_TIMER":
      return {
        ...state,
        greenTimer: action.payload,
      };
    case "DECREMENT_RED_TIMER":
      return {
        ...state,
        redTimer: action.payload,
      };
    case "DECREMENT_YELLOW_TIMER":
      return {
        ...state,
        yellowTimer: action.payload,
      };
    case "RESET_GREEN_TIMER":
      return {
        ...state,
        greenTimer: action.payload,
      };
    case "RESET_YELLOW_TIMER":
      return {
        ...state,
        yellowTimer: action.payload,
      };
    case "RESET_RED_TIMER":
      return {
        ...state,
        redTimer: action.payload,
      };
    default:
      return state;
  }
};

// Context
export const TrafficLightContext = createContext(initialState);

// Provider
export const TrafficLightProvider = ({ children }) => {
  const [state, dispatch] = useReducer(trafficLightReducer, initialState);

  const value = { state, dispatch };

  return (
    <TrafficLightContext.Provider value={value}>
      {children}
    </TrafficLightContext.Provider>
  );
};

// Export the reducer and initial state
export { trafficLightReducer, initialState };
