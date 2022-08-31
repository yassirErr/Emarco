import { ShoppingCart } from "@mui/icons-material";
import {
  AppBar,
  Badge,
  Box,
  IconButton,
  List,
  ListItem,
  Switch,
  Toolbar,
  Typography,
} from "@mui/material";
import { Link, NavLink } from "react-router-dom";
import { useAppSelectore } from "../store/configureStore";
interface Props {
  darkMode: boolean;
  handleThemChange: () => void;
}

const midlLinks = [
  { title: "catalog", path: "/catalog" },
  { title: "about", path: "/about" },
  { title: "contact", path: "/contact" },
];

const rightlLinks = [
  { title: "login", path: "/login" },
  { title: "register", path: "/register" },
];
const navStyle = {
  color: "inherit",
  textDecoration: "none",
  typography: "h6",
  "&:hover": {
    color: "grey.500",
  },
  "&.active": {
    color: "text.secondary",
  },
};

export default function Header({ darkMode, handleThemChange }: Props) {

  const {basket} = useAppSelectore(state=>state.basket);
  const itemCount = basket?.items.reduce((sum,item) => sum + item.quantity,0);

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h5" component={NavLink} to="/" sx={navStyle}>
            E-marco
          </Typography>

          <Switch checked={darkMode} onChange={handleThemChange} />
        </Box>

        <List sx={{ display: "flex" }}>
          {midlLinks.map(({ title, path }) => (
            <ListItem component={NavLink} to={path} key={path} sx={navStyle}>
              {title.toUpperCase()}
            </ListItem>
          ))}
        </List>
        <Box display='flex' alignItems='center'>
          <IconButton component={Link} to='/basket'  size="large" sx={{ color: "inherit" }}>
            <Badge badgeContent={itemCount} color="secondary">
              <ShoppingCart />
            </Badge>
          </IconButton>

          <List sx={{ display: "flex" }}>
            {rightlLinks.map(({ title, path }) => (
              <ListItem component={NavLink} to={path} key={path} sx={navStyle}>
                {title.toUpperCase()}
              </ListItem>
            ))}
          </List>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
