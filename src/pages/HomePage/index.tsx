/* import { Card } from "../../components/Card";
import { NavBar } from "../../components/NavBar";
import { ListContainerHome, MainContainerHome } from "./style";
import { MenuItemFormat } from "../../interfaces/interfaces";
import { useState, useEffect } from "react";
import axios from "axios";
import { useCart } from "../../providers/cart";
import { useAuth } from "../../providers/auth"; */
import MainImage from "../../assets/main_component_background.jpg";

const HomePage = () => {
  /*  const [menuList, setMenuList] = useState<MenuItemFormat[]>(
    [] as MenuItemFormat[]
  );

  const { getItemsInCart, setCart } = useCart();

  const { authToken, userId } = useAuth();

  useEffect(() => {
    axios
      .get("https://hamburgerapi.onrender.com/menulist")
      .then((response) => {
        setMenuList([...response.data]);
        userId && authToken && getItemsInCart(userId, authToken);
        userId === "" && setCart([]);
      })
      .catch((e) => console.log(e.response.data.message));
  }, [userId]); */

  return (
    <div>
      <img src={MainImage} alt="bee-main-background" />
      <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </div>
  );
};

export default HomePage;
