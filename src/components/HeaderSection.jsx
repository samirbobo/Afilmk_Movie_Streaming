/* eslint-disable react/prop-types */
import { Stack, Typography, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MediaTabs from "./MediaTabs";

const HeaderSection = ({ link, title, selectedTab, handleTabChange }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      pb={1.5}
    >
      <Stack
        onClick={() => navigate(link)}
        sx={{
          flexDirection: "row",
          alignItems: "center",
          gap: {xs: 0, sm: 0.5},
          cursor: "pointer",
          transition: "0.2s linear",
          "&:hover": {
            color: theme.palette.primary.main,
          },
        }}
      >
        <Typography
          variant="h2"
          sx={{
            fontSize: {xs: "18px", sm: "24px"},
            fontWeight: {xs: 700, sm: 900},
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
