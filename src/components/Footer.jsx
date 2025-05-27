import {
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { footerLinks } from "../constants";
import { Link } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import EmailRoundedIcon from "@mui/icons-material/EmailRounded";

const Footer = () => {
  const iconsStyle = {
    background: "#1A1A1A",
    border: "1px solid #262626",
    p: "12px",
    borderRadius: "6px",
    width: 44,
    height: 44,
    color: "#fff",
    transition: "color 0.3s ease",
  };

  return (
    <Container
      component={"footer"}
      sx={{
        px: { xs: "1.25rem", md: "2.5rem", lg: "80px" },
        pt: { xs: "50px", lg: "80px" },
        pb: { xs: "20px", lg: "40px" },
        maxWidth: "1920px !important",
        background: "#0F0F0F",
        mt: "1rem",
      }}
    >
      {/* Links */}
      <Stack
        sx={{
          mb: { xs: "50px", md: "80px" },
          flexDirection: "row",
          alignItems: "start",
          gap: "30px",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        {footerLinks.map((item) => (
          <Box key={item.title}>
            <Typography
              variant="h6"
              color="custom.white"
              mb={{ xs: "16px", md: "20px" }}
              fontSize={{ xs: "16px", md: "18px" }}
            >
              {item.title}
            </Typography>

            {item.links.map((link) => (
              <Link key={link.label} to={link.link}>
                <Typography
                  variant="body1"
                  sx={{
                    mb: { xs: 1, md: 1.25 },
                    fontSize: { xs: "14px", md: "16px" },
                    transition: "color 0.3s ease",
                    color: "#B3B3B3",
                    "&:hover": {
                      color: "custom.white",
                      cursor: "pointer",
                    },
                  }}
                >
                  {link.label}
                </Typography>
              </Link>
            ))}
          </Box>
        ))}

        <Box>
          <Typography
            variant="h6"
            color="custom.white"
            mb={{ xs: "16px", md: "20px" }}
            fontSize={{ xs: "16px", md: "18px" }}
          >
            Connect With Us
          </Typography>
          <Stack flexDirection={"row"} alignItems={"center"} gap={1.25}>
            <a href="mailto:samirelanany555@gmail.com">
              <IconButton
                sx={{
                  ...iconsStyle,
                  "&:hover": { color: "#EA4335" }, // أحمر جيميل
                }}
              >
                <EmailRoundedIcon />
              </IconButton>
            </a>

            <a href="https://www.linkedin.com/in/samir-elanany" target="_blank">
              <IconButton
                sx={{
                  ...iconsStyle,
                  "&:hover": { color: "#0077B5" }, // أزرق لينكدإن
                }}
              >
                <LinkedInIcon />
              </IconButton>
            </a>

            <a href="https://wa.me/201211672995" target="_blank">
              <IconButton
                sx={{
                  ...iconsStyle,
                  "&:hover": { color: "#25D366" }, // أخضر واتساب
                }}
              >
                <WhatsAppIcon />
              </IconButton>
            </a>
          </Stack>
        </Box>
      </Stack>

      <Stack
        sx={{
          borderTop: "1px solid #404040",
          pt: "20px",
          flexDirection: "row",
          gap: "20px",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        <Typography variant="body1" color="#B3B3B3" fontSize={"14px"}>
          Copyright © 2025 Samir Elanany. All rights reserved.
        </Typography>

        <a
          href="https://github.com/samirbobo"
          target="_blank"
          rel="noopener noreferrer"
          style={{ textDecoration: "none" }}
        >
          <Button
            sx={{
              ...iconsStyle,
              width: "auto",
              "&:hover": { background: "#333" },
            }}
            startIcon={<GitHubIcon />}
          >
            GitHub
          </Button>
        </a>
      </Stack>
    </Container>
  );
};

export default Footer;
