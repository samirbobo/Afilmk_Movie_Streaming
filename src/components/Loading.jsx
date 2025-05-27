import { Grid, Skeleton, useMediaQuery, useTheme } from "@mui/material";

const Loading = () => {
  const theme = useTheme();
  const isLgUp = useMediaQuery(theme.breakpoints.up("lg")); // >= lg
  const isMdUp = useMediaQuery(theme.breakpoints.up("md")); // >= md
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm")); // >= md

  let count;
  if (isLgUp) count = 6;
  else if (isMdUp) count = 4;
  else if (isSmUp) count = 3;
  else count = 2;

  const data = Array.from({ length: count });

  return (
    <Grid container spacing={1} rowGap={1}>
      {data.map((_, index) => (
        <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              borderRadius: 2,
              height: { xs: 200, md: 231, xl: 300 },
              aspectRatio: "2 / 3",
              width: "100%",
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Loading;
