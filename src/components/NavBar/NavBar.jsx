import {CartWidget} from "../CartWidget/CartWidget";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <div className="d-flex justify-content-around mt-2 p-4">
   <img className="rounded" src="/img/vrjoyas.jpg" alt="" style={{width: "150px"}} />
   <nav className="navbar navbar-expand-lg bg-beige ">
  <div className="container-fluid">
  <Link to= {"/"} className="navbar-brand"> HOME
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button> </Link>
    <div className="collapse navbar-collapse" id="navbarNav">
    <ul className="navbar-nav">
      <Link to={"/category/anillos"} className="nav-link nav-item"> ANILLOS </Link>
        <Link to= {"/category/pulseras"} className="nav-link nav-item">PULSERAS</Link>
        <Link to= {"/category/cadenas"} className="nav-link nav-item"> CADENAS </Link>
        <Link to= {"/category/aros"} className="nav-link nav-item"> AROS</Link>
      </ul>
    </div>
  </div>
</nav>
<div className="d-flex">
<CartWidget />
</div>
    </div>
  );
};

