/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  Link,
} from "@mui/material";

export default function WorkshopsPage() {
  const router = useRouter();
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchWorkshops() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/workshops/admin`
        );
        if (!response.ok) {
          throw new Error("Erro ao buscar workshops.");
        }
        const data = await response.json();
        setWorkshops(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchWorkshops();
  }, []);

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <Box display="flex" mb={2}>
        <Box flexGrow={1}>
          {loading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">{error}</Typography>
          ) : workshops.length === 0 ? (
            <Typography>Nenhum workshop encontrado.</Typography>
          ) : null}
        </Box>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Professor</TableCell>
              <TableCell>Inscritos</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workshops.map((workshop) => (
              <TableRow
                key={workshop.id}
                hover
                sx={{ cursor: "pointer" }}
                onClick={() => router.push(`/admin/workshops/${workshop.id}`)}
              >
                <TableCell>{workshop.title}</TableCell>
                <TableCell>{workshop.professorName}</TableCell>
                <TableCell>{workshop._count?.registrations ?? 0}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
