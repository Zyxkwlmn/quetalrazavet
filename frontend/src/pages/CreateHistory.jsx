import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/Client.scss';
import {useNavigate} from 'react-router-dom';
import swal from 'sweetalert';

const CreateHistory = () => {

    const {id} = useParams();

    const [values, setValues] = useState({
        idAppo: id,
        symptoms: '',
        diagnosis: '',
        treatment: '',
        comment: ''
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/CreateHistory/'+id,values)
        .then(res => {
            swal({
                text: "Atención registrada",
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
            <h1 className="title">Registrar Atención</h1>

            <form action="/" className="form" onSubmit={handleSubmit}>
                
                <label for="name" className="label">Sintomas</label>
                <textarea className="textarea" rows="3" id="symptoms" onChange={e => setValues({...values,symptoms: e.target.value})}></textarea>

                <label for="name" className="label">Diagnóstico</label>
                <textarea className="textarea" rows="3" id="diagnosis" onChange={e => setValues({...values,diagnosis: e.target.value})}></textarea>

                <label for="name" className="label">Tratamiento</label>
                <textarea className="textarea" rows="3" id="treatment" onChange={e => setValues({...values,treatment: e.target.value})}></textarea>

                <label for="name" className="label">Comentarios</label>
                <textarea className="textarea" rows="3" id="comment" onChange={e => setValues({...values,comment: e.target.value})}></textarea>

                <input type="submit" value="Registrar" className="primary-button"/> 
                <input type="button" value="Descartar" className="secondary-button"/>
                               
            </form>
            </div>
        </div>
        </>
)}

export default CreateHistory