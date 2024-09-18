import React, { useContext } from "react";
import { TrafficLightContext } from "./context/TrafficLightContext";
import GreenLight from "./components/GreenLight";
import YellowLight from "./components/YellowLight";
import RedLight from "./components/RedLight";
import PedestrianButton from "./components/PedestrianButton";
import EmergencyButton from "./components/EmergencyButton";
import TrafficLightProvider from "./context/TrafficLightProvider";
import "./App.css";

function App() {
  return (
    <TrafficLightProvider>
      <AppContent />
    </TrafficLightProvider>
  );
}

const AppContent = () => {
  const { state } = useContext(TrafficLightContext);

  return (
    <div className="container">
      <div className="App">
        <h1
          className={`status-heading ${
            state.currentLight === "Green"
              ? "green-status"
              : state.currentLight === "Yellow"
              ? "yellow-status"
              : "red-status"
          }`}
        >
          {state ? state.statusText : "Loading..."}
        </h1>
        <div className="lights-container">
          <GreenLight />
          <YellowLight />
          <RedLight />
        </div>
        <div className="buttons-container">
          <PedestrianButton />
          <EmergencyButton />
        </div>
      </div>
    </div>
  );
};

export default App;
