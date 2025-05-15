import PropTypes from "prop-types";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";

function ScrollTop(props) {
  const { children, windowPop } = props;

  // بتعرفك علي المستخدم عمل اسكرول في الصفحه ولا لا
  const trigger = useScrollTrigger({
    target: windowPop ? window() : undefined,
    disableHysteresis: true, // بتمنح تاخير عشان الانيمشين في الظهور والاختفائي
    threshold: 100, // لما المستخدم يعمل اسكرول اكتر من ميت بكسل يظهر العنصر
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: "fixed", bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.propTypes = {
  children: PropTypes.element,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  windowPop: PropTypes.func,
};

export default ScrollTop;
