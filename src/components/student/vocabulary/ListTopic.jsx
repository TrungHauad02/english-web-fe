import { Stack, Typography } from "@mui/material";
import MainPicture from "./MainPicture";
import ReactPaginate from 'react-paginate';
import ListTopicContent from "./ListTopicContent";
import { useState } from "react";
import './ListTopic.css';

function ListTopic() {
    const topicsPerPage = 6;
    const [currentPage, setCurrentPage] = useState(0);

    const listTopic = [
        {title: "Environment1", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
        {title: "Environment2", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
        {title: "Environment3", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
        {title: "Environment4", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
        {title: "Environment5", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
        {title: "Environment6", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
        {title: "Environment7", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
        {title: "Environment8", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"},
        {title: "Environment9", description: "This lesson we will discussion about environment, pollution and global warnming", img: "/environment.png"}
    ];
    const pageCount = Math.ceil(listTopic.length / topicsPerPage);

    const handlePageClick = (event) => {
      setCurrentPage(event.selected);
    };
  
    const displayedTopics = listTopic.slice(currentPage * topicsPerPage, (currentPage + 1) * topicsPerPage);
  
    return (
        <Stack direction="column">
            <MainPicture src="/bg_vocabulary.png" title="Vocabulary"/>
            <Typography variant="h5" component="p" sx={{ padding: '1rem', marginX: '5%', marginY: '1rem' }}>
                Expand your knowledge and enhance your skills through our diverse vocabulary topics. Explore and learn with us!
            </Typography>
            <ListTopicContent listTopic={displayedTopics} />

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