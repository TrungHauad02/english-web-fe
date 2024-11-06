import React from "react";
import { TextField, Button, MenuItem, Grid, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Filter = ({
    filter,
    setFilter,
    searchText,
    setSearchText,
    handleSearch,
}) => {
    return (
        <Grid container spacing={2} alignItems="center" mb={2}>
            <Grid item xs={12} sm={6}>
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

            <Grid item xs={12} sm={5}>
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

            <Grid item xs={12} sm={1}>
                <Button variant="contained" onClick={handleSearch}>
                    Search
                </Button>
            </Grid>
        </Grid>
    );
};

export default Filter;
