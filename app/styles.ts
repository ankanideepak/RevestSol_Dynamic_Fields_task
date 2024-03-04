import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#2196f3', // Blue background color
    },
    card: {
        backgroundColor: 'white',
        padding: theme.spacing(4),
        width: '400px',
    },
    textField: {
        // marginBottom: theme.spacing(2),
        color: "#f44336",
        fontSize: "0.75rem",
    },
    submitButtonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
    },
}));
