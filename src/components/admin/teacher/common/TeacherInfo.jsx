import React from 'react';
import { Grid, Card, Avatar, TextField, FormControl, InputLabel, Select, MenuItem, Typography, Button } from '@mui/material';
import useColor from "shared/color/Color";

const TeacherInfo = ({ setAvatarFile, selectedTeacher, setSelectedTeacher, isEditing, isNew, levelsForForm, handleImageChange, setConfirmDeleteOpen, handleEditToggle, handleSaveEdit, handleAddTeacher, handleNewToggle, handleClear, handleDeleteTeacher, setReload, setPage }) => {
    const { Color2_1 } = useColor();
    return (
        <Grid item xs={12} md={4}>
            <Card sx={{ height: 450, padding: 2, bgcolor: "#F5F5F5" }}>
                <Grid item xs={12} textAlign="center">
                    <Avatar
                        alt={selectedTeacher?.name || 'Teacher Avatar'}
                        src={selectedTeacher?.avatar || '/header_user.png'}
                        sx={{ width: 100, height: 100, margin: '0 auto' }}
                    />
                </Grid>
                <TextField
                    fullWidth
                    label="Name"
                    margin="normal"
                    value={selectedTeacher.name || ""}
                    onChange={(e) => setSelectedTeacher({ ...selectedTeacher, name: e.target.value })}
                    disabled={!isEditing && !isNew}
                />
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={selectedTeacher.email}
                    onChange={(e) => setSelectedTeacher({ ...selectedTeacher, email: e.target.value })}
                    disabled={!isNew}
                />
                <FormControl fullWidth margin="normal" disabled={!isEditing && !isNew}>
                    <InputLabel>Level</InputLabel>
                    <Select
                        value={selectedTeacher.level || ""}
                        onChange={(e) => setSelectedTeacher({ ...selectedTeacher, level: e.target.value })}
                        disablePortal
                        MenuProps={{
                            PaperProps: {
                                style: {
                                    maxHeight: 200,
                                },
                            },
                            disableScrollLock: true,
                        }}
                    >
                        {levelsForForm.map((level) => (
                            <MenuItem key={level} value={level}>{level}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Typography sx={{ fontWeight: 'bold', pb: 0 }}>
                    Avatar:
                </Typography>
                <input
                    accept="image/*"
                    id="upload-button"
                    type="file"
                    sx={{ marginBottom: 2 }}
                    onChange={(e) => handleImageChange(e, selectedTeacher, setSelectedTeacher, setAvatarFile)}
                    disabled={!isEditing && !isNew}
                />
                <Button component="span" sx={{ pb: 5 }} />

                <Grid container spacing={2}>
                    <Grid item xs={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            color={selectedTeacher.status === "INACTIVE" ? "primary" : "error"}
                            sx={{ bgcolor: selectedTeacher.status === "INACTIVE" ? Color2_1 : '#FF6655' }}
                            onClick={selectedTeacher.status === "INACTIVE" ? handleDeleteTeacher : () => setConfirmDeleteOpen(true)}
                        >
                            {selectedTeacher.status === "INACTIVE" ? "Restore" : "Delete"}
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="warning"
                            sx={{ bgcolor: '#FFD014' }}
                            onClick={isEditing ? handleSaveEdit : handleEditToggle}
                        >
                            {isEditing ? 'Save' : 'Edit'}
                        </Button>
                    </Grid>
                    <Grid item xs={3}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="success"
                            sx={{ bgcolor: Color2_1 }}
                            onClick={isNew ? handleAddTeacher : handleNewToggle}
                        >
                            {isNew ? 'Save' : 'New'}
                        </Button>
                    </Grid>

                    <Grid item xs={3}>
                        <Button variant="outlined" onClick={handleClear} fullWidth>
                            Clear
                        </Button>
                    </Grid>
                </Grid>
            </Card>
        </Grid>
    );
};

export default TeacherInfo;
