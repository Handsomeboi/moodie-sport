import firebase from "firebase";
import Button from "@material-ui/core/Button";
import { useState } from "react";

const DefaultDashboard = (props) => {
  return (
    <Button
      onClick={props.onNewSurveyHandler}
      fullWidth
      variant="contained"
      color="primary"
    >
      New Survey
    </Button>
  );
};

export default DefaultDashboard;
