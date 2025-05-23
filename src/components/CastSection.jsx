/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import parse from "html-react-parser";
import {
  DialogActions,
  DialogTitle,
  Skeleton,
  Typography,
} from "@mui/material";
import RenderPersonImage from "./RenderPersonImage";

const CastSection = ({ showModal, selectedPerson, handleClose, loading }) => {
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
          width: "90vw",
        },
      }}
    >
      <DialogTitle>
        <RenderPersonImage loading={loading} selectedPerson={selectedPerson} />
      </DialogTitle>

      <DialogContent dividers>
        {loading ? (
          <Skeleton animation="wave" height={32} />
        ) : (
          selectedPerson?.name && (
            <Typography variant="h5" sx={{ color: "#fff" }}>
              {selectedPerson?.name}
            </Typography>
          )
        )}
        {loading ? (
          <Skeleton animation="wave" height={20} mt={1} width="60%" />
        ) : (
          selectedPerson?.birthday && (
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.7)", mt: 1 }}
            >
              <strong>Birthday:</strong> {selectedPerson?.birthday}
            </Typography>
          )
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
