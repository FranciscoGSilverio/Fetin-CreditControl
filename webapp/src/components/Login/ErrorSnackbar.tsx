import { Snackbar, Alert } from "@mui/material";

type ErrorSnackbarProps = {
  open: boolean;
  handleClose: () => void;
};

const ErrorSnackbar = ({ open, handleClose }: ErrorSnackbarProps) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={handleClose}
        severity="error"
        sx={{ width: "100%" }}
        variant="filled"
      >
        Autenticação falhou, tente novamente!
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
