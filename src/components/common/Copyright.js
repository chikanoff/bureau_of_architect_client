import React from "react";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = (props) => (
  <Typography variant="body2" color="text.secondary" align="center" {...props}>
    {'© ОАО "Институт Гомельгражданпроект". Все права защищены. '}
    {new Date().getFullYear()}
    {"."}{" "}
    <Link color="inherit" href="http://iggp.by/">
      Наш сайт
    </Link>
  </Typography>
);

export default Copyright;
