"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import Image from "next/image";
import Logo from "../../../public/assets/minuatura-harmonia.png";

const registerSchema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email é obrigatório"),
  password: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), ""], "As senhas devem coincidir")
    .required("Confirme sua senha"),
});

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const router = useRouter();

  const onSubmit = (data) => {
    console.log("Cadastro:", data);
    router.push("/login");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#000",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
      }}
    >
      {/* Adicionando a Imagem no Topo */}

      <Container
        maxWidth="xs"
        sx={{
          backgroundColor: "#211D1D",
          borderRadius: 2,
          p: 3,
          color: "#fff",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Image
            src={Logo} // Altere para o caminho da sua imagem
            alt="Logo"
          />
        </Box>
        <Typography variant="h5" sx={{ color: "#FFCE2A", textAlign: "center" }}>
          Cadastro
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
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff", borderColor: "#fff" } }}
          />
          <TextField
            label="Senha"
            type="password"
            fullWidth
            margin="normal"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff", borderColor: "#fff" } }}
          />
          <TextField
            label="Confirmar Senha"
            type="password"
            fullWidth
            margin="normal"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={errors.confirmPassword?.message}
            InputLabelProps={{ style: { color: "#fff" } }}
            InputProps={{ style: { color: "#fff", borderColor: "#fff" } }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              backgroundColor: "#FFCE2A",
              color: "#000",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#FFC107" },
            }}
          >
            Criar Conta
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
