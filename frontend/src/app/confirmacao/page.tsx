"use client";

import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";

const Confirmacao = () => {
  const router = useRouter();

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
          textAlign: "center",
        }}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "#FA1FF7" }}>
          Uhuuull... Inscrição enviada! 🎉
        </Typography>

        <Typography variant="body1" sx={{ marginBottom: 3 }}>
          Não esqueça de enviar o <strong>comprovante do PIX</strong> para o
          e-mail:
          <br />
          <strong style={{ color: "#FA1FF7" }}>
            harmoniavocalteatromusical@gmail.com
          </strong>{" "}
          <br />
          para confirmar sua inscrição.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          onClick={() => router.push("/")}
        >
          Voltar para a Página Inicial
        </Button>
      </Container>
    </Box>
  );
};

export default Confirmacao;
