import { Button, Divider, Grid2, Stack, Typography } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import MicIcon from "@mui/icons-material/Mic";
import useSpeakingInConversation from "./useSpeakingInConversation";
import useColor from "shared/color/Color";
import CollapsibleSection from "shared/collapsible/CollapsibleSection";
import Comment from "../writing/Comment";
import React from "react";

export default function SpeakingInConversation() {
  const {
    listConversation,
    person,
    listPeople,
    recordingStatus,
    recordedAudio,
    isScoring,
    results,
    permission,
    handleChange,
    handleStart,
    handleStop,
    handleReset,
    handleSubmit,
    getMicrophonePermission,
  } = useSpeakingInConversation();
  const color = useColor();

  return (
    <Grid2 container direction={"column"} spacing={4}>
      <Grid2 container direction={"row"} spacing={6} alignItems={"center"}>
        <Typography variant="h6">Choose the person you wanna be: </Typography>
        <FormControl>
          <RadioGroup
            aria-labelledby="demo-controlled-radio-buttons-group"
            name="controlled-radio-buttons-group"
            value={person}
            onChange={handleChange}
            sx={{ flexDirection: "row" }}
          >
            {listPeople.map((person) => (
              <FormControlLabel
                key={person}
                value={person}
                control={<Radio />}
                label={person}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Grid2>
      <Grid2 container direction={"column"} spacing={4}>
        {!permission ? (
          <Button
            onClick={getMicrophonePermission}
            variant="contained"
            sx={{ textTransform: "none" }}
          >
            Get Microphone
          </Button>
        ) : null}

        {!permission && (
          <Grid2 item xs={12} sx={{ width: "100%" }}>
            <Typography
              variant="body1"
              textAlign={"center"}
              fontWeight={"bold"}
              color="red"
            >
              To complete this activity, you must allow access to your system's
              microphone. Click the accept button above to start.
            </Typography>
          </Grid2>
        )}
        {permission &&
          listConversation.map((conver, index) => (
            <Stack key={conver.id}>
              {conver.name === person && (
                <Stack key={conver.id} spacing={2}>
                  <Stack
                    container
                    direction={"row"}
                    sx={{ width: "100%" }}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Stack
                      direction={"row"}
                      justifyContent={"flex-start"}
                      alignItems={"center"}
                      spacing={4}
                    >
                      <Typography variant="h6">You :</Typography>
                      <Typography variant="body1" textAlign={"left"}>
                        {conver.content}
                      </Typography>
                    </Stack>
                    <Stack sx={{ marginRight: "1rem" }}>
                      <Button
                        sx={{ color: "#000" }}
                        onClick={
                          recordingStatus[index] === "inactive"
                            ? () => handleStart(index)
                            : () => handleStop(index)
                        }
                      >
                        <MicIcon />
                      </Button>
                    </Stack>
                  </Stack>
                  <Stack direction={"row"} spacing={4} sx={{ width: "100%" }}>
                    {recordedAudio[index] && (
                      <Stack
                        container
                        direction={"row"}
                        alignItems={"center"}
                        spacing={4}
                        sx={{ width: "100%" }}
                      >
                        <audio controls src={`${recordedAudio[index]}`} />
                        <Button
                          variant="outlined"
                          color="error"
                          onClick={() => handleReset(index)}
                        >
                          Reset
                        </Button>
                      </Stack>
                    )}
                  </Stack>
                </Stack>
              )}

              {conver.name !== person && (
                <Stack direction={"row"} spacing={4} alignItems={"center"}>
                  <Stack>
                    <Typography variant="h6">{conver.name} :</Typography>
                  </Stack>
                  <Stack sx={{ width: "80%" }}>
                    <audio
                      controls
                      src={conver.audioUrl}
                      style={{ width: "80%" }}
                    />
                  </Stack>
                </Stack>
              )}
            </Stack>
          ))}
      </Grid2>
      <Stack justifyContent={"center"} alignItems={"flex-end"}>
        <Button
          sx={{
            color: "#fff",
            bgcolor: color.Color2_1,
            textTransform: "capitalize",
            padding: "0.5rem 1rem",
          }}
          onClick={handleSubmit}
          disabled={isScoring}
        >
          Submit
        </Button>
      </Stack>
      {isScoring && (
        <Grid2
          item
          xs={12}
          sx={{ bgcolor: "rgba(0, 0, 0, 0.05)", borderRadius: "0.5rem" }}
        >
          <CollapsibleSection buttonText="Scoring..."></CollapsibleSection>
        </Grid2>
      )}
      {results && results.length > 0 && (
        <Grid2
          item
          xs={12}
          sx={{ bgcolor: "rgba(0, 0, 0, 0.05)", borderRadius: "0.5rem" }}
        >
          <CollapsibleSection buttonText="Score">
            {results.map((result, index) => (
              <Stack
                sx={{
                  margin: "0.5rem 0rem",
                  bgcolor: color.Color2_1,
                  borderRadius: "0.5rem",
                }}
                key={index}
              >
                <Comment content={result.realText} />
                <Comment content={"Recognized text: " + result.transcript} />
                <Comment content={"Score: " + result.score} />
                <Divider />
              </Stack>
            ))}
          </CollapsibleSection>
        </Grid2>
      )}
    </Grid2>
  );
}
