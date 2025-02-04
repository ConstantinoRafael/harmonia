/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import Cart from "@/components/cart";
import Header from "@/components/header";
import WorkshopList from "@/components/workshopList";
import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

const WorkshopsInfantojuvenis = () => {
  interface Workshop {
    id: number;
    title: string;
    professorName: string;
    date: string;
    duration: number;
    description: string;
  }

  const [workshops, setWorkshops] = useState<Workshop[]>([]);
  const [cart, setCart] = useState<Workshop[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/workshops?isInfantojuvenil=false`)
      .then((res) => res.json())
      .then((data) => setWorkshops(data))
      .catch((err) => console.error("Erro ao buscar workshops:", err));
  }, []);

  // 🔹 Função para verificar conflito de horários
  const hasTimeConflict = (newWorkshop: Workshop): boolean => {
    const newStartTime = new Date(newWorkshop.date).getTime();
    const newEndTime = newStartTime + newWorkshop.duration * 60000;

    return cart.some((existingWorkshop) => {
      const existingStartTime = new Date(existingWorkshop.date).getTime();
      const existingEndTime =
        existingStartTime + existingWorkshop.duration * 60000;

      return (
        (newStartTime >= existingStartTime && newStartTime < existingEndTime) || // Começa dentro de outro workshop
        (newEndTime > existingStartTime && newEndTime <= existingEndTime) || // Termina dentro de outro workshop
        (newStartTime <= existingStartTime && newEndTime >= existingEndTime) // Envolve completamente outro workshop
      );
    });
  };

  const addToCart = (id: number) => {
    const selectedWorkshop = workshops.find((w) => w.id === id);
    if (!selectedWorkshop) return;

    // 🔹 Verifica se há conflito de horário antes de adicionar
    if (hasTimeConflict(selectedWorkshop)) {
      alert(
        "Este workshop entra em conflito de horário com um que já está no carrinho!"
      );
      return;
    }

    const workshopsToAdd = [selectedWorkshop];

    // Se for "Parte 1", busca "Parte 2" correspondente
    if (selectedWorkshop.title.includes("Parte 1")) {
      const part2Workshop = workshops.find(
        (w) =>
          w.title.includes("Parte 2") &&
          w.title.replace("Parte 2", "").trim() ===
            selectedWorkshop.title.replace("Parte 1", "").trim()
      );
      if (part2Workshop) workshopsToAdd.push(part2Workshop);
    }

    // Se for "Parte 2", busca "Parte 1" correspondente
    if (selectedWorkshop.title.includes("Parte 2")) {
      const part1Workshop = workshops.find(
        (w) =>
          w.title.includes("Parte 1") &&
          w.title.replace("Parte 1", "").trim() ===
            selectedWorkshop.title.replace("Parte 2", "").trim()
      );
      if (part1Workshop) workshopsToAdd.unshift(part1Workshop);
    }

    // Evita duplicação no carrinho
    const newCart = [...cart];
    workshopsToAdd.forEach((w) => {
      if (!newCart.some((item) => item.id === w.id)) {
        newCart.push(w);
      }
    });

    // 🔹 Ordena garantindo que "Parte 1" sempre vem antes de "Parte 2"
    newCart.sort((a, b) => {
      if (a.title.includes("Parte 1") && b.title.includes("Parte 2")) return -1;
      if (a.title.includes("Parte 2") && b.title.includes("Parte 1")) return 1;
      return 0;
    });

    setCart(newCart);
  };

  const removeFromCart = (id: number) => {
    const selectedWorkshop = cart.find((w) => w.id === id);
    if (!selectedWorkshop) return;

    // Encontrar o "Par" correspondente
    const workshopsToRemove = [selectedWorkshop];

    if (selectedWorkshop.title.includes("Parte 1")) {
      const part2Workshop = cart.find(
        (w) =>
          w.title.includes("Parte 2") &&
          w.title.replace("Parte 2", "").trim() ===
            selectedWorkshop.title.replace("Parte 1", "").trim()
      );
      if (part2Workshop) workshopsToRemove.push(part2Workshop);
    }

    if (selectedWorkshop.title.includes("Parte 2")) {
      const part1Workshop = cart.find(
        (w) =>
          w.title.includes("Parte 1") &&
          w.title.replace("Parte 1", "").trim() ===
            selectedWorkshop.title.replace("Parte 2", "").trim()
      );
      if (part1Workshop) workshopsToRemove.push(part1Workshop);
    }

    // Atualizar carrinho removendo ambos os pares
    const newCart = cart.filter((item) => !workshopsToRemove.includes(item));

    setCart(newCart);
  };

  const handleCartOpen = () => setCartOpen(true);
  const handleCartClose = () => setCartOpen(false);

  const handleSubmit = () => {
    fetch("/cart/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cart.map((item: any) => item.id)),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Registro enviado com sucesso!");
        setCart([]);
        handleCartClose();
      });
  };

  return (
    <Box
      sx={{
        backgroundColor: "#000000",
        minHeight: "100vh",
      }}
    >
      {/* Header com fundo preto */}
      <Box sx={{ backgroundColor: "#000000", paddingBottom: 1 }}>
        <Header cartCount={cart.length} onCartClick={handleCartOpen} />
      </Box>

      {/* Lista de Workshops */}
      <Box
        sx={{
          backgroundColor: "#121212",
          padding: 3,
          minHeight: "calc(100vh - 64px)",
        }}
      >
        <WorkshopList
          workshops={workshops}
          addToCart={addToCart}
          removeFromCart={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
      </Box>

      {/* Carrinho */}
      <Cart
        open={cartOpen}
        onClose={handleCartClose}
        cartItems={cart}
        handleSubmit={handleSubmit}
        removeFromCart={removeFromCart}
      />
    </Box>
  );
};

export default WorkshopsInfantojuvenis;
