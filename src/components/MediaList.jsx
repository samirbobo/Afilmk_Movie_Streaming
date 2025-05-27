/* eslint-disable react/prop-types */
import { Grid, Typography, useTheme } from "@mui/material";
import MediaCard from "./MediaCard";

const MediaList = ({ data, genresType, section, from }) => {
  const theme = useTheme();
  return (
    <Grid container spacing={1} rowGap={1}>
      {data.length < 1 ? (
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              py: 4,
              color: theme.palette.text.primary,
              fontWeight: "medium",
            }}
          >
            No data available to display at the moment.
          </Typography>
        </Grid>
      ) : (
        data.map((item, index) => (
          <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
            <MediaCard
              item={item}
              genresType={genresType}
              section={section}
              from={from}
              index={index}
            />
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default MediaList;
