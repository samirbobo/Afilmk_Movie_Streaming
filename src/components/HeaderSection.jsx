/* eslint-disable react/prop-types */
import { Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MediaTabs from "./MediaTabs";

const HeaderSection = ({ link, title, selectedTab, handleTabChange }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const handleClick = (event) => {
    event.preventDefault();
    navigate(link);
  };
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      pb={1.5}
    >
      <Stack
        component={"a"}
        href={link}
        onClick={(event) => handleClick(event)}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: { xs: 0, sm: 0.5 },
          cursor: "pointer",
          transition: "0.2s linear",
          color: theme.palette.text.primary,
          "&:hover": {
            color: theme.palette.custom.favBackLight,
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: { xs: "18px", sm: "24px" },
            fontWeight: { xs: 700, sm: 900 },
            letterSpacing: 0,
            lineHeight: "32px",
          }}
        >
          {title}
        </Typography>
        <KeyboardArrowRightIcon fontSize="large" />
      </Stack>
      <MediaTabs tabIndex={selectedTab} handleChange={handleTabChange} />
    </Stack>
  );
};

export default HeaderSection;
