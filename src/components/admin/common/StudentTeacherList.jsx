import React from "react";
import { Avatar, Button, Card, Grid, Typography, Stack, Box } from "@mui/material";
import useColor from "shared/color/Color";

const StudentTeacherList = ({
    listData,
    handleClick,
    handleDetailClick,
    page,
    totalPages,
    onPreviousPage,
    onNextPage,
    onFirstPage,
    onLastPage,
}) => {
    const { Color2_1 } = useColor();

    return (
        <Stack
            spacing={2}
            sx={{
                height: "100%", 
                justifyContent: "space-between", 
            }}
        >
            <Box>
                {listData.map((item) => (
                    <Card
                        key={item.id}
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: 2,
                            marginBottom: 1.5,
                            cursor: "pointer",
                        }}
                        onClick={() => handleClick(item)}
                    >
                        <Grid container alignItems="center">
                            <Grid item xs={5} container alignItems="center">
                                <Avatar src={item.avatar} sx={{ marginRight: 2 }} />
                                <Typography variant="h6">{item.name}</Typography>
                            </Grid>

                            <Grid item xs={5} container justifyContent="center" alignItems="center" spacing={2}>
                                <Grid item>
                                    <Typography
                                        variant="body2"
                                        sx={{ minWidth: "120px", textAlign: "center" }}
                                    >
                                        {item.startDate}
                                    </Typography>
                                </Grid>
                                <Grid item>
                                    <Typography
                                        sx={{
                                            background: item.status === "ACTIVE" ? "#00796b" : "red",
                                            color: "white",
                                            padding: "4px 8px",
                                            borderRadius: "4px",
                                            textAlign: "center",
                                            minWidth: "80px",
                                        }}
                                    >
                                        {item.status}
                                    </Typography>
                                </Grid>
                            </Grid>

                            <Grid item xs={2} container justifyContent="flex-end">
                                <Button
                                    variant="outlined"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDetailClick(item);
                                    }}
                                >
                                    Detail
                                </Button>
                            </Grid>
                        </Grid>
                    </Card>
                ))}
            </Box>

            <Box>
                <Stack direction="row" justifyContent="space-between">
                    <Button
                        variant="contained"
                        onClick={onFirstPage}
                        disabled={page === 0}
                        sx={{
                            backgroundColor: Color2_1,
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#48a999",
                            },
                        }}
                    >
                        First Page
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onPreviousPage}
                        disabled={page === 0}
                        sx={{
                            backgroundColor: Color2_1,
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#48a999",
                            },
                        }}
                    >
                        Previous
                    </Button>
                    <Typography>
                        Page {page + 1} of {totalPages}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={onNextPage}
                        disabled={page === totalPages - 1}
                        sx={{
                            backgroundColor: Color2_1,
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#48a999",
                            },
                        }}
                    >
                        Next
                    </Button>
                    <Button
                        variant="contained"
                        onClick={onLastPage}
                        disabled={page === totalPages - 1}
                        sx={{
                            backgroundColor: Color2_1,
                            color: "#fff",
                            "&:hover": {
                                backgroundColor: "#48a999",
                            },
                        }}
                    >
                        Last Page
                    </Button>
                </Stack>
            </Box>
        </Stack>
    );
};

export default StudentTeacherList;
