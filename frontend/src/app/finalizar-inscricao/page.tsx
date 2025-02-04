/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Divider,
} from "@mui/material";
import { useRouter } from "next/navigation";

const FinalizarInscricao = () => {
  const router = useRouter();

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    birthday: "",
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems");
    if (storedCart) {
      setCartItems(JSON.parse(storedCart));
    }
  }, []);

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
        name === "birthday"
          ? formatDate(value)
          : name === "phone"
          ? formatPhoneNumber(value)
          : value,
    }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const workshopIds = cartItems.map((item) => item.id);

    const payload = {
      ...formData,
      workshopIds,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/registrations`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      if (response.ok) {
        alert("Inscrição finalizada com sucesso!");
        localStorage.removeItem("cartItems"); // Limpa o carrinho
        router.push("/confirmacao");
      } else {
        alert("Erro ao finalizar inscrição!");
      }
    } catch (error) {
      console.error("Erro na inscrição:", error);
      alert("Erro na inscrição. Tente novamente.");
    }
  };

  // Cálculo do valor total com desconto
  const pricePerWorkshop = 60;
  const discountWorkshops = Math.floor(cartItems.length / 6); // Workshops gratuitos a cada 6
  const payableWorkshops = cartItems.length - discountWorkshops; // Quantidade de workshops pagos
  const total = payableWorkshops * pricePerWorkshop;

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

        <Divider sx={{ backgroundColor: "#FFFFFF", marginY: 2 }} />

        {/* Exibição do total a pagar */}
        <Typography variant="h6" sx={{ marginBottom: 2, textAlign: "center" }}>
          Total a pagar: <strong>R$ {total.toFixed(2)}</strong>
        </Typography>

        {/* Informação de pagamento via PIX */}
        <Typography
          variant="body1"
          sx={{
            textAlign: "center",
            marginBottom: 3,
            color: "#FA1FF7",
            fontWeight: "bold",
          }}
        >
          Para confirmar a inscrição, faça o pagamento via PIX para a chave:{" "}
          <br />
          <strong>Celular: 2199223-9843</strong>
          <br />
          Enviar comprovante para{" "}
          <strong>harmoniavocalteatromusical@gmail.com</strong>
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Nome"
            variant="outlined"
            name="name"
            value={formData.name}
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
            name="phone"
            value={formData.phone}
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
            name="birthday"
            value={formData.birthday}
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
              Enviar Inscrição
            </Button>
          </Box>
        </form>
      </Container>
    </Box>
  );
};

export default FinalizarInscricao;
