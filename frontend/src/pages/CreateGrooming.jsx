import React, { useEffect, useState , Fragment} from 'react';
import Header from '../components/Header';
import axios from 'axios';
import '../styles/Pet.scss';
import {useNavigate,useParams} from 'react-router-dom';
import swal from 'sweetalert';

const CreateGrooming = () => {

    const {id} = useParams();

    //Listar datos de mascota
    const [dataPet, setDataPet] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/ListDataPet/'+id)
        .then(res => setDataPet(res.data))
        .catch(err => console.log(err));
    }, [])

    //Listar servicios de grooming
    const [dataGroo, setDataGroo] = useState([])
    useEffect(()=>{
        axios.get('http://localhost:8080/ListServicesGrooming')
        .then(res => setDataGroo(res.data))
        .catch(err => console.log(err));
    }, [])

    //Subir fotografía
    const [file, setFile] = useState({
        xphoto: '',
        yphoto: ''
    })

    const [image, setImage] = useState({
        photo1: '',
        photo2: ''
    })

    const handleUpload = (e) => {
        
        //PHOTO1
        const formdata = new FormData()
        formdata.append('file', file.xphoto)
        axios.post('http://localhost:8080/upload',formdata)
        .then(function (res) {
            console.log(res.data)
            setImage({...image,photo1: res.data});
            setValues({...values,xphotoBefore: res.data})
            console.log(values)     
        })
        .catch(err => console.log(err))

        //PHOTO2
        const formdata2 = new FormData()
        formdata2.append('file', file.photo2)
        axios.post('http://localhost:8080/upload',formdata2)
        .then(function (res) {
            console.log(res.data)
            setImage({...image,yphoto: res.data});
            setValues({...values,xphotoAfter: res.data})
            console.log(values)  
        })
        .catch(err => console.log(err))
    }

    //Capturar datos
    const [values, setValues] = useState({
        idAppo: id,
        services: '',
        xphotoBefore: '',
        xphotoAfter: '',
        comment: ''   
    })

    //Enviar datos
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/CreateGrooming/'+id,values)
        .then(res => {
            swal({
                text: "Servicio grooming registrado",
                icon: "success",
              });
            //   setTimeout(function(){
            //     navigate('/ListAppo/'+id);
            // }, 3000);
        })
        .catch(err => console.log(err))
    }

return(
<>
<Header />

<div className="pet">
            <div className="form-container">
            <h1 className="title">Registrar Servicio Grooming</h1>

            <form action="/" className="form" onSubmit={handleSubmit}>

                <div>{dataPet.map((pet,index) => {
                        return <span>Nombre mascota: {pet.namePet} <br/>Especie: {pet.nameSpeciePet}</span>

                })} </div>

                <label for="services" className="label">Servicios Grooming</label>
                {dataGroo.map((groo,index) => {
                        return <label><input type="checkbox" id="services" className="input input-name" value={groo.idServicesGrooming} onChange={e => setValues({...values,services: e.target.value})}/>{groo.nameServicesGrooming}</label>
                })}
                
                <label for="photoBefore" className="label">Foto antes</label>
                <input type="file" id="photoBefore" placeholder="" className="file" onChange={e => setFile({...file,photo1: e.target.files[0]})} accept=".jpg, .jpeg, .png"/>
                <img src={`http://localhost:8080/images/`+ image.xphoto} alt="" width="50%"/>

                <label for="photoAfter" className="label">Foto después</label>
                <input type="file" id="photoAfter" placeholder="" className="file" onChange={e => setFile({...file,photo2: e.target.files[0]})} accept=".jpg, .jpeg, .png"/>
                <img src={`http://localhost:8080/images/`+ image.yphoto} alt="" width="50%"/>

                <input type="button" value="Cargar imágenes" className="primary-button" onClick={handleUpload}/> 

                <label for="comment" className="label">Comentarios</label>
                <textarea className="textarea" rows="3" id="comment" onChange={e => setValues({...values,comment: e.target.value})}></textarea>

                <input type="submit" value="Registrar" className="primary-button"/> 
                <input type="button" value="Descartar" className="secondary-button"/>
            </form>
            </div>
        </div>
    </>
)
}


export default CreateGrooming;