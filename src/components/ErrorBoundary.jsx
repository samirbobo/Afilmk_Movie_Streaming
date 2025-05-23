import { Box, Container, Toolbar, Typography, useTheme } from "@mui/material";
import { isRouteErrorResponse, useRouteError } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";

const ErrorBoundary = () => {
  const theme = useTheme();
  let errorMessage = "Something went wrong";
  let error = useRouteError();

  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      errorMessage = "This page doesn't exist!";
    }

    if (error.status === 401) {
      errorMessage = "You aren't authorized to see this";
    }

    if (error.status === 503) {
      errorMessage = "Looks like our API is down";
    }

    if (error.status === 418) {
      errorMessage = "🫖";
    }
  }

  return (
    <>
      <Navbar />
      <main>
        <Toolbar />
        <Container
          sx={{
            px: { xs: "1rem", sm: "3rem", md: "4rem" },
            py: 2,
            maxWidth: "1920px !important",
          }}
        >
          <Box
            sx={{
              minHeight: "50vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Typography
              variant="h1"
              sx={{
                fontSize: "clamp(1.75rem, 5vw, 4rem)",
                color: theme.palette.text.primary,
              }}
            >
              {errorMessage}
            </Typography>
          </Box>
        </Container>
      </main>
      <Footer />
    </>
  );
};

export default ErrorBoundary;
