/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import parse from "html-react-parser";
import {
  CardMedia,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";

const CastSection = ({ showModal, selectedPerson, handleClose }) => {
  return (
    <Dialog
      open={showModal}
      onClose={handleClose}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
      BackdropProps={{
        sx: {
          backgroundColor: "rgba(0, 0, 0, 0.6)", // لون الخلفية لما يتفتح
        },
      }}
      PaperProps={{
        sx: {
          backgroundColor: "#393939", // الخلفية الداخلية للدايلوج
          color: "#fff", // لون الخط داخل الدايلوج
          backgroundImage: "none",
          maxWidth: 550,
        },
      }}
    >
      {selectedPerson?.profile_path && (
        <DialogTitle>
          <CardMedia
            sx={{
              height: 250,
              width: "100%",
              maxWidth: 400,
              margin: "0 auto",
              objectFit: "cover",
              borderRadius: "0.25rem",
            }}
            image={`https://image.tmdb.org/t/p/w300${selectedPerson?.profile_path}`}
            title={selectedPerson?.name}
            alt={selectedPerson?.name}
          />
        </DialogTitle>
      )}
      <DialogContent dividers>
        {selectedPerson?.name && (
          <Typography variant="h5" sx={{ color: "#fff" }}>
            {selectedPerson?.name}
          </Typography>
        )}
        {selectedPerson?.birthday && (
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)", mt: 1 }}
          >
            <strong>Birthday:</strong> {selectedPerson?.birthday}
          </Typography>
        )}
        {selectedPerson?.deathday && (
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)", mt: 1 }}
          >
            <strong>Deathday:</strong> {selectedPerson?.deathday}
          </Typography>
        )}
        {selectedPerson?.place_of_birth && (
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)", mt: 1 }}
          >
            <strong>Place of Birth:</strong> {selectedPerson?.place_of_birth}
          </Typography>
        )}
        {selectedPerson?.known_for_department && (
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)", mt: 1 }}
          >
            <strong>Department:</strong> {selectedPerson?.known_for_department}
          </Typography>
        )}
        {selectedPerson?.homepage && (
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)", mt: 1 }}
          >
            <strong>homepage:</strong>
            <a
              href={selectedPerson?.homepage}
              target="_blank"
              style={{
                textDecoration: "underline",
                color: "#2d74ff",
                marginLeft: "0.3rem",
              }}
            >
              {selectedPerson?.homepage}
            </a>
          </Typography>
        )}
        {selectedPerson?.biography && (
          <Typography
            variant="body2"
            sx={{ color: "rgba(255, 255, 255, 0.7)", mt: 1 }}
          >
            {parse(selectedPerson.biography)}
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          color="info"
          onClick={handleClose}
          sx={{ p: "4px 10px" }}
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CastSection;
