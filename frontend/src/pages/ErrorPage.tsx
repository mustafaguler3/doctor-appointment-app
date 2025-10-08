import { Box, Button, Typography, Container, Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { useEffect, useState } from "react";

interface ErrorPageProps {
  title?: string;
  message?: string;
  isError?: boolean; // true => General Error, false => No Results
}

const ErrorPage: React.FC<ErrorPageProps> = ({
  title = "No Results Found",
  message = "We couldn’t find any doctors matching your search.",
  isError = false,
}) => {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Fade in={visible} timeout={800}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          justifyContent: "center",
          minHeight: "85vh",
          py: 8,
        }}
      >
        <Box
          sx={{
            mb: 3,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 100,
            height: 100,
            borderRadius: "50%",
            backgroundColor: isError ? "error.light" : "grey.100",
          }}
        >
          {isError ? (
            <ErrorOutlineIcon sx={{ fontSize: 55, color: "error.main" }} />
          ) : (
            <SearchOffIcon sx={{ fontSize: 55, color: "text.secondary" }} />
          )}
        </Box>

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          {title}
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          {message}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate("/")}
          sx={{
            borderRadius: "30px",
            textTransform: "none",
            fontSize: "1rem",
            px: 4,
            py: 1.5,
            backgroundColor: "#1976d2",
            "&:hover": {
              backgroundColor: "#1565c0",
              boxShadow: "0px 4px 15px rgba(21, 101, 192, 0.4)",
              transform: "translateY(-2px)",
              transition: "all 0.3s ease",
            },
          }}
        >
          Back to Home
        </Button>
      </Container>
    </Fade>
  );
};

export default ErrorPage;