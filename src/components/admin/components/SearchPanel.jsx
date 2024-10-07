import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { Search } from '@mui/icons-material';

const SearchPanel = ({ searchName, setSearchName, searchStartDate, setSearchStartDate, handleSearch }) => {
    return (
        <Grid container spacing={2}>
            <Grid item xs={6}>
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
            <Grid item xs={5}>
                <TextField
                    fullWidth
                    label="Search by Start Date"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={searchStartDate}
                    onChange={(e) => setSearchStartDate(e.target.value)}
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
                    sx={{ marginLeft: '1rem', marginTop: '.5rem' }}
                >
                    Search
                </Button>
            </Grid>
        </Grid>
    );
};

export default SearchPanel;
