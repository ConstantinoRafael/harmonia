/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";

export default function WorkshopDetailPage() {
  const router = useRouter();
  const params = useParams();
  const workshopId = params.id as string;
  const [workshop, setWorkshop] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!workshopId) return;

    async function fetchWorkshop() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/workshops/${workshopId}`
        );
        if (!response.ok) throw new Error("Erro ao buscar workshop.");

        const data = await response.json();
        setWorkshop(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchWorkshop();
  }, [workshopId]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">{error}</Typography>;
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {workshop.title}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        Professor: {workshop.professorName}
      </Typography>
      <Typography variant="body1" paragraph>
        {workshop.description}
      </Typography>
      <Typography variant="body2">
        📅 Data: {new Date(workshop.date).toLocaleString()}
      </Typography>
      <Typography variant="body2">
        ⏳ Duração: {workshop.duration} minutos
      </Typography>
      <Typography variant="body2">🏠 Local: {workshop.address}</Typography>
      <Typography variant="body2">
        📌 Vagas disponíveis:{" "}
        {workshop.capacity - (workshop.registrations?.length || 0)}
      </Typography>

      <Box mt={3}>
        <Typography variant="h5" gutterBottom>
          Inscritos ({workshop.registrations.length})
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Telefone</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {workshop.registrations.map((participant: any, index: number) => (
                <TableRow key={index}>
                  <TableCell>{participant.name}</TableCell>
                  <TableCell>{participant.email}</TableCell>
                  <TableCell>{participant.phone}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Paper>
  );
}
