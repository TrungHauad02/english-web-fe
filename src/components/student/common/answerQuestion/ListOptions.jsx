import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

export default function ListOptions({ listAnswer, sx, onChange, value }) {
  return (
    <FormControl sx={sx}>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="list-answer"
        onChange={onChange}
      >
        {listAnswer.map((answer) => (
          <FormControlLabel
            key={answer.id}
            value={answer.id}
            checked={value === answer.id}
            control={<Radio />}
            label={answer.content}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
