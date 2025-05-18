/* eslint-disable react/prop-types */
import { Stack, Typography, useTheme } from "@mui/material";

const HeaderMediaTypeDetails = ({ Icon, title }) => {
  const theme = useTheme();
  return (
    <Stack
      sx={{
        flexDirection: "row",
        alignItems: "center",
        gap: 0.5,
        mb: 1.25,
      }}
    >
      <Icon sx={{ color: theme.palette.text.secondary }} fontSize="small" />
      <Typography
        variant="h4"
        sx={{
          color: theme.palette.text.secondary,
          fontSize: "16px",
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
};

export default HeaderMediaTypeDetails;
