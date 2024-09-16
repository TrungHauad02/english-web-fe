import { Button } from "@mui/material";

function SubmitButton({ onClick, 
                        variant="contained",
                        sx={ margin: '1rem', padding: '0.5rem 1rem',  fontSize: '1rem', borderRadius: '0.25rem',
                            backgroundColor: '#ACCD0A', color: '#000'
                        } }) {
    return(
        <Button
            onClick={onClick}
            variant={variant}
            sx={sx}
            >
            Submit
        </Button>
    );
}

export default SubmitButton;