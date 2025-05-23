/* eslint-disable react/prop-types */
import { Dialog, DialogTitle, DialogContent, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ReactPlayer from "react-player/youtube";

const TrailerDialog = ({ trailerKey, open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
      <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
        Watch Trailer
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent sx={{ height: 500 }}>
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${trailerKey}`}
          controls
          playing
          width="100%"
          height="100%"
        />
      </DialogContent>
    </Dialog>
  );
};
export default TrailerDialog;
