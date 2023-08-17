import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {useNavigate, useParams} from 'react-router-dom';
import '../styles/List.scss';
import swal from 'sweetalert';
// import citas from '@icons/kyc.png';



const ListCare = () => {

    const navigate = useNavigate();
    const {id} = useParams();

    const showSteps = () => {
        swal({
            title: "Pasos para reserva de cita",
            text: "1. Registrar cliente / 2. Ir a mascotas / 3. Registrar mascota / 4. Reservar cita",
            icon: "info",
          });
          setTimeout(function(){
            navigate('/ListAppo');
        }, 3000);
    }

    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/ListAppoAll')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

    const handleDelete = (id) => {
        axios.delete('http://localhost:8080/DeleteAppo/'+id)
        .then(res=> {
            swal({
                text: "Eliminando registro",
                icon: "warning",
              });
              setTimeout(function(){
                location.reload();
            }, 3000);
        }).catch(err => console.log(err))
    }
    return(
        <>
            <Header />
            <div className="list-content">
            <div><h3>Inventario</h3></div>
            <div className="encabezado">
                {/* <div className="imagen"><img src={citas} /></div> */}
            <div>
                <input class="input-inset" type="text" placeholder="Buscar"/>
                <a className="button create-button" onClick={showSteps}>Nueva Medicina</a>

            </div>
            </div>
            
            <div className="list-content">
           <table className="styled-table">
            <thead>
                <tr>
                    <th>N°</th>
                    <th>Nombre producto</th>
                    <th></th>
                    <th>Mascota</th>
                    <th>Especie</th>
                    <th>Género mascota</th>
                    <th>Fecha Cita</th>
                    <th>Hora Cita</th>
                    <th>Motivo</th>
                    <th>Estado</th>
                    <th>Acciones</th>
                </tr>
            </thead>
            <tbody>
                {data.map((appo,index) => {
                    return <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{appo.nameOwner} {appo.surnameOwner}</td>
                        <td>{appo.phoneOwner}</td>
                        <td>{appo.namePet}</td>
                        <td>{appo.nameSpeciePet}</td>
                        <td>{appo.nameGenderPet}</td>
                        <td>{appo.dateAppointment}</td>
                        <td>{appo.timeAppointment}</td>
                        <td>{appo.nameVetServices}</td>
                        <td>{appo.statusAppointment}</td>
                        <td>
                            <Link to={`/CreateHistory/${appo.idAppointment}`} className="button pet-button">Registrar Atención</Link>
                            <Link to={`/EditAppo/${appo.idAppointment}`} className="button edit-button">Editar</Link>
                            <a onClick={() =>handleDelete(appo.idAppointment)} className="button delete-button">Eliminar</a>
                        </td>
                    </tr>
                })}
            </tbody>
           </table>
           </div>
        </div>
            </>  
    );
}

export default ListCare;