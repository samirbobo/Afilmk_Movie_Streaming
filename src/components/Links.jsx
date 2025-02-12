/* eslint-disable react/prop-types */
import { ExpandMore } from "@mui/icons-material";
import { Box, Grid, ListItem, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";

const Links = ({ title, data }) => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        position: "relative",
        cursor: "pointer",
        ":hover .box-links": { display: "block" },
      }}
    >
      <Typography variant="body1">{title}</Typography>
      <ExpandMore sx={{ fontSize: "16px", ml: 1 }} />

      {/* هنا البوكس الي فيه كل الينكات */}
      <Box
        className="box-links"
        sx={{
          minWidth: "550px",
          position: "absolute",
          top: "100%",
          left: {sm: "75%", md: "50%"},
          transform: "translateX(-50%)",
          display: "none",
          zIndex: 999,
        }}
      >
        <Paper sx={{ mt: 2 }}>
          <Grid container>
            {data.map((link) => (
              <Grid item xs={3} key={link.id}>
                <ListItem disablePadding>
                  <ListItemButton sx={{ display: "flex", py: 1, px: 1.5 }}>
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
      </Box>
    </Box>
  );
};

export default Links
