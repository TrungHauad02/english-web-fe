import React from 'react';
import { Avatar, Button, Card, Grid, Typography } from '@mui/material';

const StudentTeacherList = ({ listData, handleClick, handleDetailClick, role }) => {
    return (
        <Card sx={{ height: 500, overflow: 'auto', padding: 2, bgcolor: '#F5F5F5' }}>
            {listData.map((item) => (
                <Card
                    key={item.id}
                    sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 2, marginBottom: 2, cursor: 'pointer' }}
                    onClick={() => handleClick(item)}
                >
                    <Grid container alignItems="center">
                        <Avatar src={item.avatar} sx={{ marginRight: 2 }} />
                        <Typography variant="h6">{item.name}</Typography>
                        <Typography variant="body2" sx={{ flex: 3, textAlign: 'right' }}>
                            <span style={{ display: 'inline-block', minWidth: '120px', textAlign: 'right' }}>{item.startDate}</span>
                        </Typography>
                    </Grid>

                    <Grid container alignItems="center" justifyContent="flex-end">
                        <Button variant="contained" color={item.status === 'Active' ? 'success' : 'warning'}>
                            {item.status}
                        </Button>
                        <Button variant="outlined" sx={{ marginLeft: 2 }} onClick={() => handleDetailClick(item)}>
                            Detail
                        </Button>
                    </Grid>
                </Card>
            ))}
        </Card>
    );
};

export default StudentTeacherList;
