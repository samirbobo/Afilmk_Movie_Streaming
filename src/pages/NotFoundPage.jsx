import { Box, Button, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <>
      <Toolbar />
      <Box
        component={"section"}
        sx={{
          display: "grid",
          placeContent: "center",
          pt: 10,
          pb: 6,
          gap: 2,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h2"
          color="custom.white"
          sx={{
            fontSize: "clamp(1rem, 5vw, 1.5rem)",
            px: 2,
            fontWeight: 600,
            color: "text.primary",
          }}
        >
          Sorry, the page you were looking for was not found.
        </Typography>

        <Link to="/">
          <Button
            sx={{
              background: "#523c7f",
              textTransform: "capitalize",
              color: "#fff",
              transition: "0.2s linear",
              "&:hover": {
                background: "#673bc0",
              },
            }}
          >
            Return To Home
          </Button>
        </Link>
      </Box>
    </>
  );
};

export default NotFoundPage;
