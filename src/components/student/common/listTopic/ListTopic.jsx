import { Stack, Typography } from "@mui/material";
import MainPicture from "./MainPicture";
import ReactPaginate from 'react-paginate';
import ListContent from "./ListContent";
import { useState } from "react";
import './ListTopic.css';

function ListTopic({list,quote, title, bg}) {
    const topicsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(0);

    const pageCount = Math.ceil(list.length / topicsPerPage);

    const handlePageClick = (event) => {
      setCurrentPage(event.selected);
    };
  
    const displayedList = list.slice(currentPage * topicsPerPage, (currentPage + 1) * topicsPerPage);
  
    return (
        <Stack direction="column">
            <MainPicture src={bg} title={title}/>
            <Typography variant="h5" component="p" sx={{ padding: '1rem', marginX: '5%', marginY: '1rem' }}>
                {quote}
            </Typography>
            <ListContent list={displayedList} />

            <ReactPaginate
                previousLabel={"Previous"}
                nextLabel={"Next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={5}
                onPageChange={handlePageClick}
                containerClassName={"pagination"}
                activeClassName={"active"}
            />
        </Stack>
    );
}

export default ListTopic;