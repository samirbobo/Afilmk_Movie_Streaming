/* eslint-disable react/prop-types */
import { Button, useTheme } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ShowMoreBtn = ({ link }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Button
      onClick={() => navigate(link)}
      sx={{
        border: "2px solid",
        borderColor: theme.palette.text.secondary,
        fontWeight: 400,
        padding: "5px 10px",
        borderRadius: 2,
        transition: ".3s linear",
        color: theme.palette.text.secondary,
        textTransform: "capitalize",
        ":hover": {
          background: theme.palette.background.paper, // Change background color on hover
          color: theme.palette.text.primary,
          borderColor: theme.palette.background.paper, // Optional: change border color to match
        },
      }}
    >
      show More
    </Button>
  );
};

export default ShowMoreBtn;
