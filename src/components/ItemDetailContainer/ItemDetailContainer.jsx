
import { useEffect, useState } from "react";
import { ItemDetail } from "../ItemDetail/ItemDetail";
import { useParams, useNavigate  } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "../../config/firebaseConfig";
import { getDoc, doc } from "firebase/firestore";
import Swal from "sweetalert2";



export const ItemDetailContainer = () => {
  const navigate = useNavigate();
    const { id } = useParams();
    const [item, setItem] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => { 

      setIsLoading(true);

      const fetchData = async () => {
        try {
          const itemDet = doc(db, 'products', id);
          const docDet = await getDoc(itemDet);

 
          if (docDet.exists()) {
            setItem({ id: docDet.id, ...docDet.data() });
          } else {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "El producto que quiere buscar no existe",
            }).then((result) => {
             
              if (result.isConfirmed) {
                navigate("/");
              }
            });
          }
        } catch (error) {
          console.error('Error');
        }
      };

      fetchData();
    }, [id, navigate]);
  

  return (
    <>

    
    {item && <ItemDetail {...item} />}
    <div className="d-flex justify-content-around">

   { isLoading ? <AiOutlineLoading3Quarters size={50} /> : < ItemDetail products = {item} /> } 
   </div>
     

    </>
  );
};