/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Tooltip,
  Box,
  CircularProgress,
  Typography,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentWorkshop, setCurrentWorkshop] = useState({
    id: 0,
    title: "",
    description: "",
  });

  // 🔹 Carregar Workshops do Backend ao carregar a página
  useEffect(() => {
    async function fetchWorkshops() {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/workshops/public`
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

  // 🔹 Abrir modal para Adicionar/Editar
  const handleClickOpen = (
    workshop = { id: 0, title: "", description: "" }
  ) => {
    setIsEditing(!!workshop.id);
    setCurrentWorkshop(workshop);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentWorkshop({ id: 0, title: "", description: "" });
  };

  // 🔹 Criar ou Atualizar Workshop
  const handleSave = async () => {
    const method = isEditing ? "PUT" : "POST";
    const url = isEditing
      ? `${process.env.NEXT_PUBLIC_API_URL}/workshops/${currentWorkshop.id}`
      : `${process.env.NEXT_PUBLIC_API_URL}/workshops`;

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentWorkshop),
      });

      if (!response.ok) {
        throw new Error("Erro ao salvar workshop.");
      }

      const updatedWorkshop = await response.json();

      setWorkshops((prevWorkshops) =>
        isEditing
          ? prevWorkshops.map((workshop) =>
              workshop.id === updatedWorkshop.id ? updatedWorkshop : workshop
            )
          : [...prevWorkshops, updatedWorkshop]
      );

      handleClose();
    } catch (error: any) {
      setError(error.message);
    }
  };

  // 🔹 Excluir Workshop
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/workshops/${id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Erro ao excluir workshop.");
      }

      setWorkshops((prevWorkshops) =>
        prevWorkshops.filter((workshop) => workshop.id !== id)
      );
    } catch (error: any) {
      setError(error.message);
    }
  };

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setCurrentWorkshop((prevWorkshop) => ({ ...prevWorkshop, [name]: value }));
  };

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
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleClickOpen()}
        >
          Adicionar Workshop
        </Button>
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Título</TableCell>
              <TableCell>Descrição</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {workshops.map((workshop) => (
              <TableRow key={workshop.id}>
                <TableCell>{workshop.title}</TableCell>
                <TableCell>{workshop.description}</TableCell>
                <TableCell align="right">
                  <Tooltip title="Editar">
                    <IconButton
                      color="primary"
                      onClick={() => handleClickOpen(workshop)}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Excluir">
                    <IconButton
                      color="secondary"
                      onClick={() => handleDelete(workshop.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {isEditing ? "Editar Workshop" : "Adicionar Workshop"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Título"
            name="title"
            value={currentWorkshop.title}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Descrição"
            name="description"
            value={currentWorkshop.description}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            {isEditing ? "Salvar" : "Adicionar"}
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
