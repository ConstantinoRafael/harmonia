/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Divider,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation";

const Cart = ({ open, onClose, cartItems, removeFromCart }: any) => {
  const router = useRouter();

  // Salva os itens do carrinho no localStorage sempre que ele for atualizado
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Define o preço de cada workshop
  const pricePerWorkshop = 60;

  // Aplica a lógica de desconto: a cada 6 workshops, o usuário paga por 5
  const discountWorkshops = Math.floor(cartItems.length / 6); // Conta quantos descontos serão aplicados
  const payableWorkshops = cartItems.length - discountWorkshops; // Quantidade de workshops que serão pagos

  // Calcula o total com desconto
  const total = payableWorkshops * pricePerWorkshop;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#211D1D",
          color: "#FFFFFF",
        },
      }}
    >
      <DialogTitle sx={{ backgroundColor: "#211D1D", color: "#FFFFFF" }}>
        Seu Carrinho
      </DialogTitle>
      <DialogContent sx={{ backgroundColor: "#211D1D", color: "#FFFFFF" }}>
        {cartItems.length === 0 ? (
          <Typography variant="body1">Seu carrinho está vazio.</Typography>
        ) : (
          <List>
            {cartItems.map((item: any, index: number) => (
              <ListItem
                key={index}
                secondaryAction={
                  <IconButton
                    edge="end"
                    sx={{ color: "#FA1FF7" }}
                    onClick={() => removeFromCart(item.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                }
              >
                <ListItemText
                  primary={item.title}
                  secondary={`Professor: ${item.professorName} - ${new Date(
                    item.date
                  ).toLocaleDateString("pt-BR")}`}
                  sx={{
                    color: "#FFFFFF",
                    "& .MuiTypography-body2": { color: "#FFFFFF" },
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>

      {cartItems.length > 0 && (
        <>
          <Divider sx={{ backgroundColor: "#FFFFFF" }} />
          <Box
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              backgroundColor: "#211D1D",
            }}
          >
            <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
              Total de Workshops: {cartItems.length}
            </Typography>

            {discountWorkshops > 0 && (
              <Typography variant="body2" sx={{ color: "#FA1FF7" }}>
                Promoção aplicada: {discountWorkshops} workshop(s) grátis!
              </Typography>
            )}

            <Typography variant="h6" sx={{ color: "#FFFFFF", marginTop: 1 }}>
              Total a pagar: R$ {total.toFixed(2)}
            </Typography>
          </Box>
        </>
      )}

      <DialogActions sx={{ backgroundColor: "#211D1D" }}>
        <Button onClick={onClose} color="secondary" variant="contained">
          Fechar
        </Button>
        {cartItems.length > 0 && (
          <Button
            onClick={() => {
              localStorage.setItem("cartItems", JSON.stringify(cartItems)); // Salva no localStorage
              router.push("/finalizar-inscricao");
            }}
            color="primary"
            variant="contained"
          >
            Finalizar Inscrição
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Cart;
