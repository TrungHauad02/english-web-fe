import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  styled,
} from "@mui/material";
import useColor from "../../../shared/color/Color";
import { useNavigate } from "react-router-dom";

const type = {
  mixing: "MIXING",
  skills: {
    reading: "READING",
    listening: "LISTENING",
    speaking: "SPEAKING",
    writing: "WRITING",
  },
};

const ListTestContainer = styled(Box)(({ theme }) => ({
  marginTop: theme.spacing(8),
  paddingLeft: theme.spacing(2),
}));

const TestCard = styled(Card)(({ theme }) => {
  const colors = useColor();
  return {
    backgroundColor: colors.Color1,
    marginBottom: theme.spacing(4),
    position: "relative",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    borderRadius: "10px",
  };
});

function ListTestContent({ list }) {
  const colors = useColor();
  const navigate = useNavigate();

  const handleClick = (dataTest) => {
    let newPath = "";

    switch (dataTest.type) {
      case type.mixing:
        newPath = "/student/test/mixing";
        break;
      case type.skills.reading:
        newPath = "/student/test/reading";
        break;
      case type.skills.listening:
        newPath = "/student/test/listening";
        break;
      case type.skills.speaking:
        newPath = "/student/test/speaking";
        break;
      case type.skills.writing:
        newPath = "/student/test/writing";
        break;
      default:
        break;
    }
    navigate(newPath, { state: dataTest });
  };

  const handleNavigateHistoryTest = (test) => {
    navigate("/student/history-test", {
      state: { title: test.title, type: test.type },
    });
  };

  return (
    <>
      <ListTestContainer
        sx={{
          backgroundColor: "#e0e0e0",
          padding: "2rem",
          borderRadius: "1rem",
        }}
      >
        <Grid container spacing={4}>
          {list.map((test, index) => (
            <Grid item xs={12} sm={4} key={index}>
              <TestCard sx={{ backgroundColor: "#fff" }}>
                <CardContent>
                  <Typography variant="h5" component="h4">
                    {test.title}
                  </Typography>
                  <Typography sx={{ marginTop: "0.5rem" }}>
                    <strong>Duration:</strong> {test.duration} minutes
                  </Typography>
                  <Typography sx={{ marginTop: "0.5rem" }}>
                    <strong>Number of Questions:</strong>{" "}
                    {test.numberOfQuestions}
                  </Typography>
                  <Typography sx={{ marginTop: "0.5rem" }}>
                    <strong>Score:</strong>{" "}
                    {test.scoreLastOfTest === -1
                      ? "Haven’t done yet"
                      : test.scoreLastOfTest}
                  </Typography>
                </CardContent>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button
                    sx={{
                      marginLeft: "0.5rem",
                      padding: "0.5rem 1rem",
                      color: "#000000",
                      borderColor: "#000000",
                      textDecoration: "underline",
                      borderRadius: "99rem",
                      ":hover": {
                        bgcolor: colors.Color1,
                      },
                    }}
                    onClick={() => handleNavigateHistoryTest(test)}
                  >
                    See History
                  </Button>
                  <Button
                    variant="contained"
                    sx={{
                      padding: "0.5rem 1rem",
                      backgroundColor: colors.Color2,
                      color: "#ffffff",
                      marginBottom: "1rem",
                      marginRight: "1.5rem",
                      borderRadius: "2rem",
                      transition: "1s",
                      ":hover": {
                        paddingX: "2rem",
                        marginRight: "1rem",
                      },
                    }}
                    onClick={() => handleClick(test)}
                  >
                    Do test
                  </Button>
                </div>
              </TestCard>
            </Grid>
          ))}
        </Grid>
      </ListTestContainer>
    </>
  );
}

export default ListTestContent;
