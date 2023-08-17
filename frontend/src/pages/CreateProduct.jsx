import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/Client.scss';
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert';

const CreateProduct= () => {

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
            <h1 className="title">Registrar Producto</h1>

            <form action="/" className="form" onSubmit={handleSubmit}>
                <label for="name" className="label">Nombre</label>
                <input type="text" id="name" placeholder="" className="input input-text" onChange={e => setValues({...values,name: e.target.value})}/>

                <label for="name" className="label">Descripción</label>
                <textarea className="textarea" rows="3" id="description" onChange={e => setValues({...values,description: e.target.value})}></textarea>

                <label for="unite" className="label">Unidad</label>
                <select id="unite" name="unite" className="input" onChange={e => setValues({...values,gender: e.target.value})}>
                    <option selected>Seleccionar</option>
                    <option value="1">UND</option>  
                </select>

                <label for="dueDate" className="label">Fecha de vencimiento</label>
                <input type="date" id="dueDate" placeholder="" className="input input-text" onChange={e => setValues({...values,dueDate: e.target.value})}/>

                <label for="brand" className="label">Marca</label>
                <input type="text" id="brand" placeholder="" className="input input-text" onChange={e => setValues({...values,brand: e.target.value})}/>

                <label for="stock" className="label">Stock inicial</label>
                <input type="number" id="stock" placeholder="" className="input input-email" onChange={e => setValues({...values,stock: e.target.value})}/>

                <input type="submit" value="Registrar" className="primary-button"/> 
                <input type="button" value="Descartar" className="secondary-button"/>
                               
            </form>
            </div>
        </div>
        </>
)
}

export default CreateProduct