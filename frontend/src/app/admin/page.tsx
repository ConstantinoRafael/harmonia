"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AdminLayout from "./layout";
import { Typography, CircularProgress, Box } from "@mui/material";

export default function Admin() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login"); // 🔹 Redireciona se não tiver token
    } else {
      setIsAuthenticated(true);
    }

    setLoading(false);
  }, [router]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!isAuthenticated) {
    return null; // 🔹 Evita piscar conteúdo antes do redirecionamento
  }

  return (
    <AdminLayout>
      <Typography variant="h4">Bem-vindo ao Painel Administrativo</Typography>
      <Typography variant="body1">
        Aqui você pode gerenciar usuários e visualizar dados.
      </Typography>
    </AdminLayout>
  );
}
