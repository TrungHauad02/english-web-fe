import { Grid2 } from "@mui/material";
import BasicButton from "./BasicButton";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import ConfirmAndSubmit from "../confirmDialog/ConfirmAndSubmit";
import useColor from "shared/color/Color";

function PrevNextSubmitButton({
  handlePrevious,
  handleNext,
  submitContent,
  scoreContent,
  onSubmit,
  sx = { marginTop: "1rem", justifyContent: "flex-end", paddingRight: "1rem" },
}) {
  const {Color2_1} = useColor();

  return (
    <Grid2 container spacing={3} sx={sx}>
      <BasicButton
        content="Previous"
        onClick={handlePrevious}
        startIcon={<ArrowBackIosNewRoundedIcon />}
        sx={{
          color: "#fff",
          backgroundColor: Color2_1,
          textTransform: "capitalize",
        }}
      />
      <BasicButton
        content="Next"
        onClick={handleNext}
        endIcon={<ArrowForwardIosRoundedIcon />}
        sx={{
          color: "#fff",
          backgroundColor: Color2_1,
          textTransform: "capitalize",
        }}
      />
      <ConfirmAndSubmit
        submitContent={submitContent}
        scoreContent={scoreContent}
        onSubmit={onSubmit}
        sx={{
          color: "#fff",
          backgroundColor: Color2_1,
          textTransform: "capitalize",
        }}
      />
    </Grid2>
  );
}

export default PrevNextSubmitButton;
