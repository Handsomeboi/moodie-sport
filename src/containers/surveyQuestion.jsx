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
          {/* [1, 2, 3, 4, 5] */}
          {/*arrayWithIncrementalValues(1, 5).map((value) =>
            <FormControlLabel
              value={value.toString()}
              control={<Radio color="primary" />}
              label={value}
              labelPlacement="top"
          />)*/}
          <FormControlLabel
            value="På intet tidspunkt"
            control={<Radio color="primary" />}
            label="På intet tidspunkt"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Lidt af tiden"
            control={<Radio color="primary" />}
            label="Lidt af tiden"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Lidt mindre end halvdelen af tiden"
            control={<Radio color="primary" />}
            label="Lidt mindre end halvdelen af tiden"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Lidt mere end halvdelen af tiden"
            control={<Radio color="primary" />}
            label="Lidt mere end halvdelen af tiden"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Det meste af tiden"
            control={<Radio color="primary" />}
            label="Det meste af tiden"
            labelPlacement="top"
          />
          <FormControlLabel
            value="Hele tiden"
            control={<Radio color="primary" />}
            label="Hele tiden"
            labelPlacement="top"
          />
        </RadioGroup>
      </FormControl>
    </div>
  );
};

export default SurveyQuestion;
