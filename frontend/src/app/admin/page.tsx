"use client";

import AdminLayout from "./layout";
import { Typography } from "@mui/material";

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Typography variant="h4">Bem-vindo ao Painel Administrativo</Typography>
      <Typography variant="body1">
        Aqui você pode gerenciar usuários e visualizar dados.
      </Typography>
    </AdminLayout>
  );
}
