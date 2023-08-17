import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/Client.scss';
import {useNavigate, useParams} from 'react-router-dom';
import swal from 'sweetalert';
import DemoApp from '../components/DemoApp.jsx';
import '../styles/index.css';

const CreateVaccine= () => {
    const {id} = useParams();

    //Listar datos de mascota
    const [dataPet, setDataPet] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/ListDataPet/'+id)
        .then(res => setDataPet(res.data))
        .catch(err => console.log(err));
    }, [])

    //Mostrar nombre mascota
    useEffect(() => {
        axios.get('http://localhost:8080/ReadPet/'+id)
        .then(res => {
            console.log(res)
            setName({...value,
                idPet: res.data[0].idPet,
                namePet:res.data[0].namePet});
        }).catch(err => console.log(err))
    }, [])

    const [value, setName] = useState({
        idPet: '',
        namePet: ''
    })

    //Listar enfermedades
    const [diases, setDiseases] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/ListDiseases')
        .then(res => setDiseases(res.data))
        .catch(err => console.log(err));
    }, [])    

    //Listar vacunas
    const [vaccine, setVaccine] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/ListVaccines')
        .then(res => setVaccine(res.data))
        .catch(err => console.log(err));
    }, [])  

    //Crear cita
    const [values, setValues] = useState({
        idPet:id,
        service: '',
        dateAppo: '',
        timeAppo: '',
        comment: '',
        status: '1'
    })

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/CreateAppo',values)
        .then(res => {
            swal({
                text: "Cita reservada",
                icon: "success",
              });
              setTimeout(function(){
                navigate('/ListAppo');
            }, 3000);
            
        })
        .catch(err => console.log(err))
    }

return(
<>
<Header />
 <div className="client">
            <div className="form-container">
            <h1 className="title">Registrar Plan de Vacunación</h1>

            <form action="/" className="form" onSubmit={handleSubmit}>
                <div>

                <div>{dataPet.map((pet,index) => {
                        return <span>Nombre mascota: {pet.namePet} <br/>Especie: {pet.nameSpeciePet}</span>

                })} </div>
                
                <label for="peso" className="label">Peso (kg)</label>
                <input type="number" id="peso" className="input input-text" onChange={e => setValues({...values,peso: e.target.value})}/>

                <label for="temperatura" className="label">Temperatura (c°)</label>
                <input type="number" id="temperatura" className="input input-text" onChange={e => setValues({...values,temperatura: e.target.value})}/>
                
                <label for="enfermedades" className="label">Enfermedad</label>
                {diases.map((s,index) => {
                        return <label><input type="checkbox" id="enfermedades" className="input input-name" value={s.idDiseasesPet} onChange={e => setValues({...values,services: e.target.value})}/>{s.nameDiseasesPet}</label>
                })}
                
                <label for="vacuna" className="label">Vacuna</label>
                {vaccine.map((d,index) => {
                        return <label><input type="checkbox" id="vacuna" className="input input-name" value={d.idVaccine} onChange={e => setValues({...values,services: e.target.value})}/>{d.nameVaccine}</label>
                })}
                
                <label for="nextDate" className="label">Próxima cita</label>
                <input type="date" id="nextDate" className="input input-text" onChange={e => setValues({...values,nextDate: e.target.value})}/>

                </div>

                <input type="submit" value="Registrar" className="primary-button"/> 
                <input type="button" value="Descartar" className="secondary-button"/>

            </form>
            </div>
        </div>
    </>
)
}


export default CreateVaccine