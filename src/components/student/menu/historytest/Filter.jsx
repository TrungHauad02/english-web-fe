import React from "react";
import { TextField, Button, MenuItem, Grid, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from '@mui/icons-material';

const Filter = ({ filter, setFilter, searchText, setSearchText, searchStartDate, setSearchStartDate, searchEndDate, setSearchEndDate, handleSearch}) => {
    const isEndDateDisabled = !searchStartDate || new Date(searchStartDate) >= new Date();

    return (
        <Grid container spacing={1} alignItems="center" mb={2}>
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

            <Grid item xs={2}>
                <TextField
                    fullWidth
                    label="Start Date"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={searchStartDate}
                    onChange={(e) => {
                        setSearchStartDate(e.target.value);
                        if (searchEndDate && new Date(e.target.value) > new Date(searchEndDate)) {
                            setSearchEndDate(e.target.value); 
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
            </Grid>
            <Grid item xs={2}>
                <TextField
                    fullWidth
                    label="End Date"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={searchEndDate}
                    onChange={(e) => {
                        const selectedEndDate = e.target.value;
                        if (new Date(selectedEndDate) > new Date(searchStartDate)) {
                            setSearchEndDate(selectedEndDate);
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
            <Grid item xs={1}>
                <Button
                    variant="contained"
                    startIcon={<Search />}
                    onClick={handleSearch}
                    sx={{ marginTop: '.5rem' }}
                >
                    Search
                </Button>
            </Grid>
        </Grid>
    );
};

export default Filter;
