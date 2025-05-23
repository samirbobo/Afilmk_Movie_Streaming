/* eslint-disable react/prop-types */
import { ExpandMore } from "@mui/icons-material";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Links = ({ title, scrollTrigger, data }) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    const basePath = title === "Movies" ? "movies" : "tv-shows";
    const linkName = link.name || "All"; // لو اللينك مش موجود بخليه يروح علي الصفحه العامه افضل
    const path =
      linkName === "All"
        ? `/${basePath}`
        : `/${basePath}/${linkName.toLowerCase()}`;
    navigate(path);
  };

  return (
    <Box
      component={"li"}
      sx={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
        ":hover .box-links": { display: "block" },
      }}
    >
      <Typography
        variant="body1"
        sx={{ color: scrollTrigger ? "#fff" : theme.palette.text.primary }}
      >
        {title}
      </Typography>
      <ExpandMore
        sx={{
          fontSize: "16px",
          ml: 1,
          color: scrollTrigger ? "#fff" : theme.palette.text.primary,
        }}
      />

      {/* هنا البوكس الي فيه كل الينكات */}
      <List
        className="box-links"
        sx={{
          minWidth: "500px",
          position: "absolute",
          top: "100%",
          left: { sm: "75%", md: "50%" },
          transform: "translateX(-50%)",
          display: "none",
          zIndex: 999,
        }}
      >
        <Paper sx={{ mt: 2, borderRadius: "0.5rem" }}>
          <Grid container>
            {data.map((link) => (
              <Grid item xs={4} key={link.id}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      display: "flex",
                      py: "6px",
                      px: 1.5,
                      textAlign: "center",
                    }}
                    onClick={() => handleNavigation(link)}
                  >
                    <ListItemText
                      sx={{
                        "& .MuiTypography-root": {
                          fontSize: "15px",
                          fontWeight: 300,
                        },
                      }}
                      primary={link.name}
                    />
                  </ListItemButton>
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </Paper>
      </List>
    </Box>
  );
};

export default Links;
