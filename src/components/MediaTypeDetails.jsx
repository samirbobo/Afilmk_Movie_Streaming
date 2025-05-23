/* eslint-disable react/prop-types */
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import TranslateIcon from "@mui/icons-material/Translate";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import GridViewIcon from "@mui/icons-material/GridView";
import RecentActorsIcon from "@mui/icons-material/RecentActors";
import MusicNoteOutlinedIcon from "@mui/icons-material/MusicNoteOutlined";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import HeaderMediaTypeDetails from "./HeaderMediaTypeDetails";
import { useState } from "react";
import { API_KEY, BASE_URL } from "../baseUrl";
import CastSection from "./CastSection";
import axios from "axios";
import personImg from "../images/person.png";

const MediaTypeDetails = ({ data }) => {
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const theme = useTheme();
  const crew = data?.credits?.crew || [];
  const director = crew.find((c) => c.job === "Director");
  const composer = crew.find((c) => c.job === "Original Music Composer");
  const people = [director, composer].filter(Boolean);

  const handleOpenModal = async (id) => {
    setLoading(true);
    setShowModal(true);
    const response = await axios.get(
      `${BASE_URL}/person/${id}?api_key=${API_KEY}&language=en-US`
    );

    const data = await response.data;
    setSelectedPerson(data);
    setLoading(false);
  };

  const handleClose = () => {
    setShowModal(false);
    setSelectedPerson(null);
  };

  const typographyStyle = {
    color: theme.palette.text.primary,
    p: "6px 12px",
    borderRadius: "50px",
    background: "#141414",
    border: "1px solid #262626",
    width: "fit-content",
    fontSize: 14,
  };

  return (
    <Box
      component={"aside"}
      sx={{
        width: { xs: "100%", md: "calc(35% - 10px)" },
        position: { md: "sticky" },
        top: { md: 40 },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: { xs: "20px", md: "24px" },
        background: "#1A1A1A",
        p: { xs: "24px", md: "40px" },
        borderRadius: "10px",
        border: "1px solid #262626",
      }}
    >
      {/* Year */}
      {(data?.release_date || data?.first_air_date) && (
        <Box width={"100%"}>
          <HeaderMediaTypeDetails
            Icon={CalendarTodayOutlinedIcon}
            title="Released Year"
          />
          <Typography variant="body1" sx={typographyStyle}>
            {data?.release_date || data?.first_air_date}
          </Typography>
        </Box>
      )}

      {/* Languages */}
      {(data?.spoken_languages.length > 0 || data?.original_language) && (
        <Box width={"100%"}>
          <HeaderMediaTypeDetails
            Icon={TranslateIcon}
            title="Available Languages"
          />
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            gap={1.25}
            flexWrap={"wrap"}
          >
            {data?.spoken_languages.length > 0 ? (
              data?.spoken_languages.map((language) => (
                <Typography
                  key={language.english_name}
                  variant="body1"
                  sx={{ ...typographyStyle, borderRadius: "6px" }}
                >
                  {language.english_name}
                </Typography>
              ))
            ) : (
              <Typography
                variant="body1"
                sx={{ ...typographyStyle, borderRadius: "6px" }}
              >
                {data.original_language}
              </Typography>
            )}
          </Stack>
        </Box>
      )}

      {/* Rating */}
      <Box width={"100%"}>
        <HeaderMediaTypeDetails Icon={StarOutlineRoundedIcon} title="Ratings" />
        <Typography variant="body1" sx={typographyStyle}>
          {data?.vote_average.toFixed(1)}
        </Typography>
      </Box>

      {/* Genres */}
      {data?.genres.length > 0 && (
        <Box width={"100%"}>
          <HeaderMediaTypeDetails Icon={GridViewIcon} title="Genres" />
          <Stack
            flexDirection={"row"}
            alignItems={"center"}
            gap={1}
            flexWrap={"wrap"}
          >
            {data?.genres.map((genre) => (
              <Typography
                key={genre.name}
                variant="body1"
                sx={{ ...typographyStyle, borderRadius: "6px" }}
              >
                {genre.name}
              </Typography>
            ))}
          </Stack>
        </Box>
      )}

      {/* Director and Composer Music */}
      {people.map((person, index) => {
        return (
          <Box key={index} width={"100%"}>
            <HeaderMediaTypeDetails
              Icon={
                person?.job === "Director"
                  ? RecentActorsIcon
                  : MusicNoteOutlinedIcon
              }
              title={person?.job === "Director" ? "Director" : "Music"}
            />
            <Stack
              flexDirection={"row"}
              alignItems={"center"}
              flexWrap={"wrap"}
              sx={{
                p: { xs: "10px", md: "12px" },
                borderRadius: "8px",
                background: "#141414",
                border: "1px solid #262626",
                cursor: "pointer",
                gap: { xs: 1, md: 2 },
              }}
              onClick={() => handleOpenModal(person?.id)}
            >
              <img
                loading="lazy"
                src={
                  person?.profile_path
                    ? `https://image.tmdb.org/t/p/w500${person?.profile_path}`
                    : personImg
                }
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = personImg; // صورة بديلة عند فشل التحميل
                }}
                alt={`${person?.name || "Director Name"}`}
                style={{
                  borderRadius: "6px",
                  width: "50px",
                  height: "50px",
                  objectFit: "cover",
                }}
              />
              <Typography
                variant="body1"
                sx={{
                  color: theme.palette.text.primary,
                  fontSize: "16px",
                  flex: 1,
                }}
              >
                {person?.name}
              </Typography>
            </Stack>
          </Box>
        );
      })}

      <CastSection
        showModal={showModal}
        selectedPerson={selectedPerson}
        handleClose={handleClose}
        loading={loading}
      />
    </Box>
  );
};

export default MediaTypeDetails;
