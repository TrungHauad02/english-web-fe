import { Stack, Typography, Card, CardActionArea, CardContent, Grid, } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import PeopleIcon from "@mui/icons-material/People";
import SchoolIcon from "@mui/icons-material/School";

const adminLinks = [
    {
        path: "/admin/teacher",
        label: "Quản lý giáo viên",
        icon: <PeopleIcon />,
    },
    {
        path: "/admin/student",
        label: "Quản lý học sinh",
        icon: <SchoolIcon />,
    },
];

export default function AdminManagement() {
    return (
        <Stack
            sx={{
                bgcolor: "#f1f1f1",
                padding: "2rem",
                margin: "2rem auto",
                width: "90%",
            }}
            spacing={3}
        >
            <Typography
                variant="h4"
                sx={{ fontWeight: "bold", textAlign: "center", color: "#333" }}
            >
                Quản lý Admin
            </Typography>
            <Typography variant="body1" sx={{ textAlign: "center", color: "#666" }}>
                Chào mừng bạn đến với trình quản lý Admin. Chọn mục bên dưới để bắt đầu.
            </Typography>

            <Grid container spacing={2} justifyContent="center">
                {adminLinks.map((link) => (
                    <Grid item xs={12} sm={6} md={4} key={link.path}>
                        <Card
                            sx={{
                                height: 150,
                                boxShadow: 3,
                                borderRadius: "1rem",
                                transition: "transform 0.3s",
                                "&:hover": { transform: "scale(1.05)" },
                            }}
                        >
                            <CardActionArea
                                component={RouterLink}
                                to={link.path}
                                sx={{ height: "100%" }}
                            >
                                <CardContent
                                    sx={{
                                        textAlign: "center",
                                        display: "flex",
                                        flexDirection: "column",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        height: "100%",
                                    }}
                                >
                                    {link.icon}
                                    <Typography
                                        variant="h6"
                                        sx={{ color: "#000", fontWeight: "medium", mt: 1 }}
                                    >
                                        {link.label}
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Stack>
    );
}
