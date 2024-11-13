import { Grid2, Typography } from "@mui/material";
import SoundViewer from "shared/component/soundViewer/SoundViewer";

export default function PeopleInConversation({ voices }) {
  return (
    <Grid2
      container
      direction={"column"}
      spacing={2}
      sx={{
        width: "100%",
      }}
    >
      <Grid2
        container
        direction={"row"}
        justifyContent={"space-between"}
        sx={{
          position: "sticky",
          top: 0,
          backgroundColor: "#fff",
          padding: "1rem 1rem",
          zIndex: 3,
          boxShadow: "0 0 0.5rem 0.1rem #00000030",
        }}
      >
        <Grid2 item>
          <Typography variant="h6">Voices available to choose</Typography>
        </Grid2>
      </Grid2>

      <Grid2
        container
        direction={"column"}
        spacing={2}
        sx={{ padding: "0.5rem", marginBottom: "1rem" }}
      >
        {voices.map((voice) => (
          <Grid2
            key={voice.id}
            container
            direction={"column"}
            spacing={1}
            sx={{
              padding: "1rem",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              borderRadius: "8px",
              backgroundColor: "#fff",
            }}
          >
            <Grid2 item>
              <Typography variant="h6">{voice.name}</Typography>
            </Grid2>

            <Grid2 container direction={"row"} spacing={4}>
              <Grid2 item>
                <Typography variant="body1">Accent: {voice.accent}</Typography>
              </Grid2>

              <Grid2 item>
                <Typography variant="body1">Age: {voice.age}</Typography>
              </Grid2>

              <Grid2 item>
                <Typography variant="body1">Gender: {voice.gender}</Typography>
              </Grid2>
            </Grid2>

            <Grid2 item>
              <Typography variant="body2" color="textSecondary">
                Sample:
              </Typography>
              {/* Hiển thị mẫu âm thanh */}
              <SoundViewer audioSrc={voice.sample} />
            </Grid2>
          </Grid2>
        ))}
      </Grid2>
    </Grid2>
  );
}
