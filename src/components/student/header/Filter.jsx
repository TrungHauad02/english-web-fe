import React, { useEffect } from "react";
import { TextField, Button, MenuItem, Grid, IconButton } from "@mui/material";
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

    useEffect(() => {
        if (startDate && endDate && new Date(startDate) > new Date(endDate)) {
            setEndDate(startDate);
        }
    }, [startDate, endDate, setEndDate]);

    const isEndDateDisabled = !startDate || new Date(startDate) >= new Date();

    return (
        <Grid container spacing={2} alignItems="center" mb={2}>
            <Grid item xs={12} sm={4}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Enter your search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    InputProps={{
                        endAdornment: (
                            <IconButton onClick={handleSearch}>
                                <SearchIcon />
                            </IconButton>
                        ),
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={3}>
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
                <TextField
                    fullWidth
                    label="Start Date"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e.target.value);
                        if (endDate && new Date(e.target.value) > new Date(endDate)) {
                            setEndDate(e.target.value); 
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={2}>
                <TextField
                    fullWidth
                    label="End Date"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={endDate}
                    onChange={(e) => {
                        const selectedEndDate = e.target.value;
                        if (new Date(selectedEndDate) > new Date(startDate)) {
                            setEndDate(selectedEndDate);
                        }
                    }}
                    disabled={isEndDateDisabled}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
            </Grid>

            <Grid item xs={12} sm={1}>
                <Button variant="contained" onClick={handleSearch}>
                    Search
                </Button>
            </Grid>
        </Grid>
    );
};

export default Filter;
