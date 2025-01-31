"use client";

import AdminLayout from "../layout";
import { Typography } from "@mui/material";

export default function UsersPage() {
  return (
    <AdminLayout>
      <Typography variant="h4">Gerenciamento de Usuários</Typography>
      <Typography variant="body1">
        Lista de usuários será carregada aqui.
      </Typography>
    </AdminLayout>
  );
}
