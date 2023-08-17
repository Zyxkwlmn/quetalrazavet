import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/Client.scss';
import {useNavigate, useParams} from 'react-router-dom';
import swal from 'sweetalert';

const EditAppo = () => {
    const {id} = useParams();
    
    //Listar servicio
    const [service, setService] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/ListVetService')
        .then(res => setService(res.data))
        .catch(err => console.log(err));
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8080/ReadAppo/'+id)
        .then(res => {
            console.log(res)
            setValues({...values, 
                namePet: res.data[0].namePet,
                service:res.data[0].idVetServices,
                dateAppo:res.data[0].dateAppointment,
                timeAppo:res.data[0].timeAppointment,
                comment:res.data[0].commentAppointment,
                status:res.data[0].statusAppointment});
        }).catch(err => console.log(err))
    }, [])

    const [values, setValues] = useState({
        namePet: '',
        service: '',
        dateAppo: '',
        timeAppo: '',
        comment: '',
        status: 'Agendado'
    })

    const navigate = useNavigate();

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8080/UpdateAppo/'+id, values)
        .then(res => {
            swal({
                text: "Registro de cita actualizada",
                icon: "success",
              });
              setTimeout(function(){
                navigate('/ListAppo');
            }, 3000);
        }).catch(err => console.log(err))
    }
return(
    <>
    <Header />
<div className="client">
            <div className="form-container">
            <h1 className="title">Editar Cita</h1>

            <form action="/" className="form" onSubmit={handleUpdate}>
            <div> 
                <label for="name" className="label">Mascota</label>
                <input type="text" id="namePet" className="input input-text" value={values.namePet}/>
                
                <label for="name" className="label">Fecha</label>
                <input type="date" id="dateAppo" className="input input-text" onChange={e => setValues({...values,dateAppo: e.target.value})} value={values.dateAppo}/>
                
                <label for="name" className="label">Hora</label>
                <input type="time" id="timeAppo" className="input input-text" onChange={e => setValues({...values,timeAppo: e.target.value})} value={values.timeAppo}/>

                <label for="service" className="label">Servicio</label>
                <select id="service" name="service" className="input" onChange={e => setValues({...values,service: e.target.value})} value={values.service}>
                    <option selected>Seleccionar</option>
                    {service.map((ser,index) => {
                        return <option value={ser.idVetServices}>{ser.nameVetServices}</option>
                    })}    
                </select>

                <label for="name" className="label">Comentarios generales</label>
                <input type="text" id="comment" className="input input-text" onChange={e => setValues({...values,comment: e.target.value})} value={values.comment}/>

                <input type="submit" value="Registrar" className="primary-button"/> 
                <input type="button" value="Descartar" className="secondary-button"/>

                </div>
                               
            </form>
            </div>
        </div>
        </> 
)
}

export default EditAppo;