import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import Stack from "@mui/material/Stack";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export default function CustomPagination({ page, count, onChange }) {
  return (
    <Stack spacing={2}>
      <Pagination
        shape="rounded"
        count={count}
        page={page}
        onChange={onChange}
        sx={{
          "& .MuiPaginationItem-page.Mui-selected": {
            backgroundColor: "#4A475C",
            color: "#fff",
          },
        }}
        renderItem={(item) => (
          <PaginationItem
            slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
            {...item}
          />
        )}
      />
    </Stack>
  );
}
