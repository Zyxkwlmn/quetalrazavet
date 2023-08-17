import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/Client.scss';
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert';

const CreateClient = () => {

    const [values, setValues] = useState({
        dni: '',
        password: '',
        name: '',
        lastname: '',
        address: '',
        email: '',
        phone: ''
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/CreateClient',values)
        .then(res => {
            swal({
                text: "Cliente registrado",
                icon: "success",
              });
              setTimeout(function(){
                navigate('/');
            }, 3000);
            
        })
        .catch(err => console.log(err))
    }

return(
<>
<Header/>

<div className="client">
            <div className="form-container">
            <h1 className="title">Registrar Cliente</h1>

            <form action="/" className="form" onSubmit={handleSubmit}>
                <label for="name" className="label">Nombres</label>
                <input type="text" id="name" placeholder="" className="input input-text" onChange={e => setValues({...values,name: e.target.value})}/>

                <label for="name" className="label">Apellidos</label>
                <input type="text" id="lastname" placeholder="" className="input input-text" onChange={e => setValues({...values,lastname: e.target.value})}/>

                <label for="name" className="label">DNI</label>
                <input type="text" id="dni" placeholder="" className="input input-text" onChange={e => setValues({...values,dni: e.target.value})}/>

                <label for="name" className="label">Dirección</label>
                <input type="text" id="address" placeholder="" className="input input-text" onChange={e => setValues({...values,address: e.target.value})}/>

                <label for="email" className="label">Email</label>
                <input type="text" id="email" placeholder="" className="input input-email" onChange={e => setValues({...values,email: e.target.value})}/>

                <label for="name" className="label">N° de celular</label>
                <input type="text" id="phone" placeholder="" className="input input-text" onChange={e => setValues({...values,phone: e.target.value})}/>

                <input type="submit" value="Registrar" className="primary-button"/> 
                <input type="button" value="Descartar" className="secondary-button"/>
                               
            </form>
            </div>
        </div>
        </>
)
}


export default CreateClient