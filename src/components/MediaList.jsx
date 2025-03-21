/* eslint-disable react/prop-types */
import { Grid } from "@mui/material";
import MediaCard from "./MediaCard";
const MediaList = ({ data, genresType, section }) => {
  return (
    <Grid container spacing={1}>
      {data.map((item, index) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
          <MediaCard item={item} genresType={genresType} section={section} />
        </Grid>
      ))}
    </Grid>
  );
};

export default MediaList;
