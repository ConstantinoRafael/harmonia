"use client";

import React, { useState } from "react";
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
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";

const initialWorkshops = [
  { id: 1, title: "Workshop 1", description: "Descrição do Workshop 1" },
  { id: 2, title: "Workshop 2", description: "Descrição do Workshop 2" },
  // Adicione mais workshops conforme necessário
];

export default function WorkshopsPage() {
  const [workshops, setWorkshops] = useState(initialWorkshops);
  const [open, setOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentWorkshop, setCurrentWorkshop] = useState({
    id: 0,
    title: "",
    description: "",
  });

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

  const handleSave = () => {
    if (isEditing) {
      setWorkshops((prevWorkshops) =>
        prevWorkshops.map((workshop) =>
          workshop.id === currentWorkshop.id ? currentWorkshop : workshop
        )
      );
    } else {
      setWorkshops((prevWorkshops) => [
        ...prevWorkshops,
        { ...currentWorkshop, id: prevWorkshops.length + 1 },
      ]);
    }
    handleClose();
  };

  const handleDelete = (id) => {
    setWorkshops((prevWorkshops) =>
      prevWorkshops.filter((workshop) => workshop.id !== id)
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentWorkshop((prevWorkshop) => ({ ...prevWorkshop, [name]: value }));
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden", p: 2 }}>
      <Box display="flex" mb={2}>
        <Box flexGrow={1}>
          {/* Espaço reservado para outros elementos, se necessário */}
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
