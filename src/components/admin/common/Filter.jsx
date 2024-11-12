import React, { useEffect } from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchPanel = ({  searchName,  setSearchName,   searchStartDate,   setSearchStartDate,   searchEndDate,   setSearchEndDate,   handleSearch }) => {
    useEffect(() => {
        if (searchStartDate && searchEndDate && new Date(searchStartDate) > new Date(searchEndDate)) {
            setSearchEndDate(searchStartDate);
        }
    }, [searchStartDate, searchEndDate, setSearchEndDate]);

    const isEndDateDisabled = !searchStartDate || new Date(searchStartDate) >= new Date();

    return (
        <Grid container spacing={1}>
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

export default SearchPanel;
