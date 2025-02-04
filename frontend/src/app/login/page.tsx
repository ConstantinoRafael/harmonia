/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import Logo from "../../../public/assets/miniatura-harmonia-light.png";

const loginSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
});

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data: any) => {
    setLoading(true);
    setErrorMessage("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Credenciais inválidas");
      }

      const user = await response.json();

      if (user.isAdmin) {
        router.push("/admin");
      } else {
        router.push("/workshop");
      }
    } catch (error: any) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#E9E9E9", // Fundo com a cor do fundo da imagem
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Imagem no topo */}

      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "#FFF", // Fundo branco para o formulário
          borderRadius: 2,
          p: 3,
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Image
            src={Logo} // Substitua pelo caminho correto
            alt="Logo"
          />
        </Box>
        <Typography
          variant="h5"
          sx={{
            color: "#6985B5", // Azul semelhante ao texto da imagem
            textAlign: "center",
          }}
        >
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 3, width: "100%" }}
        >
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            InputLabelProps={{ style: { color: "#6985B5" } }}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputLabelProps={{ style: { color: "#6985B5" } }}
          />
          {errorMessage && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {errorMessage}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#FFD700", // Botão amarelo
              color: "#6985B5",
              "&:hover": { backgroundColor: "#FFC107" },
            }}
            disabled={loading}
          >
            {loading ? "Entrando..." : "Entrar"}
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
