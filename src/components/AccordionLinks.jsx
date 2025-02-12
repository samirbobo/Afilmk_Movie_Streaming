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

const AccordionLinks = ({ title, links }) => {
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
            <ListItemButton>
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
