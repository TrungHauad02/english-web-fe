import { Paper } from "@mui/material";
import { styled } from '@mui/material/styles';

const ItemWord = styled(Paper)(({ theme }) => ({
    backgroundColor: '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    borderRadius: '0.25rem'
}));

export default ItemWord;
