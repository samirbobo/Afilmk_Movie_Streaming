/* eslint-disable react/prop-types */
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionSummary,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const AccordionLinks = ({ title, links, toggleDrawer }) => {
  const navigate = useNavigate();

  const handleNavigation = (link) => {
    const basePath = title === "Movies" ? "movies" : "tv-shows";
    const linkName = link.name || "All"; // لو اللينك مش موجود بخليه يروح علي الصفحه العامه افضل
    const path =
      linkName === "All"
        ? `/${basePath}`
        : `/${basePath}/${linkName.toLowerCase()}`;
    navigate(path);
    console.log("Calling toggleDrawer(false)");
    toggleDrawer(false);
  };

  return (
    <Accordion
      elevation={0} // نسبه الشادو الي معمول
      sx={{ background: "initial" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <Typography variant="h6">{title}</Typography>
      </AccordionSummary>
      <List sx={{ py: 0 }}>
        {links.map((link) => (
          <ListItem key={link.id} sx={{ py: 0, px: 1, my: -1 }}>
            <ListItemButton onClick={() => handleNavigation(link)}>
              <ListItemText
                primary={link.name}
                sx={{
                  ".MuiTypography-root.MuiTypography-body1": {
                    fontSize: 14,
                    lineHeight: "16px",
                    fontWeight: 500,
                  },
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Accordion>
  );
};

export default AccordionLinks;
