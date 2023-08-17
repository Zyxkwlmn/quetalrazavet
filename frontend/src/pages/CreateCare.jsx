import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/Client.scss';
import {useNavigate, useParams} from 'react-router-dom';
import swal from 'sweetalert';
import DemoApp from '../components/DemoApp.jsx';
import '../styles/index.css';

const CreateCare = () => {
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

    //Listar simtomas
    const [sym, setSym] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/ListSymptoms')
        .then(res => setSym(res.data))
        .catch(err => console.log(err));
    }, [])    

    //Listar diagnosticos
    const [diag, setDiag] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/ListDiagnosis')
        .then(res => setDiag(res.data))
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
            <h1 className="title">Registrar Atención Médica</h1>

            <form action="/" className="form" onSubmit={handleSubmit}>
                <div>

                <div>{dataPet.map((pet,index) => {
                        return <span>Nombre mascota: {pet.namePet} <br/>Especie: {pet.nameSpeciePet}</span>

                })} </div>
                
                <label for="anamnesis" className="label">Anamnesis</label>
                <textarea className="textarea" rows="3" id="anamnesis" onChange={e => setValues({...values,anamnesis: e.target.value})}></textarea>

                <label for="peso" className="label">Peso (kg)</label>
                <input type="number" id="peso" className="input input-text" onChange={e => setValues({...values,peso: e.target.value})}/>

                <label for="temperatura" className="label">Temperatura (c°)</label>
                <input type="number" id="temperatura" className="input input-text" onChange={e => setValues({...values,temperatura: e.target.value})}/>
                
                <label for="sintomas" className="label">Síntomas</label>
                {sym.map((s,index) => {
                        return <label><input type="checkbox" id="sintomas" className="input input-name" value={s.idSymptomsPet} onChange={e => setValues({...values,services: e.target.value})}/>{s.nameSymptomsPet}</label>
                })}
                
                <label for="diagnostico" className="label">Diagnóstico</label>
                {diag.map((d,index) => {
                        return <label><input type="checkbox" id="diagnostico" className="input input-name" value={d.idDiagnosisPet} onChange={e => setValues({...values,services: e.target.value})}/>{d.nameDiagnosisPet}</label>
                })}
                
                <label for="tratamiento" className="label">Tratamiento</label>
                <textarea className="textarea" rows="3" id="tratamiento" onChange={e => setValues({...values,tratamiento: e.target.value})}></textarea>

                </div>

                <input type="submit" value="Registrar" className="primary-button"/> 
                <input type="button" value="Descartar" className="secondary-button"/>

            </form>
            </div>
        </div>
    </>
)
}


export default CreateCare