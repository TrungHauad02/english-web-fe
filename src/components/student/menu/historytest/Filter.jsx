import React from "react";
import { TextField, Button, MenuItem, Grid, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { Search } from '@mui/icons-material';
import { format } from 'date-fns';
const Filter = ({ filter, setFilter, searchText, setSearchText, searchStartDate, setSearchStartDate, searchEndDate, setSearchEndDate, handleSearch}) => {
    const isEndDateDisabled = !searchStartDate || new Date(searchStartDate) >= new Date();
    const formatStartOfDay = (date) => {
        if (!date) return "";
        const newDate = new Date(date);
        newDate.setHours(0, 0, 0, 0);
        return `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')} ${String(newDate.getHours()).padStart(2, '0')}:${String(newDate.getMinutes()).padStart(2, '0')}:${String(newDate.getSeconds()).padStart(2, '0')}`;
    };
    const formatDateForInput = (date) => {
        if (!date) return "";
        return format(new Date(date), 'yyyy-MM-dd'); // Định dạng phù hợp cho type="date"
    };


    const formatEndOfDay = (date) => {
        if (!date) return "";
        const newDate = new Date(date);
        newDate.setHours(23, 59, 59, 999);
        return `${newDate.getFullYear()}-${String(newDate.getMonth() + 1).padStart(2, '0')}-${String(newDate.getDate()).padStart(2, '0')} ${String(newDate.getHours()).padStart(2, '0')}:${String(newDate.getMinutes()).padStart(2, '0')}:${String(newDate.getSeconds()).padStart(2, '0')}`;
    };

    

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
                    <MenuItem value="ALL">All</MenuItem>
                    <MenuItem value="MIXING">Mixing</MenuItem>
                    <MenuItem value="LISTENING">Listening</MenuItem>
                    <MenuItem value="SPEAKING">Speaking</MenuItem>
                    <MenuItem value="READING">Reading</MenuItem>
                    <MenuItem value="WRITING">Writing</MenuItem>
                </TextField>
            </Grid>

            <Grid item xs={2}>
                <TextField
                    fullWidth
                    label="Start Date"
                    variant="outlined"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    value={(formatDateForInput(searchStartDate))}
                    onChange={(e) => {
                        const formattedStartDate = formatStartOfDay(e.target.value);
                        setSearchStartDate(formattedStartDate);
                        if (searchEndDate && new Date(formattedStartDate) > new Date(searchEndDate)) {
                            setSearchEndDate(formattedStartDate);
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
                    value={(formatDateForInput(searchEndDate))}
                    onChange={(e) => {
                        const formattedEndDate = formatEndOfDay(e.target.value);
                        if (new Date(formattedEndDate) >= new Date(searchStartDate)) {
                            setSearchEndDate(formattedEndDate);
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
