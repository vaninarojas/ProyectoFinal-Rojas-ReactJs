import "firebase/firestore";
import { firebaseConfig } from "../../config/firebaseConfig";
import React, { useState, useContext,useRef } from "react";
import { getFirestore, collection, addDoc, doc, deleteDoc } from "firebase/firestore";
import { CartContext } from "../../context/CartContext";
import Swal from "sweetalert2";
import { initializeApp } from "firebase/app";


// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const Order = () => {
    const { totalCartItems } = useContext(CartContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [confirmEmail, setConfirmEmail] = useState("");

    const phoneNumberRef = useRef(null);

    const formattedTotal = totalCartItems.toFixed(2);

    const handlePhoneNumber = (e) => {
        let value = e.target.value.replace(/\D/g, "");
        value = value.slice(0, 11);
        phoneNumberRef.current.value = value;
      };


    const handleName = (e) => {
        const value = e.target.value;
        setName(value);
    };
    const handleEmail= (e) => {
        const value = e.target.value;
        setEmail(value);
      };

      const handleConfirmEmail = (e) => {
        const value = e.target.value;
        setConfirmEmail(value);
      };


      const validateForm = () => {
        const requiredForm = [
          name,
          email,
          confirmEmail,
          phoneNumberRef.current.value,
        ];
    
        const isValid = requiredForm.every((form) => form.trim() !== "");
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailValid = emailRegex.test(email);

        if (!isEmailValid) {
            Swal.fire({
              icon: "error",
              title: "Error de Email",
              text: "Por favor, ingrese un correo válido.",
            });
            return false;
          };

          if (isValid && email !== confirmEmail) {
            Swal.fire({
              icon: "error",
              title: "Error de Email",
              text: "Los correos electrónicos no coinciden. Por favor, verifica.",
            });
            return false;
          };
      
          return isValid;
        };

        const deleteOrderFirestore = async (orderId) => {
            try {
              const orderRef = doc(db, "orders", orderId);
              console.log("Eliminando orden con ID:", orderId); 
              await deleteDoc(orderRef);
              console.log("Orden eliminada con éxito"); 
              Swal.fire({
                icon: "success",
                title: "Orden eliminada",
                text: "La orden ha sido eliminada.",
              });
            } catch (error) {
              Swal.fire({
                icon: "error",
                title: "Error al eliminar la orden",
                text: "Ocurrió un error al intentar eliminar la orden"
              });
            };
          };

          const handleSubmit = async () => {
            if (!validateForm()) {
              return;
            };
            try {

     const ordersCollectionRef = collection(db, "orders");
      const orderData = {
        name,
        email,
        phoneNumber: phoneNumberRef.current.value,
        total: formattedTotal,
      };

      const docRef = await addDoc(ordersCollectionRef, orderData);
      console.log("Orden creada con ID:", docRef.id);

      const orderConfirmation = `
      ¡Gracias por tu compra! <br>
      Tu número de orden es: ${docRef.id}.<br>
      Total de la Compra: $${formattedTotal}<br>
      Nombre: ${name}<br>
      Email: ${email}<br>
      Número de Teléfono: ${phoneNumberRef.current.value}<br>
    `;

    Swal.fire({
        icon: "success",
        title: "Compra confirmada",
        html: orderConfirmation,
        customClass: {
          content: 'text-left',
        },

        showCancelButton: true,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Rechazar',
      })
      .then((result) => {
        if (result.isConfirmed) {
          console.log("Compra aceptada");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          console.log("Compra rechazada");
          deleteOrderFirestore(docRef.id); 
        }
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al procesar la orden",
        text: "Ocurrió un error al intentar procesar la orden. Por favor, inténtalo de nuevo más tarde.",
      });
    };
};

  return (
   
    <div className="mb-3">
 <label className="form-label">
        Nombre Completo:
        <input type="text" className= "form-control" value={name} onChange={handleName} />
      </label>
      <br />
      <label className="mb-3">
        Email:
        <input type="email" className="form-control" value={email} onChange={handleEmail} />
      </label>
      <br />
      <label className="mb-3">
        Confirmar Email:
        <input type="email" className="form-control" value={confirmEmail} onChange={handleConfirmEmail} />
      </label>
      <br />
      <label className="mb-3">
        Numero de Teléfono:
        <input type="text" className="form-control" ref={phoneNumberRef} onChange={handlePhoneNumber} />
      </label>
      <br />
      <p className="fs-3">Total de la Compra: ${formattedTotal}</p>
      <br />
      <button className="btn btn-dark" onClick={handleSubmit}>Confirmar Compra</button>
      </div>
 
  );
  };



