import { Box, Typography } from "@mui/material";

const ErrorMessage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        py: 4,
      }}
    >
      <Typography
        variant="h5"
        color="error"
        sx={{
          fontSize: { xs: 18, md: 24 },
          textAlign: "center",
        }}
      >
        Something went wrong. Please try again later.
      </Typography>
    </Box>
  );
};

export default ErrorMessage;
