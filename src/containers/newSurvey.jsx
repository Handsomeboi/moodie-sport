import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import SurveyQuestion from "./surveyQuestion";
import firebase from "firebase";

const data = [
  {
    id: 1,
    question: "I have felt cheerful and in good spirit",
  },
  {
    id: 2,
    question: "I felt calm and relaxed",
  },
  {
    id: 3,
    question: "I have felt active and vigorous",
  },
  {
    id: 4,
    question: "I woke up feeling fresh and rested",
  },
  {
    id: 5,
    question: "My daily life has been filled things that interest me",
  },
];

const survey = {
  id: "donger",
  data,
};

const NewSurvey = () => {
  const user = firebase.auth().currentUser;
  console.log(user);

  const users = firebase.firestore().collection("users").doc(user.uid);

  users.get().then((snap) => {
    console.log(snap.data());
  });

  console.log(users);

  return (
    <div>
      {survey.data.map((d) => (
        <SurveyQuestion key={d.question.id} question={d} />
      ))}
    </div>
  );
};
export default NewSurvey;
