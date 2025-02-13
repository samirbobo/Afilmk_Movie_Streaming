import { Box, Typography } from "@mui/material";
import heroImage from "../images/hero-image.jpg";

const Home = () => {
  return (
    <>
      <Box
        sx={{
          position: "relative",
          background: `url(${heroImage}) center no-repeat`,
          backgroundSize: "cover",
          height: "100vh",
          width: "100%",
          zIndex: 1,
        }}
      >
        {/*Overlay  */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.7)",
            zIndex: 2,
          }}
        />

        {/* Content */}
        <Box
          sx={{
            position: "relative",
            zIndex: 3,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xl: "4rem", lg: "3.5rem", xs: "2.5rem" },
              fontWeight: { xl: 900, xs: 700 },
              lineHeight: "125%",
              maxWidth: {
                xl: "40rem",
                lg: "35rem",
                md: "27rem",
                xs: "25rem",
              },
              transition: "0.3s linear",
            }}
          >
            Unlimited movies, TV shows, and more
          </Typography>
          {/* <Button variant="contained" color="error">
          Get Started
          <ArrowDownwardOutlined />
        </Button> */}
        </Box>
      </Box>
    </>
  );
};

export default Home;
