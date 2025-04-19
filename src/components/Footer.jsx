import { Container } from "@mui/material";

const Footer = () => {
  return (
    <Container
      component={"footer"}
      sx={{
        px: { xs: "1rem", sm: "3rem", md: "4rem" },
        py: 2,
        maxWidth: "1920px !important",
      }}
    >
      Footer
    </Container>
  );
};

export default Footer;
