import React, { useState, useEffect } from 'react';
import MainTitle from '../MainTitle';
import ItemTest from './ItemTest';
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { getTest } from "api/test/TestApi";

function TestMixing() {
    const location = useLocation();
    const { state } = location; 
    const [datatest, setdatatest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const title = datatest ? datatest.type : ''; 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getTest(state.id);
                if (data) {
                    setdatatest(data);
                } else {
                    setdatatest(null);
                }
            } catch (err) {
                setError("Failed to fetch test data");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [state.id]); 

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <>
            <MainTitle title="Mixing Test" bg={"/bg_test.png"} />
            <Box sx={{ marginTop: '5%', marginLeft: '5%', marginRight: '5%' }}>
                <ItemTest title={title} datatest={datatest} />
            </Box>
        </>
    );
}

export default TestMixing;
