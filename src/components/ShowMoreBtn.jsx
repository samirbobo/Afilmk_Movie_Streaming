import { Button, useTheme } from "@mui/material";

const ShowMoreBtn = () => {
  const theme = useTheme();

  return (
    <Button
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
