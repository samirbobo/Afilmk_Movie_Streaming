import { Container } from "@mui/material";

const Footer = () => {
  return (
    <Container
      component={"footer"}
      sx={{
        px: { xs: "1rem", sm: "3rem", md: "4rem" },
        py: 2,
        maxWidth: "1920px !important",
      }}
    >
      Footer
    </Container>
  );
};

export default Footer;

/* 
  محتوي السيكشن
const footerLinks = [
  {
    title: "Explore",
    links: [
      { label: "Home Page", href: "/" },
      { label: "Movies List", href: "/movies" },
      { label: "TV Shows", href: "/tv-shows" },
      { label: "Latest Additions", href: "/LatestAdditions" },
    ],
  },

  {
    title: "Categories",
    links: [
      { label: "Top Rated", href: "/top-rated" },
      { label: "Trending Now", href: "/trending" },
      { label: "Upcoming", href: "/upcoming" },
      { label: "Popular Shows", href: "/popular" },
    ],
  },

  {
    title: "Connect With Us",
    links: [
      { label: "github", href: "/github" },
      { label: "Linkedin", href: "/Linkedin" },
      { label: "WhatsApp", href: "/WhatsApp" },
    ],
  },

  {
    title: "Movies Genres",
    links: [
      { label: "Action", href: "/action" },
      { label: "Animation", href: "/animation" },
      { label: "Horror", href: "/horror" },
      { label: "Comedy", href: "/comedy" },
    ],
  },
  {
    title: "Tv Show Genres",
    links: [
      { label: "Action", href: "/action" },
      { label: "Animation", href: "/animation" },
      { label: "Horror", href: "/horror" },
      { label: "Comedy", href: "/comedy" },
    ],
  },
];

*/
