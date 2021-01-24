import React from "react";
import { useState } from "react";
import { withStyles } from "@material-ui/core/styles";
import { green } from "@material-ui/core/colors";
import Radio, { RadioProps } from "@material-ui/core/Radio";
import SurveyQuestion from "./surveyQuestion";
import firebase from "firebase";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";

import { useAuthState } from "react-firebase-hooks/auth";
/**
 * Hard coded data
 * Fremtidig udvikling, skal der laves en firebase collection
 * som indeholder vores surveys
 */
const data = [
  {
    id: 1,
    answer: "",
    question: "I de sidste 2 uger har jeg været glad og i godt humør",
  },
  {
    id: 2,
    answer: "",
    question: "I de sidste 2 uger har jeg følt mig rolig og afslappet",
  },
  {
    id: 3,
    answer: "",
    question: "I de sidste 2 uger har jeg følt mig aktiv og energisk",
  },
  {
    id: 4,
    answer: "",
    question: "I de sidste 2 uger er jeg vågnet frisk og udhvilet",
  },
  {
    id: 5,
    answer: "",
    question: "I de sidste 2 uger har min daglidag været fyædt med ting der interessere mig",
  },
];

const survey = {
  id: "6a1ef68e4af65a1f68",
  data,
};
/**
 * Custom hook
 * Vi finder brugeren
 */
const useStartedSurveyByUser = () => {
  const [user] = useAuthState(firebase.auth());
  /**
   * Ud fra brugeren, så tjekker vi om user id
   * har vores "startedSurvey"
   */
  const [startedSurveysForUser] = useCollection(
    firebase
      .firestore()
      .collection("users")
      .doc(user.uid)
      .collection("startedSurveys")
  );
  /**
   * Hvis brugeren ikke har "startedSurvey" eller startedSurveys Collection er tom,
   * så tilføjer vi et "startedSurvey" dokument til brugeren
   */
  if (!startedSurveysForUser) {
    const ref = firebase.firestore().collection("users").doc(user.uid);

    ref.collection("startedSurveys").doc(survey.id).set(survey);
  }

  /**
   * Hvis collectionen "startedSurvey" findes og vi ikke finder et dokument
   * med samme ID som den ID vi prøver at starte
   * så tilføjer vi en surveyen
   */
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
  /**
   * Vi henter surveyen ud til brugeren
   * inden rendering, så loader vi for brugeren
   * 
   * ellers return error
   */
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
/**
 * her brugere vi vores custom hook
 * til at hente survey doc ref
 * samt loading og error states
 */
const NewSurvey = () => {
  const [userSurveyRef, loading, error] = useStartedSurveyByUser();

  if (error) {
    return <div>Error, couldnt find survey</div>;
  }

  if (loading) {
    return "loading....";
  }
  /**
   * 
   * @param {Hvilket spørgsmål vi prøver at svare på} id 
   * @param {Svaret på spørgsmålet, som skal gemmes} answer 
   * 
   * Vores handle function tilføjer et svar
   * til vores survey collection doc
   */
  const handle = async (id, answer) => {
    /**
     * Her gemmer vi brugeren svar så hvis de forlader surveyen
     * så bliver deres svar gemt og kan blive opdateret
     */
    const data = userSurveyRef.data(); // konkret data for survey
    const filtered = data.data.filter((d) => d.id !== id); // filtrere det gamle svar væk


    // tilføjer det nye svar
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
