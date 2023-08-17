import React, {useState, useContext} from 'react';
import '../styles/Header.scss';
import menu from '../assets/icons/icon_menu.svg';
import logo from '../assets/logos/logo.jpg';
import usuario from '../assets/icons/usuario.png';

const Header = () => {

    return (
        <nav>
          <img src={menu} alt="menu" className="menu"/>

          <div className="navbar-left">
            <img src={logo} alt="logo" className="nav-logo"/>

            <ul>
              <li>
                <a href="/home">Clientes</a>
              </li>
              <li>
                <a href="/ListAllPet">Mascotas</a>
              </li>
              <li>
                <a href="/ListAppo">Citas</a>
              </li>
              <li>
                <a href="">Atenciones</a>
              </li>
              <li>
                <a href="">Inventario</a>
              </li>
            </ul>
          </div>

          <div className="navbar-right">
            <ul>
              <li className="navbar-email" >Administrador</li>
              <li className="navbar-shopping-cart">
              <img src={usuario} alt="usuario" className="usuario"/></li>
             </ul> 
          </div>
      </nav>
    );
}

export default Header;