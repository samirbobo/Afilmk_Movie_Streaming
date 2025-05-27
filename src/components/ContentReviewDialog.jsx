/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useRef } from "react";
import { useTheme } from "@mui/material/styles";
import parse from "html-react-parser";
import { Avatar, Rating, Stack, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { AnimatePresence, motion } from "framer-motion";

const ContentReviewDialog = ({ open, scroll, handleClose, review }) => {
  const theme = useTheme();
  const rating = review?.author_details?.rating
    ? Math.min(review.author_details.rating / 2, 5)
    : 0;

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title-review"
          aria-describedby="scroll-dialog-description-review"
          maxWidth="sm"
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
              border:
                theme.palette.mode === "dark"
                  ? "1px solid #404040"
                  : "1px solid #e5e5e5",
            },
          }}
        >
          <DialogTitle id="scroll-dialog-title">
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "10px",
                flexWrap: "wrap",
              }}
            >
              <Stack
                sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}
              >
                <Avatar
                  alt={review.author}
                  src={`https://image.tmdb.org/t/p/original${review?.author_details?.avatar_path}`}
                />
                <Stack
                  sx={{
                    flexDirection: "column",
                    alignItems: "flex-start",
                    gap: 0.5,
                  }}
                >
                  <Typography
                    variant="h4"
                    title={review.author}
                    sx={{
                      fontSize: 18,
                      color: theme.palette.text.primary,
                    }}
                  >
                    {review.author}
                  </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      fontSize: 16,
                      color: theme.palette.text.secondary,
                    }}
                  >
                    {review.updated_at.split("T")[0]}
                  </Typography>
                </Stack>
              </Stack>

              {/* Rating Stars */}
              <Stack
                sx={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 0.5,
                  p: "4px 8px",
                  borderRadius: "50px",
                  background: theme.palette.background.default,
                  border:
                    theme.palette.mode === "dark"
                      ? "1px solid #404040"
                      : "1px solid #e5e5e5",
                }}
              >
                <Rating
                  name="half-rating-read"
                  defaultValue={rating}
                  precision={0.5}
                  readOnly
                  emptyIcon={<StarRoundedIcon fontSize="inherit" />}
                  sx={{
                    "& .MuiRating-iconFilled": {
                      color: "#ffac00", // لون النجوم المملوءة
                    },
                    "& .MuiRating-iconEmpty": {
                      color: theme.palette.text.secondary, // لون النجوم الفارغة (اختياري)
                    },
                  }}
                />

                <Typography
                  variant="body1"
                  sx={{
                    color: theme.palette.text.secondary,
                    fontSize: "14px",
                  }}
                >
                  {rating}
                </Typography>
              </Stack>
            </Stack>
          </DialogTitle>

          <DialogContent
            dividers={scroll === "paper"}
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
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
              sx={{ color: theme.palette.text.secondary }}
            >
              {parse(review?.content)}
            </DialogContentText>
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

export default ContentReviewDialog;
