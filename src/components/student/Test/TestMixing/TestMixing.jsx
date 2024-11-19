import React, { useState, useEffect } from 'react';
import MainTitle from '../MainTitle';
import ItemTest from './ItemTest';
import SubmitTestMixing from './SubmitTestMixing/SubmitTestMixing'
import { Box } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { getTest } from "api/test/TestApi";

function TestMixing() {
    const location = useLocation();
    const { state } = location; 
    const [datatest, setdatatest] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState("Testing");
    const [submitTest, setSubmitTest] = useState(null);
    const [version,setVersion] = useState(0);


    const onClickTestAgain = () => {
        setVersion(version+1);
        setStatus("Testing");
      };
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
               {
                status ==="Testing" && 
                <ItemTest key= {version} title={title} datatest={datatest} setStatus={setStatus} setSubmitTest={setSubmitTest}  />
               }
                  {
                status ==="Submit" && 
                <SubmitTestMixing key= {version}  title={title} datatest={datatest} onClickTestAgain={onClickTestAgain} submitTest={submitTest}/>
               }
            </Box>
        </>
    );
}

export default TestMixing;
