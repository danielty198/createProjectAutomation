

const mainJsContent = `
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import App from "./App";
import theme from "./theme";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
);`

const appJsContent = `
import React from "react";
import { Routes, Route } from "react-router-dom";
import { Container, Box } from "@mui/material";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Home = () => <Typography variant="h4">Home Page</Typography>;
const About = () => <Typography variant="h4">About Page</Typography>;

const App = () => {
  return (
    <Box display="flex" flexDirection="column" minHeight="100vh">
      <Navbar />
      <Container sx={{ my: 4, flexGrow: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Container>
      <Footer />
    </Box>
  );
};

export default App;
`


const themeJsContent = `import { createTheme } from '@mui/material/styles';
import { deepmerge } from '@mui/utils';

// Base colors
const palette = {
  light: {
    mode: 'light',
    primary: { main: '#4f46e5', contrastText: '#fff' },
    secondary: { main: '#f43f5e', contrastText: '#fff' },
    background: { default: '#f9fafb', paper: '#fff' },
    text: { primary: '#111827', secondary: '#6b7280' },
  },
  dark: {
    mode: 'dark',
    primary: { main: '#818cf8', contrastText: '#111827' },
    secondary: { main: '#fb7185', contrastText: '#fff' },
    background: { default: '#111827', paper: '#1f2937' },
    text: { primary: '#f9fafb', secondary: '#d1d5db' },
  },
};

// Utility function to scale typography
const createTypography = (scale = 1) => ({
  fontFamily: "'Inter', 'Roboto', sans-serif",
  h1: { fontSize: \`\${ 3 * scale}rem\`, fontWeight: 700 },
  h2: { fontSize: \`\${ 2.5 * scale } rem\`, fontWeight: 700 },
  h3: { fontSize: \`\${ 2 * scale } rem\`, fontWeight: 700 },
  h4: { fontSize: \`\${ 1.75 * scale } rem\`, fontWeight: 600 },
  h5: { fontSize: \`\${ 1.5 * scale } rem\`, fontWeight: 600 },
  h6: { fontSize: \`\${ 1.25 * scale } rem\`, fontWeight: 600 },
  body1: { fontSize: \`\${ 1 * scale } rem\`, lineHeight: 1.6 },
  body2: { fontSize: \`\${ 0.875 * scale } rem\`, lineHeight: 1.5 },
  button: { textTransform: 'uppercase', fontWeight: 600 },
});

// Base shadows
const shadows = Array(25).fill('none');
shadows[1] = '0px 1px 3px rgba(0,0,0,0.12), 0px 1px 2px rgba(0,0,0,0.24)';
shadows[2] = '0px 3px 6px rgba(0,0,0,0.16), 0px 3px 6px rgba(0,0,0,0.23)';

// Component defaults
const components = {
  MuiButton: {
    styleOverrides: {
      root: { borderRadius: 12, padding: '10px 20px', transition: 'all 0.3s' },
    },
  },
  MuiCard: {
    styleOverrides: {
      root: {
        borderRadius: 16,
        boxShadow: shadows[1],
        transition: 'all 0.3s',
        '&:hover': { boxShadow: shadows[2], transform: 'translateY(-2px)' },
      },
    },
  },
};

// Function to generate theme
export const getTheme = ({ mode = 'light', scale = 1 } = {}) => {
  const baseTheme = createTheme({
    palette: palette[mode],
    typography: createTypography(scale),
    shadows,
    components,
    spacing: 8,
    shape: { borderRadius: 12 },
    breakpoints: { values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 } },
  });

  return baseTheme;
};

// Example usage:
// import { getTheme } from './theme';
// const theme = getTheme({ mode: 'dark', scale: 1.1 });

export default getTheme;
`

const navbarJsContent = `
import React from "react";
import { AppBar, Toolbar, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MyApp
        </Typography>
        <Button color="inherit" component={Link} to="/">Home</Button>
        <Button color="inherit" component={Link} to="/about">About</Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
`

const footerJsContent = `
import React from "react";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box component="footer" sx={{ py: 3, textAlign: "center", mt: "auto", bgcolor: "background.paper" }}>
      <Typography variant="body2" color="textSecondary">
        &copy; {new Date().getFullYear()} MyApp. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer; 

`

const getPages = (basePath) => {

    const pages = [
        { name: "main.jsx", content: mainJsContent, path: `${basePath}/src/main.jsx` },
        { name: "App.js", content: appJsContent, path: `${basePath}/src/App.js` },
        { name: "theme.js", content: themeJsContent, path: `${basePath}/src/theme.js` },
        { name: "Navbar.jsx", content: navbarJsContent, path: `${basePath}/src/components/Navbar.jsx` },
        { name: "Footer.jsx", content: footerJsContent, path: `${basePath}/src/components/Footer.jsx` },
    ]
    return pages
}




module.exports = {
    getPages
}