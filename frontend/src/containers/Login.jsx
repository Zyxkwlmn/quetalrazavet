import React from 'react';
import '../styles/login.scss';

const Login = () => {
    return(
      <div className="login">
        <div className="form-container">
          <img src="./logos/logo_yard_sale.svg" alt="logo" className="logo"/>
          <form action="/" className="form">
          <label htmlFor="">Para reservar su cita ustede debe iniciar sesión en nuestro sitio web</label>

          <button className="primary-button login-button"> <label className="label">Iniciar Sesión</label> </button>

          <label htmlFor="">¿Todavía no tienes una cuenta?</label>

          <button className="primary-button login-button"> <label className="label">Registrarse</label> </button>

          <label htmlFor="">Al registrarte estas aceptando nuestros Términos de Uso y Política de Privacidad</label>
          </form>
        </div>
      </div>
    );
}

export default Login;
