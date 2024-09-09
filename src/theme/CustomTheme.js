import { createTheme } from '@mui/material/styles';

const CustomTheme = createTheme({
    palette: {
        header: {
            main: '#ffffff',
            contrastText: '#fff'
        },
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',
        fontSize: 14,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none'
                },
            },
        },
    }
});

export default CustomTheme;