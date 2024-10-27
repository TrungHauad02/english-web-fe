import { Grid2 } from "@mui/material";
import BasicButton from "./BasicButton";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ConfirmAndSubmit from "../confirmDialog/ConfirmAndSubmit";

function PrevNextSubmitButton({
  handlePrevious,
  handleNext,
  submitContent,
  scoreContent,
  onSubmit,
  sx = { marginTop: "1rem", justifyContent: "flex-end", paddingRight: "1rem" },
}) {
  return (
    <Grid2 container spacing={3} sx={sx}>
      <BasicButton
        content="Previous"
        onClick={handlePrevious}
        startIcon={<ArrowBackIosNewRoundedIcon />}
        sx={{
          color: "#fff",
          backgroundColor: "#6EC2F7",
          textTransform: "capitalize",
        }}
      />
      <BasicButton
        content="Next"
        onClick={handleNext}
        endIcon={<ArrowForwardIosRoundedIcon />}
        sx={{
          color: "#fff",
          backgroundColor: "#6EC2F7",
          textTransform: "capitalize",
        }}
      />
      <ConfirmAndSubmit
        submitContent={submitContent}
        scoreContent={scoreContent}
        onSubmit={onSubmit}
        sx={{
          color: "#fff",
          backgroundColor: "#6EC2F7",
          textTransform: "capitalize",
        }}
      />
    </Grid2>
  );
}

export default PrevNextSubmitButton;
