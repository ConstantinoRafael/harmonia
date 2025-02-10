/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function SearchWorkshopsByEmail() {
  const [email, setEmail] = useState("");
  const [workshops, setWorkshops] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    setLoading(true);
    setError("");
    setWorkshops([]);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/users/users/workshops-by-email?email=${email}`
      );
      if (!response.ok) {
        throw new Error("Erro ao buscar workshops");
      }
      const data = await response.json();
      setWorkshops(data.workshops || []);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h5" gutterBottom>
        Buscar Workshops pelo Email
      </Typography>
      <TextField
        fullWidth
        label="Digite seu email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSearch}
        disabled={loading || !email}
      >
        Buscar
      </Button>
      {loading && <CircularProgress sx={{ mt: 2 }} />}
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
      {workshops.length > 0 && (
        <TableContainer component={Paper} sx={{ mt: 3 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Workshops Inscritos</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workshops.map((workshop, index) => (
                <TableRow key={index}>
                  <TableCell>{workshop}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
}
