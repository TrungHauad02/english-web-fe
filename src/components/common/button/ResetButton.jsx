import { Button } from "@mui/material";

function ResetButton({ onClick, 
                        variant="contained",
                        sx={ margin: '1rem', padding: '0.5rem 1rem',  fontSize: '1rem', borderRadius: '0.25rem',
                            backgroundColor: '#E2F293', color: '#000'
                        } }) {
    return(
        <Button
            onClick={onClick}
            variant={variant}
            sx={sx}
            >
            Reset
        </Button>
    );
}

export default ResetButton;