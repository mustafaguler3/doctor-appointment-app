import React, { useEffect, useState } from "react";
import { Container, Typography, Button, Box, Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import { motion } from "framer-motion";

interface NoResultsPageProps {
  message?: string;
}

const NoResultsPage: React.FC<NoResultsPageProps> = ({
  message = "We couldn’t find any doctors matching your search criteria.",
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
          minHeight: "80vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          py: 8,
        }}
      >
        <Box
          sx={{
            width: 100,
            height: 100,
            mb: 3,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "50%",
            bgcolor: "primary.light",
          }}
        >
          <SearchOffIcon sx={{ fontSize: 55, color: "primary.main" }} />
        </Box>

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          No Doctors Found
        </Typography>

        <Typography variant="body1" color="text.secondary" mb={4}>
          {message}
        </Typography>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate("/")}
            sx={{
              borderRadius: "30px",
              px: 6,
              py: 1.5,
              textTransform: "none",
              fontSize: "1rem",
              bgcolor: "primary.main",
              "&:hover": {
                bgcolor: "primary.dark",
                boxShadow: "0px 6px 18px rgba(25, 118, 210, 0.4)",
              },
            }}
          >
            🔍 Back to Search
          </Button>
        </motion.div>
      </Container>
    </Fade>
  );
};

export default NoResultsPage;