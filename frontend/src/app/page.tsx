"use client";

import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/navigation";
import LogoTergMusical from "../../public/assets/logo-terg-musical.jpeg";

const Home = () => {
  const router = useRouter();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        textAlign: "center",
        width: "100vw",
        padding: 2,
        backgroundColor: "#000000",
      }}
    >
      {/* Logo */}
      <Box sx={{ mb: 4 }}>
        <Image
          src={LogoTergMusical}
          alt="Terg Musical Logo"
          width={300}
          priority
        />
      </Box>

      {/* Título */}
      <Typography variant="h5" gutterBottom>
        Bem-vindo ao Terg Musical
      </Typography>

      {/* Botões de Navegação */}
      <Box
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
      </Box>
    </Box>
  );
};

export default Home;
