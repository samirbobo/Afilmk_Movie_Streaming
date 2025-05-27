/* eslint-disable react/prop-types */
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player/youtube";
import { AnimatePresence, motion } from "framer-motion";

const TrailerDialog = ({ trailerKey, open, onClose }) => {
  const theme = useTheme();

  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={onClose}
          maxWidth="lg"
          fullWidth
          PaperComponent={motion.div}
          PaperProps={{
            initial: { opacity: 0, scale: 0.9, y: -100 },
            animate: { opacity: 1, scale: 1, y: 0 },
            exit: {
              opacity: 0,
              scale: 0.9,
              y: -100,
            },
            transition: {
              duration: 0.3,
              ease: "easeInOut",
            },
            sx: {
              background: theme.palette.background.paper,
              border:
                theme.palette.mode === "dark"
                  ? "1px solid #404040"
                  : "1px solid #e5e5e5",
              borderRadius: "0.5rem",
            },
          }}
        >
          <DialogTitle
            sx={{
              display: "flex",
              justifyContent: "space-between",
              borderBottom:
                theme.palette.mode === "dark"
                  ? "1px solid rgb(133 122 122)"
                  : "1px solid #e5e5e5",
            }}
          >
            Watch Trailer
            <IconButton onClick={onClose}>
              <CloseIcon sx={{ color: "text.primary" }} />
            </IconButton>
          </DialogTitle>

          <DialogContent
            sx={{ height: 500, p: "1.25rem", pt: "1.25rem !important" }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${trailerKey}`}
              controls
              playing
              width="100%"
              height="100%"
            />
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};
export default TrailerDialog;
