// src/components/Filter.jsx
import React from "react";
import { TextField, Button, MenuItem, Grid, IconButton } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import SearchIcon from "@mui/icons-material/Search";

const Filter = ({
    filter,
    setFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchText,
    setSearchText,
    handleSearch,
}) => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Grid container spacing={2} alignItems="center" mb={2}>
                <Grid item xs={12} sm={4}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Enter your search"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                        InputProps={{
                            endAdornment: (
                                <IconButton onClick={handleSearch}>
                                    <SearchIcon />
                                </IconButton>
                            ),
                        }}
                    />
                </Grid>

                <Grid item xs={12} sm={3} disableScrollLock>
                    <TextField
                        select
                        fullWidth
                        variant="outlined"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <MenuItem value="All">All</MenuItem>
                        <MenuItem value="Vocabulary">Vocabulary</MenuItem>
                        <MenuItem value="Grammar">Grammar</MenuItem>
                        <MenuItem value="Listening">Listening</MenuItem>
                        <MenuItem value="Speaking">Speaking</MenuItem>
                        <MenuItem value="Reading">Reading</MenuItem>
                        <MenuItem value="Writing">Writing</MenuItem>
                    </TextField>
                </Grid>

                <Grid item xs={12} sm={2}>
                    <DatePicker
                        label="Start Date"
                        value={startDate}
                        onChange={(newDate) => {
                            setStartDate(newDate);
                            if (endDate && newDate > endDate) setEndDate(null);
                        }}
                        renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                        maxDate={endDate || null}
                    />
                </Grid>

                <Grid item xs={12} sm={2}>
                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={setEndDate}
                        renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
                        minDate={startDate || null}
                    />
                </Grid>

                <Grid item xs={12} sm={1}>
                    <Button variant="contained" onClick={handleSearch}>
                        Search
                    </Button>
                </Grid>
            </Grid>
        </LocalizationProvider>
    );
};

export default Filter;
