import Radio from "@material-ui/core/Radio";
import React from "react";
import { arrayWithIncrementalValues } from "../utils/arrayWithIncrementalValues";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const SurveyQuestion = (props) => {
  const [selectedValue, setSelectedValue] = React.useState(
    props.question.answer ?? 1
  );
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    if (props.question) {
      props.onAnswerGiven(props.question.id, {
        ...props.question,
        answer: event.target.value,
      });
    }
  };

  return (
    <div>
      <FormControl component="fieldset">
        <FormLabel component="legend">{props.question.question}</FormLabel>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          value={selectedValue}
          onChange={handleChange}
        >
          <FormControlLabel
            value="1"
            control={<Radio color="primary" />}
            label="1"
            labelPlacement="top"
          />
          <FormControlLabel
            value="2"
            control={<Radio color="primary" />}
            label="2"
            labelPlacement="top"
          />
          <FormControlLabel
            value="3"
            control={<Radio color="primary" />}
            label="3"
            labelPlacement="top"
          />
          <FormControlLabel
            value="4"
            control={<Radio color="primary" />}
            label="4"
            labelPlacement="top"
          />
          <FormControlLabel
            value="5"
            control={<Radio color="primary" />}
            label="5"
            labelPlacement="top"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SurveyQuestion;
