import { Grid2 } from "@mui/material";
import BasicButton from "./BasicButton";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ConfirmAndSubmit from "../../student/common/ConfirmAndSubmit";

function PrevNextSubmitButton({
  handlePrevious,
  handleNext,
  submitConent,
  scoreContent,
  sx = { marginTop: "1rem", justifyContent: "flex-end", paddingRight: "1rem" },
}) {
  return (
    <Grid2 container spacing={3} sx={sx}>
      <BasicButton
        content="Previous"
        onClick={handlePrevious}
        startIcon={<ArrowBackIosNewRoundedIcon />}
        sx={{ color: "#fff", backgroundColor: "#ACCD0A" }}
      />
      <BasicButton
        content="Next"
        onClick={handleNext}
        endIcon={<ArrowForwardIosRoundedIcon />}
        sx={{ color: "#fff", backgroundColor: "#ACCD0A" }}
      />
      <ConfirmAndSubmit
        submitConent={submitConent}
        scoreContent={scoreContent}
        sx={{ color: "#fff", backgroundColor: "#ACCD0A" }}
      />
    </Grid2>
  );
}

export default PrevNextSubmitButton;
