import Radio from "@material-ui/core/Radio";
import React from "react";
import { arrayWithIncrementalValues } from "../utils/arrayWithIncrementalValues";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";

const SurveyQuestion = (props) => {
  const [selectedValue, setSelectedValue] = React.useState("a");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <div key={props.question.id}>
      <FormControl component="fieldset">
        <FormLabel component="legend">{props.question.question}</FormLabel>
        <RadioGroup
          row
          aria-label="position"
          name="position"
          defaultValue="top"
        >
          {arrayWithIncrementalValues(1, 5).map((num, index) => (
            <FormControlLabel
              key={num}
              value={num}
              control={<Radio color="primary" />}
              label={num}
              labelPlacement="top"
            />
          ))}
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SurveyQuestion;
