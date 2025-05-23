/* eslint-disable react/prop-types */
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useRef } from "react";
import { ThemeProvider, createTheme, useTheme } from "@mui/material/styles";
import parse from "html-react-parser";
import { Avatar, Rating, Stack, Typography } from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";

const ContentReviewDialog = ({ open, scroll, handleClose, review }) => {
  const theme = useTheme();
  const rating = review?.author_details?.rating
    ? Math.min(review.author_details.rating / 2, 5)
    : 0;

  const descriptionElementRef = useRef(null);
  const defaultTheme = createTheme(); // ← theme الافتراضي بتاع MUI

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  return (
    <ThemeProvider theme={defaultTheme}>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
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
            <Stack sx={{ flexDirection: "row", alignItems: "center", gap: 1 }}>
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
                    color: "#fff",
                  }}
                >
                  {review.author}
                </Typography>
                <Typography
                  variant="h5"
                  sx={{
                    fontSize: 16,
                    color: "rgba(255, 255, 255, 0.7)",
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
                background: "#141414",
                border: "1px solid #262626",
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
                    color: theme.palette.secondary.main, // لون النجوم المملوءة
                  },
                  "& .MuiRating-iconEmpty": {
                    color: theme.palette.text.secondary, // لون النجوم الفارغة (اختياري)
                  },
                }}
              />

              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.7)",
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
          sx={{ borderTop: "1px solid rgba(255, 255, 255, 0.12)" }}
        >
          <DialogContentText
            id="scroll-dialog-description"
            ref={descriptionElementRef}
            tabIndex={-1}
            sx={{ color: "rgba(255, 255, 255, 0.7)" }}
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
    </ThemeProvider>
  );
};

export default ContentReviewDialog;
