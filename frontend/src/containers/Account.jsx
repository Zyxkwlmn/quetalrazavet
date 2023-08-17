import React from 'react';
import '../styles/Account.scss';

const Account = () => {
    return (
        <div className="account">
            <div className="form-container">
            <h1 className="title">Registrarse</h1>

            <form action="/" className="form">
                <div>  
                <label for="name" className="label">Nombres</label>
                <input type="text" id="name" placeholder="" className="input input-text"/>

                <label for="name" className="label">Apellidos</label>
                <input type="text" id="lastname" placeholder="" className="input input-text"/>

                <label for="name" className="label">DNI</label>
                <input type="text" id="dni" placeholder="" className="input input-text"/>

                <label for="name" className="label">Dirección</label>
                <input type="text" id="address" placeholder="" className="input input-text"/>

                <label for="email" className="label">Email</label>
                <input type="text" id="email" placeholder="" className="input input-email"/>

                <label for="name" className="label">N° de celular</label>
                <input type="text" id="phone" placeholder="" className="input input-text"/>

                <label for="password" className="label">Password</label>
                <input type="password" id="password" placeholder="*********" className="input input-password"/>

                <label htmlFor="">Recuerda que tu nombre de usuario será tu N° de DNI</label>
                </div>

                <input type="submit" value="Registrarse" className="primary-button login-button"/>
                <label htmlFor="">¿Ya tienes una cuenta? <span>Iniciar Sesión</span></label>
            </form>
            </div>
        </div>
    );
}

export default Account;