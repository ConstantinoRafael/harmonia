/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

interface Workshop {
  id: number;
  title: string;
  professorName: string;
  date: string;
  duration: number;
  description: string;
}

interface WorkshopListProps {
  workshops: Workshop[];
  addToCart: (id: number) => void;
  cart?: Workshop[];
}
import {
  Card,
  CardContent,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info"; // Ícone ℹ️

const WorkshopList: React.FC<WorkshopListProps> = ({
  workshops,
  addToCart,
  cart = [],
}) => {
  const [selectedWorkshop, setSelectedWorkshop] = useState<Workshop | null>(
    null
  );
  const [open, setOpen] = useState(false);

  const handleOpen = (workshop: any) => {
    setSelectedWorkshop(workshop);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedWorkshop(null);
  };

  // Função para formatar data e horário (dd/mm/aaaa - HH:mm às HH:mm)
  const formatDateTime = (dateString: string, duration: number) => {
    const startDate = new Date(dateString);
    startDate.setHours(startDate.getHours() + 3); // Adiciona 3 horas

    const endDate = new Date(startDate.getTime() + duration * 60000);

    return `${startDate.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })} - ${startDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })} às ${endDate.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
    })}`;
  };

  // Adiciona ao carrinho e garante que "Parte 1" e "Parte 2" sejam adicionadas juntas
  const handleAddToCart = (workshop: any) => {
    const workshopsToAdd = [workshop];

    // Se for "Parte 1", adiciona "Parte 2" correspondente
    if (workshop.title.includes("Parte 1")) {
      const part2Workshop = workshops.find(
        (w: any) =>
          w.title.includes("Parte 2") &&
          w.title.replace("Parte 2", "").trim() ===
            workshop.title.replace("Parte 1", "").trim()
      );
      if (part2Workshop) {
        workshopsToAdd.push(part2Workshop);
      }
    }

    // Se for "Parte 2", adiciona "Parte 1" correspondente
    if (workshop.title.includes("Parte 2")) {
      const part1Workshop = workshops.find(
        (w: any) =>
          w.title.includes("Parte 1") &&
          w.title.replace("Parte 1", "").trim() ===
            workshop.title.replace("Parte 2", "").trim()
      );
      if (part1Workshop) {
        workshopsToAdd.push(part1Workshop);
      }
    }
    // Evita adicionar workshops duplicados ao carrinho
    workshopsToAdd.forEach((w) => {
      if (!cart.some((item: any) => item.id === w.id)) {
        addToCart(w.id);
      }
    });

    handleClose();
  };

  return (
    <>
      <Grid container spacing={2}>
        {workshops.map((workshop: any) => (
          <Grid item xs={12} sm={6} md={4} key={workshop.id}>
            <Card
              sx={{
                backgroundColor: "#211D1D", // Preto menos escuro
                color: "#FFFFFF", // Texto branco
              }}
            >
              <CardContent>
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box>
                    <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
                      {workshop.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#FFFFFF" }}>
                      {workshop.professorName} -{" "}
                      {formatDateTime(workshop.date, workshop.duration)}
                    </Typography>
                  </Box>
                  <IconButton
                    onClick={() => handleOpen(workshop)}
                    sx={{ color: "#03A9E6" }} // Azul no ícone ℹ️
                  >
                    <InfoIcon />
                  </IconButton>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal de detalhes */}
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle sx={{ backgroundColor: "#211D1D", color: "#FFFFFF" }}>
          {selectedWorkshop?.title}
        </DialogTitle>
        <DialogContent sx={{ backgroundColor: "#211D1D", color: "#FFFFFF" }}>
          <Typography variant="subtitle1">
            Professor: {selectedWorkshop?.professorName}
          </Typography>
          <Typography variant="subtitle2">
            Data:{" "}
            {selectedWorkshop
              ? formatDateTime(selectedWorkshop.date, selectedWorkshop.duration)
              : ""}
          </Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            {selectedWorkshop?.description}
          </Typography>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#211D1D" }}>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Fechar
          </Button>
          <Button
            onClick={() =>
              selectedWorkshop && handleAddToCart(selectedWorkshop)
            }
            color="primary"
            variant="contained"
            disabled={cart.some(
              (item: any) => item.id === selectedWorkshop?.id
            )}
          >
            {cart.some((item: any) => item.id === selectedWorkshop?.id)
              ? "Já no Carrinho"
              : "Adicionar ao Carrinho"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default WorkshopList;
