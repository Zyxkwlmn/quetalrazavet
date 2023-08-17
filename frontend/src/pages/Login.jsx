import React, {useState} from 'react';
import '../styles/Session.scss';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert';

const Login = () => {

    const navigate = useNavigate();
    // const [user, setEmail] = useState('')
    // const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        var username = document.getElementById("user").value;
        var pass = document.getElementById("password").value;
        
        if (username == "administrador" && pass == "7urn3r") {
            setTimeout(function(){
                navigate('/ListAppo');
            }, 3000);
        } else {
            swal({
                icon: 'error',
                text: 'El usuario y/o contraseña es incorrecto',
            }); 
        }
    }
    return (
        <div className="login">
            <div className="form-container">

            <form action="/" className="form" onSubmit={handleSubmit}>
                <label for="email" className="label">Usuario</label>
                <input type="text" name="email" id="user" className="input input-email"/>

                <label for="password" className="label">Contraseña</label>
                <input type="password" name="password" id="password" placeholder="*********" className="input input-password"/>

                <button type="button" className="primary-button" onClick={handleSubmit}> 
                    Iniciar Sesión
                </button> 
                {/* <a href="/">¿Olvidaste tu contraseña?</a> */}
            </form>

            {/* <button className="secondary-button signup-button">Registrate</button> */}
            </div>
        </div>
    );
}

export default Login;