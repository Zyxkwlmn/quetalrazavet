import React, {useRef} from 'react';
import '../styles/Session.scss';

const Session = () => {

    const form = useRef(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(form.current);
        const data = {
            username: formData.get('email'),
            password: formData.get('password')
        }
    };

    return (
        <div className="login">
            <div className="form-container">
            <img src="./logos/logo_yard_sale.svg" alt="logo" className="logo"/>

            <form action="/" className="form" ref={form}>
                <label for="email" className="label">Usuario</label>
                <input type="text" name="email" placeholder="" className="input input-email"/>

                <label for="password" className="label">Contraseña</label>
                <input type="password" name="password" placeholder="*********" className="input input-password"/>

                <button type="submit" className="primary-button login-button" onClick={handleSubmit}> 
                    Iniciar Sesión
                </button>containers
                <a href="/">¿Olvidaste tu contraseña?</a>
            </form>

            <button className="secondary-button signup-button">Registrate</button>
            </div>
        </div>
    );
}

export default Session;