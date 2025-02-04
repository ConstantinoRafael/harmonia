"use client";

import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import { useRouter } from "next/navigation";
import LogoTergMusical from "../../public/assets/logo-terg-musical.jpeg";
import Image from "next/image";

const Home = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
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
        {/* 🔹 LOGO */}
        <Box sx={{ mb: 4 }}>
          <Image
            src={LogoTergMusical}
            alt="Terg Musical Logo"
            width={300}
            priority
          />
        </Box>

        {/* 🔹 FRASE PROMOCIONAL */}
        <Typography
          variant="h5"
          sx={{ color: "#FA1FF7", fontWeight: "bold", marginBottom: 2 }}
        >
          FEVEREIRO MUSICAL
        </Typography>

        {/* 🔹 DETALHES DO INVESTIMENTO */}
        <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
          Valor por workshop: <strong>R$ 60,00</strong>
        </Typography>

        <Typography
          variant="h6"
          sx={{ color: "#FA1FF7", fontWeight: "bold", marginTop: 1 }}
        >
          A cada 5 workshops você ganha 1! 🎭✨
        </Typography>

        <Typography variant="h6" sx={{ color: "#FFFFFF", marginTop: 1 }}>
          Desta forma, <strong>6 workshops por R$ 300,00</strong>
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: "#FA1FF7", fontWeight: "bold", marginTop: 1 }}
        >
          (Os workshops contendo “Parte 1” e “Parte 2” são contabilizados como 2
          workshops)
        </Typography>

        {/* 🔹 BOTÕES DE AÇÃO */}
        <Box sx={{ marginTop: 3 }}>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginBottom: 2, width: "100%" }}
            onClick={() => router.push("/workshops")}
          >
            Ver Workshops
          </Button>

          <Button
            variant="contained"
            color="secondary"
            sx={{ width: "100%" }}
            onClick={() => router.push("/finalizar-inscricao")}
          >
            Finalizar Inscrição
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Home;
