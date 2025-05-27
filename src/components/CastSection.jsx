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
  useTheme,
} from "@mui/material";
import RenderPersonImage from "./RenderPersonImage";
import { AnimatePresence, motion } from "framer-motion";

const CastSection = ({ showModal, selectedPerson, handleClose, loading }) => {
  const theme = useTheme();

  return (
    <AnimatePresence>
      {showModal && (
        <Dialog
          open={showModal}
          onClose={handleClose}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
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
              color: "#fff", // لون الخط داخل الدايلوج
              backgroundImage: "none",
              borderRadius: "0.5rem",
              maxWidth: 550,
              width: "90vw",
              border:
                theme.palette.mode === "dark"
                  ? "1px solid #404040"
                  : "1px solid #e5e5e5",
            },
          }}
        >
          <DialogTitle>
            <RenderPersonImage
              loading={loading}
              selectedPerson={selectedPerson}
            />
          </DialogTitle>

          <DialogContent
            dividers
            sx={{
              borderTop:
                theme.palette.mode === "dark"
                  ? "1px solid #404040"
                  : "1px solid #e5e5e5",
              borderBottom:
                theme.palette.mode === "dark"
                  ? "1px solid #404040"
                  : "1px solid #e5e5e5",
            }}
          >
            {loading ? (
              <Skeleton animation="wave" height={32} />
            ) : (
              selectedPerson?.name && (
                <Typography
                  variant="h5"
                  sx={{ color: theme.palette.text.primary }}
                >
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
                  sx={{ color: theme.palette.text.secondary, mt: 1 }}
                >
                  <strong>Birthday:</strong> {selectedPerson?.birthday}
                </Typography>
              )
            )}
            {selectedPerson?.deathday && (
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary, mt: 1 }}
              >
                <strong>Deathday:</strong> {selectedPerson?.deathday}
              </Typography>
            )}
            {selectedPerson?.place_of_birth && (
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary, mt: 1 }}
              >
                <strong>Place of Birth:</strong>{" "}
                {selectedPerson?.place_of_birth}
              </Typography>
            )}
            {selectedPerson?.known_for_department && (
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary, mt: 1 }}
              >
                <strong>Department:</strong>{" "}
                {selectedPerson?.known_for_department}
              </Typography>
            )}
            {selectedPerson?.homepage && (
              <Typography
                variant="body2"
                sx={{ color: theme.palette.text.secondary, mt: 1 }}
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
                sx={{ color: theme.palette.text.secondary, mt: 1 }}
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
      )}
    </AnimatePresence>
  );
};

export default CastSection;
