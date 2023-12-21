import { ItemCount } from "../ItemCount/ItemCount";
import Swal from 'sweetalert2';
import { useCart } from "../../context/CartContext";

export const ItemDetail = ({ id, description, img, price, stock, name }) => {
  const { addItem } = useCart();

 const onAdd = (items) => {
    addItem({
      id,
      name,
      description,
      img,
      price,
    }, items);

    Swal.fire({
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1700,
    });
  };
 

  return (
    <div className= "border m-2">
      <div className="card border m-2">
        <div className="card-body " >
          <h5 className="card-title">{name}</h5>
          <img style={{width: "200px"}} src={img} alt="" />
          <p className="card-text"> {description} </p>
          <p>Precio: {price} </p>
          <ItemCount stock={stock} onAdd={onAdd} />
        </div>
      </div>
    </div>
  );
};
