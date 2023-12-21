import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { useContext,useEffect,useState } from "react";
import {useParams} from "react-router-dom";
import { ItemList } from "../ItemList/ItemList";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { db } from "../../config/firebaseConfig";
import { seedProducts } from "../../utils/seedProducts";



export const ItemListContainer = () => {

  const { category } = useParams();


  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [setProduct] = useState(null);


  const getProductsDB = async (category) => {
    const myProducts = category
      ? query(collection(db, "products"), where("category", "==", category))
      : query(collection(db, "products"));
    const resp = await getDocs(myProducts);
    if (resp.size === 0) {
    }

 
    const productList = resp.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setProducts(productList);
    setIsLoading(false);
  };

  const getProductById = async (id) => {
    const productRef = doc(db, "products", id);
    const resp = await getDoc(productRef);
    if (resp.exists()) {
      const prod = {
        id: resp.id,
        ...resp.data()
      };
      setProduct(prod);
    }
  };


  useEffect(() => {
    setIsLoading(true);
    getProductsDB(category);
    getProductById(" ");
    // seedProducts()
  }, [category]);


    return (
      <>

      
   <div className="d-flex justify-content-around">
  

 { isLoading ? <AiOutlineLoading3Quarters size={50} /> : < ItemList products = {products} /> } 
 </div>
      </>
      
    );
  };
  