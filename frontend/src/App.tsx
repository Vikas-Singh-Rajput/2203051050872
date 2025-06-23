import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import axios from "axios";

const App = () => {
  const [url, setUrl] = useState("");
  const [validity, setValidity] = useState("");
  const [shortcode, setShortcode] = useState("");
  const [result, setResult] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/shorturls", {
        url,
        validity: validity ? parseInt(validity) : undefined,
        shortcode: shortcode || undefined,
      });
      setResult(response.data.shortLink);
    } catch (error) {
      console.error("Error creating short URL:", error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>URL Shortener</Typography>
      <TextField fullWidth label="Original URL" value={url} onChange={(e) => setUrl(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Validity (minutes)" value={validity} onChange={(e) => setValidity(e.target.value)} sx={{ mb: 2 }} />
      <TextField fullWidth label="Custom Shortcode" value={shortcode} onChange={(e) => setShortcode(e.target.value)} sx={{ mb: 2 }} />
      <Button variant="contained" onClick={handleSubmit}>Shorten</Button>
      {result && (
        <Box mt={3}>
          <Typography variant="h6">Shortened URL:</Typography>
          <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
        </Box>
      )}
    </Container>
  );
};

export default App;
