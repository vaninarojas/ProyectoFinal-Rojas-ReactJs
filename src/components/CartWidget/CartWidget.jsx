import { BiCart } from "react-icons/bi";
import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from "../../context/CartContext";
import "./cartWidget.css";


export const CartWidget = () => {
  const { totalQuantity } = useCart();


  return (
 <Link to = "/cart" className="carrito-link">
    <div className="d-flex">
      <BiCart  size={40}/>
      <span>({totalQuantity})</span>
    </div>
    </Link>
  );
};

