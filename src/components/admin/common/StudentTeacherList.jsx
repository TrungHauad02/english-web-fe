import React from 'react';
import { Avatar, Button, Card, Grid, Typography } from '@mui/material';

const StudentTeacherList = ({ listData, handleClick, handleDetailClick, lastTeacherElementRef }) => {
    return (
        <Card sx={{ height: 450, overflow: 'auto', padding: 2, bgcolor: '#F5F5F5' }}>
            {listData.map((item, index) => (
                <Card
                    key={item.id}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, marginBottom: 2, cursor: 'pointer' }}
                    onClick={() => handleClick(item)}
                    ref={listData.length === index + 1 ? lastTeacherElementRef : null}
                >
                    <Grid container alignItems="center">
                        <Grid item xs={3} container alignItems="center">
                            <Avatar src={item.avatar} sx={{ marginRight: 2 }} />
                            <Typography variant="h6">{item.name}</Typography>
                        </Grid>

                        <Grid item xs={5} container justifyContent="center" alignItems="center" spacing={2}>
                            <Grid item>
                                <Typography variant="body2" sx={{ minWidth: '120px', textAlign: 'center' }}>
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

                        <Grid item xs={3} container justifyContent="flex-end">
                            <Button variant="outlined" onClick={(e) => { e.stopPropagation(); handleDetailClick(item); }}>
                                Detail
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            ))}
        </Card>
    );
};

export default StudentTeacherList;
