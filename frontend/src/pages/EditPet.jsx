import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/Pet.scss';
import {useNavigate, useParams} from 'react-router-dom';
import swal from 'sweetalert';

const EditPet = () => {
    const {id} = useParams();
   
    //Listar género mascota
    const [data, setData] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/ListGender')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

    //Listar procedencia mascota
    const [dataOrigin, setDataOrigin] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/ListOrigin')
        .then(res => setDataOrigin(res.data))
        .catch(err => console.log(err));
    }, [])

    //Listar especie mascota
    const [dataSpecie, setDataSpecie] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/ListSpecie')
        .then(res => setDataSpecie(res.data))
        .catch(err => console.log(err));
    }, [])

    //Leer datos
    useEffect(() => {
        axios.get('http://localhost:8080/ReadPet/'+id)
        .then(res => {
            setValues({...values,
                name:res.data[0].namePet,
                specie:res.data[0].idSpeciePet,
                gender:res.data[0].idGenderPet,
                origin:res.data[0].idOriginPet,
                race:res.data[0].racePet,
                color:res.data[0].colorPet,
                birthday:res.data[0].birthdatePet,
                description:res.data[0].particularsignsPet});
            setImage(res.data[0].photoPet);
        }).catch(err => console.log(err))
    }, [])

    //Subir fotografía
    const [file, setFile] = useState()

    const [image, setImage] = useState()
    
    const handleUpload = (e) => {
        const formdata = new FormData()
        formdata.append('file', file)
        axios.post('http://localhost:8080/upload',formdata)
        .then(function (res) {
            setImage(res.data);
            setValues({...values,photoFile: res.data})
        })
        .catch(err => console.log(err))
    }

    const [values, setValues] = useState({
        name: '',
        specie: '',
        gender: '',
        origin: '',
        race: '',
        color: '',
        birthday: '',
        description: '',
        photoFile: ''
    })

    const navigate = useNavigate();

    const handleUpdate = (event) => {
        event.preventDefault();
        axios.put('http://localhost:8080/UpdatePet/'+id, values)
        .then(res => {
            console.log(res);
            swal({
                text: "Registro de mascota actualizado",
                icon: "success",
              });
            //   setTimeout(function(){
            //     navigate('/');
            // }, 3000);
        }).catch(err => console.log(err))
    }
return(
<>
<Header />

<div className="pet">
            <div className="form-container">
            <h1 className="title">Editar Mascota</h1>

            <form action="/" className="form" onSubmit={handleUpdate}>
            <label for="name" className="label">Nombre</label>
                <input type="text" id="name" className="input input-name" onChange={e => setValues({...values,name: e.target.value})} value={values.name}/>

                <label for="specie" className="label">Especie</label>
                <select id="specie" name="specie" className="input" onChange={e => setValues({...values,specie: e.target.value})} value={values.specie}>
                    <option selected>Seleccionar</option>
                    {dataSpecie.map((specie,index) => {
                        return <option value={specie.idSpeciePet}>{specie.nameSpeciePet}</option>
                    })}  
                </select>

                <label for="gender" className="label">Género</label>
                <select id="gender" name="gender" className="input" onChange={e => setValues({...values,gender: e.target.value})} value={values.gender}>
                    <option selected>Seleccionar</option>
                    {data.map((gen,index) => {
                        return <option value={gen.idGenderPet}>{gen.nameGenderPet}</option>
                    })}    
                </select>

                <label for="origin" className="label">Procedencia</label>
                <select id="origin" name="origin" className="input" onChange={e => setValues({...values,origin: e.target.value})} value={values.origin}>
                    <option selected>Seleccionar</option>
                    {dataOrigin.map((origin,index) => {
                        return <option value={origin.idOriginPet}>{origin.nameOriginPet}</option>
                    })}  
                </select>

                <label for="name" className="label">Raza</label>
                <input type="text" id="race" className="input input-name" onChange={e => setValues({...values,race: e.target.value})} value={values.race}/>

                <label for="name" className="label">Color</label>
                <input type="text" id="color" className="input input-name" onChange={e => setValues({...values,color: e.target.value})} value={values.color}/>

                <label for="name" className="label">Fecha de Nacimiento</label>
                <input type="date" id="birthday" className="input input-name" onChange={e => setValues({...values,birthday: e.target.value})} value={values.birthday}/>

                <label for="name" className="label">Señas particulares</label>
                <textarea className="textarea" rows="3" id="description" onChange={e => setValues({...values,description: e.target.value})} value={values.description}></textarea>

                <label for="photo" className="label">Foto</label>
                <input type="file" id="photo" placeholder="" className="file" onChange={e => setFile(e.target.files[0])} accept=".jpg, .jpeg, .png"/>
                <input type="button" value="Cargar imagen" className="primary-button" onClick={handleUpload}/> 
                <img src={`http://localhost:8080/images/`+ image} alt="" width="50%"/>
                <input type="submit" value="Actualizar" className="primary-button"/> 
                <input type="button" value="Descartar" className="secondary-button"/>
                               
            </form>
            </div>
        </div>
    </>
)
}

export default EditPet;