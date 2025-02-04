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
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/navigation"; // Importa roteamento

const Cart = ({ open, onClose, cartItems, removeFromCart }: any) => {
  const router = useRouter(); // Habilita navegação

  // Calcula o total (R$ 60 por workshop)
  const total = cartItems.length * 60;

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
          <Button
            onClick={() => router.push("/finalizar-inscricao")}
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
