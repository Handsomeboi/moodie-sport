import React from "react";
import { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import SurveyQuestion from "./surveyQuestion";
import firebase from "firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

const data = [
  {
    id: 1,
    question: "I have felt cheerful and in good spirit",
    answer: "",
  },
  {
    id: 2,
    question: "I felt calm and relaxed",
    answer: "",
  },
  {
    id: 3,

    answer: "",
    question: "I have felt active and vigorous",
  },
  {
    id: 4,
    answer: "",

    question: "I woke up feeling fresh and rested",
  },
  {
    id: 5,
    question: "My daily life has been filled things that interest me",
    answer: "",
  },
];

const survey = {
  id: "donger12",
  data,
};

const useStartedSurveyByUser = () => {
  const [user] = useAuthState(firebase.auth());

  const [startedSurveysForUser] = useCollection(
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("startedSurveys")
  );

  if (!startedSurveysForUser) {
    const ref = firebase.firestore().collection("users").doc(user.uid);

    ref.collection("startedSurveys").doc(survey.id).set(survey);
  }

  if (
    startedSurveysForUser &&
    !!startedSurveysForUser.docs.find((doc) => doc.uid === survey.id)
  ) {
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("startedSurveys")
      .doc(survey.id)
      .set(survey);
  }

  const [userSurveyQuestion, loading, error] = useDocument(
    firebase
      .firestore()
      .doc("users/" + user.uid + "/startedSurveys/" + survey.id)
  );

  const doc =
    startedSurveysForUser &&
    startedSurveysForUser.docs.find((d) => d.id === survey.id);

  return [doc, loading, error];
};

const NewSurvey = () => {
  const [userSurveyRef, loading, error] = useStartedSurveyByUser();

  if (error) {
    return <div>error me mummy</div>;
  }

  if (loading) {
    return "loading....";
  }

  const handle = async (id, answer) => {
    console.log(id, answer);

    const data = userSurveyRef.data();
    const filtered = data.data.filter((d) => d.id !== id);

    console.log(userSurveyRef);

    await userSurveyRef.ref.set({
      ...data,
      data: [...filtered, answer],
    });
  };

  return (
    <div>
      {userSurveyRef &&
        userSurveyRef
          .data()
          .data.sort((a, b) => a.id - b.id)
          .map((d) => (
            <SurveyQuestion
              key={d.question.id}
              question={d}
              onAnswerGiven={handle}
            />
          ))}
    </div>
  );
};
export default NewSurvey;
