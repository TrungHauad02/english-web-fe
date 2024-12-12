import { Box, Typography, Button} from "@mui/material";
export function IntroduceTestListening({ setIsStart, test }) {
    return (
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
            width: "100%",
            textAlign: "center",
            border: "0.2rem solid",
            padding: "20px",
            borderRadius: "2rem",
            backgroundColor: "#f9f9f9",
            margin: "5%",
          }}
        >
          <Typography variant="h4" gutterBottom>
            {test.title}
          </Typography>
          <Typography variant="body1" gutterBottom>
            Duration: {test.duration} minutes
          </Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#00796B",
              "&:hover": { backgroundColor: "#00796B" },
            }}
            onClick={() => setIsStart(true)}
          >
            Start {test.question}
          </Button>
        </Box>
      </Box>
    );
  }
  