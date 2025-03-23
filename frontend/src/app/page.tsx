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
        <Typography
          variant="h5"
          sx={{ color: "#FA1FF7", fontWeight: "bold", marginBottom: 2 }}
        >
          Em construção...
        </Typography>
        {/* 🔹 FRASE PROMOCIONAL
        <Typography
          variant="h5"
          sx={{ color: "#FA1FF7", fontWeight: "bold", marginBottom: 2 }}
        >
          FEVEREIRO MUSICAL
        </Typography> */}
        {/* 🔹 DETALHES DO INVESTIMENTO */}
        {/* <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
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
        </Typography> */}
        {/* 🔹 FRASE COM LINK PARA BUSCA PELO EMAIL */}
        {/* <Typography
          variant="body1"
          sx={{
            color: "#FA1FF7",
            fontWeight: "bold",
            marginTop: 2,
            cursor: "pointer",
            textDecoration: "underline",
          }}
          onClick={() => router.push("/buscar-workshops")}
        >
          Quer saber em quais workshops se inscreveu?
        </Typography> */}
        {/* Botões de Navegação */}
        {/* <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            mt: 3,
            width: "100%",
            alignItems: "center", // Centraliza os botões
          }}
        >
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => router.push("/workshops")}
            sx={{
              textTransform: "none",
              maxWidth: 300, // Limita a largura
              width: "100%", // Garante responsividade
              padding: "12px",
            }}
          >
            WORKSHOPS
          </Button>

          <Button
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => router.push("/workshops-infantojuvenis")}
            sx={{
              textTransform: "none",
              maxWidth: 300, // Mantém um tamanho confortável
              width: "100%",
              padding: "12px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              whiteSpace: "pre-line",
            }}
          >
            WORKSHOPS INFANTOJUVENIS
            <Typography
              variant="caption"
              component="span"
              sx={{ fontSize: "0.75rem" }}
            >
              (até 16 anos)
            </Typography>
          </Button>
        </Box> */}
      </Container>
    </Box>
  );
};

export default Home;
