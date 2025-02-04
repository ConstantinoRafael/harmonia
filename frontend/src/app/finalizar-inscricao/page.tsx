"use client";

import React, { useState } from "react";
import { Container, TextField, Button, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const FinalizarInscricao = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    telefone: "",
    dataNascimento: "",
  });

  const formatDate = (value: string) => {
    let cleanValue = value.replace(/\D/g, ""); // Remove tudo que não é número

    if (cleanValue.length >= 2)
      cleanValue = cleanValue.replace(/^(\d{2})/, "$1/");
    if (cleanValue.length >= 5)
      cleanValue = cleanValue.replace(/^(\d{2})\/(\d{2})/, "$1/$2/");
    if (cleanValue.length > 10) cleanValue = cleanValue.substring(0, 10);

    return cleanValue;
  };

  const formatPhoneNumber = (value: string) => {
    let cleanValue = value.replace(/\D/g, ""); // Remove tudo que não é número

    if (cleanValue.length > 11) cleanValue = cleanValue.substring(0, 11);

    if (cleanValue.length > 10) {
      return cleanValue.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    } else if (cleanValue.length > 6) {
      return cleanValue.replace(/^(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
    } else if (cleanValue.length > 2) {
      return cleanValue.replace(/^(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      return cleanValue;
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "dataNascimento"
          ? formatDate(value)
          : name === "telefone"
          ? formatPhoneNumber(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Dados enviados:", formData);
    alert("Inscrição finalizada com sucesso!");
    router.push("/");
  };

  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "#000000",
          color: "#FFFFFF",
          padding: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Finalizar Inscrição
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            sx={{
              backgroundColor: "#211D1D",
              borderRadius: 1,
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FFFFFF" },
                "&:hover fieldset": { borderColor: "#FA1FF7" },
                "&.Mui-focused fieldset": { borderColor: "#FA1FF7" },
              },
              "& .MuiInputBase-input": {
                color: "#FFFFFF",
              },
              "& .MuiInputLabel-root": {
                color: "#FFFFFF",
              },
            }}
          />

          <TextField
            fullWidth
            label="E-mail"
            variant="outlined"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
            sx={{
              backgroundColor: "#211D1D",
              borderRadius: 1,
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FFFFFF" },
                "&:hover fieldset": { borderColor: "#FA1FF7" },
                "&.Mui-focused fieldset": { borderColor: "#FA1FF7" },
              },
              "& .MuiInputBase-input": {
                color: "#FFFFFF",
              },
              "& .MuiInputLabel-root": {
                color: "#FFFFFF",
              },
            }}
          />

          <TextField
            fullWidth
            label="Telefone"
            variant="outlined"
            name="telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
            placeholder="(XX) XXXXX-XXXX"
            inputProps={{ maxLength: 15 }}
            sx={{
              backgroundColor: "#211D1D",
              borderRadius: 1,
              marginBottom: 2,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FFFFFF" },
                "&:hover fieldset": { borderColor: "#FA1FF7" },
                "&.Mui-focused fieldset": { borderColor: "#FA1FF7" },
              },
              "& .MuiInputBase-input": {
                color: "#FFFFFF",
                fontSize: "16px",
              },
              "& .MuiInputLabel-root": {
                color: "#FFFFFF",
              },
            }}
          />

          <TextField
            fullWidth
            label="Data de Nascimento"
            variant="outlined"
            name="dataNascimento"
            value={formData.dataNascimento}
            onChange={handleChange}
            required
            placeholder="dd/mm/aaaa"
            inputProps={{ maxLength: 10 }}
            sx={{
              backgroundColor: "#211D1D",
              borderRadius: 1,
              marginBottom: 3,
              "& .MuiOutlinedInput-root": {
                "& fieldset": { borderColor: "#FFFFFF" },
                "&:hover fieldset": { borderColor: "#FA1FF7" },
                "&.Mui-focused fieldset": { borderColor: "#FA1FF7" },
              },
              "& .MuiInputBase-input": {
                color: "#FFFFFF",
                fontSize: "16px",
              },
              "& .MuiInputLabel-root": {
                color: "#FFFFFF",
              },
            }}
          />

          <Box display="flex" justifyContent="space-between">
            <Button
              variant="contained"
              color="secondary"
              onClick={() => router.push("/")}
            >
              Cancelar
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Finalizar Inscrição
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default FinalizarInscricao;
