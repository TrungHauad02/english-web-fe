import React, { useEffect } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchPanel = ({ 
    searchName, 
    setSearchName, 
    searchStartDate, 
    setSearchStartDate, 
    searchEndDate, 
    setSearchEndDate, 
    handleSearch 
}) => {
    // Effect to ensure end date is greater than start date
    useEffect(() => {
        if (searchStartDate && searchEndDate && new Date(searchStartDate) > new Date(searchEndDate)) {
            setSearchEndDate(searchStartDate); // Reset end date if it's before start date
        }
    }, [searchStartDate, searchEndDate, setSearchEndDate]);

    // Determine if the end date input should be disabled
    const isEndDateDisabled = !searchStartDate || new Date(searchStartDate) >= new Date();

    return (
        <Grid container spacing={2}>
            <Grid item xs={5}>
                <TextField
                    fullWidth
                    label="Search by Name"
                    variant="outlined"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
            </Grid>
            <Grid item xs={3}>
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
                            setSearchEndDate(e.target.value); // Reset end date if it's less than the new start date
                        }
                    }}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSearch();
                        }
                    }}
                />
            </Grid>
            <Grid item xs={3}>
                <TextField
                    fullWidth
                    label="End Date"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={searchEndDate}
                    onChange={(e) => {
                        const selectedEndDate = e.target.value;
                        // Set end date only if it's greater than the start date
                        if (new Date(selectedEndDate) > new Date(searchStartDate)) {
                            setSearchEndDate(selectedEndDate);
                        }
                    }}
                    disabled={isEndDateDisabled} // Disable end date if invalid
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

export default SearchPanel;
