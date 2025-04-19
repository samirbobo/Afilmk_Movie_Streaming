/* eslint-disable react/prop-types */
import { Box, Typography } from "@mui/material";

const HeaderMediaType = ({ title, subTitle }) => {
  return (
    <Box>
      <Typography variant="h1">{title}</Typography>
      <Typography variant="h2">{subTitle}</Typography>
    </Box>
  );
};

export default HeaderMediaType;
