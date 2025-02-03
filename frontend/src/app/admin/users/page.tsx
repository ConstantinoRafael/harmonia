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
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const initialUsers = [
  { id: 1, name: "João Silva", email: "joao.silva@example.com" },
  { id: 2, name: "Maria Souza", email: "maria.souza@example.com" },
  // Adicione mais usuários conforme necessário
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    id: null,
    name: "",
    email: "",
  });

  const handleClickOpen = (user) => {
    setCurrentUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUser({ id: null, name: "", email: "" });
  };

  const handleSave = () => {
    setUsers((prevUsers) =>
      prevUsers.map((user) => (user.id === currentUser.id ? currentUser : user))
    );
    handleClose();
  };

  const handleDelete = (id) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell align="right">Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleClickOpen(user)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDelete(user.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Editar Usuário</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Nome"
            name="name"
            value={currentUser.name}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Email"
            name="email"
            value={currentUser.email}
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}
