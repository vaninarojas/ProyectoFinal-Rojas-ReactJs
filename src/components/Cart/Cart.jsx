
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import Swal from 'sweetalert2';


export const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, totalCartItems, removeItem} = useContext(CartContext);


  const handleConfirm = () => {
    if (cartItems.length === 0) {
      Swal.fire({
        title: "El carrito se encuentra vacío",
        text: "Por favor, revise que todos los productos fueran agregados",
        icon: "error"
      });

    } else {
      navigate("/confirmar-compra");
    }
  };

  return (
    <div className="align-items-center mt-2 p-4">
      <div>
        {cartItems.map((item) => (
        <div className= "border m-2" key={item.id}>
          <div className="card border m-2" >
          <div className="card-body " >
           <img style={{width: "200px"}} src={item.img} alt="" />
            <p className="card-title">Nombre: {item.name}</p>
            <p>Precio: ${item.price}</p>
            <p>Cantidad: {item.quantity}</p>
            <p>Sub total: ${item.subTotal}</p>
            <button className="btn btn-dark" onClick={() => removeItem(item.id)}>
              Eliminar
            </button>
          </div>
          </div>
          </div>
          
        ))}
      </div>

     <div className="card align-items-center fs-2">
      <p >Suma total del carrito ${totalCartItems}</p>
     <button className= "btn btn-dark" onClick={handleConfirm}>Confirmar Compra</button>
     </div>
    </div>
  
  );
};