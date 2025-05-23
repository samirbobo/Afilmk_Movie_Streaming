/* eslint-disable react/prop-types */
import { CardMedia, Skeleton } from "@mui/material";
import personImg from "../images/person.png";

const RenderPersonImage = ({ loading, selectedPerson }) => {
  if (loading) {
    return (
      <Skeleton
        sx={{
          height: 250,
          width: "100%",
          maxWidth: 400,
          margin: "0 auto",
        }}
        animation="wave"
        variant="rectangular"
      />
    );
  }

  if (selectedPerson?.profile_path) {
    return (
      <CardMedia
        sx={{
          height: 250,
          width: "100%",
          maxWidth: 400,
          margin: "0 auto",
          objectFit: "cover",
          borderRadius: "0.25rem",
        }}
        image={`https://image.tmdb.org/t/p/original${selectedPerson.profile_path}`}
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = personImg; // صورة بديلة عند فشل التحميل
        }}
        title={selectedPerson.name}
        alt={selectedPerson.name}
        loading="lazy"
      />
    );
  }

  return null;
};

export default RenderPersonImage;
