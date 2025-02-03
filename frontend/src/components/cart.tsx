import React from "react";
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
import DeleteIcon from "@mui/icons-material/Delete"; // Ícone de lixeira 🗑️

const Cart = ({
  open,
  onClose,
  cartItems,
  handleSubmit,
  removeFromCart,
}: any) => {
  // Calcula o total (R$ 60 por workshop)
  const total = cartItems.length * 60;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      sx={{
        "& .MuiPaper-root": {
          backgroundColor: "#211D1D", // Fundo menos escuro
          color: "#FFFFFF", // Texto branco
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
                    sx={{ color: "#FA1FF7" }} // Ícone da lixeira na cor do carrinho
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
                    color: "#FFFFFF", // Garante que o título seja branco
                    "& .MuiTypography-body2": { color: "#FFFFFF" }, // Garante que o texto secundário também fique branco
                  }}
                />
              </ListItem>
            ))}
          </List>
        )}
      </DialogContent>

      {/* Somatório do total */}
      {cartItems.length > 0 && (
        <>
          <Divider sx={{ backgroundColor: "#FFFFFF" }} />
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "space-between",
              backgroundColor: "#211D1D",
            }}
          >
            <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
              Total:
            </Typography>
            <Typography variant="h6" sx={{ color: "#FFFFFF" }}>
              R$ {total.toFixed(2)}
            </Typography>
          </Box>
        </>
      )}

      <DialogActions sx={{ backgroundColor: "#211D1D" }}>
        <Button onClick={onClose} color="secondary" variant="contained">
          Fechar
        </Button>
        {cartItems.length > 0 && (
          <Button onClick={handleSubmit} color="primary" variant="contained">
            Confirmar Inscrição
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};

export default Cart;
