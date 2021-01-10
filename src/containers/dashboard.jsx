import firebase from "firebase";
import Button from "@material-ui/core/Button";
import { useState } from "react";
import DefaultDashboard from "./defaultDashboard";
import NewSurvey from './newSurvey'

export const dashboardRoutes = "NEW_SURVEY" | "DASHBOARD";

const Dashboard = () => {
  const [route, setRoute] = useState("DASHBOARD");

  switch (route) {
    case "DASHBOARD":
      return (
        <DefaultDashboard
          onNewSurveyHandler={() => {
            setRoute("NEW_SURVEY");
          }}
        />
      );

    case "NEW_SURVEY":
      return <NewSurvey />;

    default:
      return (
        <DefaultDashboard
          onNewSurveyHandler={() => {
            setRoute("NEW_SURVEY");
          }}
        />
      );
  }
};

export default Dashboard;
