import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useRouter } from "next/navigation"; // Importa o router para navegação

const Header = ({
  cartCount,
  onCartClick,
}: {
  cartCount: number;
  onCartClick: () => void;
}) => {
  const router = useRouter(); // Hook para navegação

  return (
    <AppBar position="static" sx={{ backgroundColor: "#000000" }}>
      {" "}
      {/* Fundo preto */}
      <Toolbar>
        {/* Título clicável */}
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            color: "#FFFFFF",
            cursor: "pointer", // Indica que é clicável
          }}
          onClick={() => router.push("/")} // Redireciona para a home
        >
          TERG Musical
        </Typography>

        {/* Ícone do carrinho */}
        <IconButton onClick={onCartClick} sx={{ color: "#FA1FF7" }}>
          <Badge
            badgeContent={cartCount}
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#FA1FF7",
                color: "#FFFFFF",
              },
            }}
          >
            <ShoppingCartIcon />
          </Badge>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
