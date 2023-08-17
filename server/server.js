import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'
import path from 'path'
import {fileURLToPath} from 'url';
import multer from 'multer'
import url from 'url';

const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('/public'))

app.use(express.static(path.join(__dirname, '../frontend/build')));

app.get('/*', function(req,res) {

		res.sendFile(path.join(__dirname, '../frontend/build/', 'index.html'));
});

//Conexión a la base de datos
// const db = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "7Urn3r28#",
//     database: "vet"
// })
const db = mysql.createConnection({
        host: "ec2-52-1-92-133.compute-1.amazonaws.com",
        user: "mmjjlxuybnwlpz",
        password: "d53fdc7b72c9a5431b18ba5084a8c6eceb89568876a96f1c4a3f00807ec617bc",
        database: "d2ma71ttubj88i",
        port: "5432"
})

//SUBIR FOTOGRAFIAS
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/images')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})

app.post('/upload', upload.single('file'),(req, res) => {
    console.log(req.file.filename)
    return res.json(req.file.filename)
})


//LOGIN
app.post('/login',(req,res) => {
    const sql = "SELECT * FROM Login WHERE `userLogin` = ? AND `passwordLogin` = ?";
    db.query(sql, [req.body.user,req.body.password],(err,data) => {
        if(err) return res.json("Error")
        if (data.length > 0) {
            const id = data[0].userLogin;
            const token = jwt.sign({id},"jwtSecretKey",{expiresIn: 300})
            return res.json({Login: true, token, data});
        } else {
            return res.json("No record")
        }
        
    })
})


//APPOINTMENT
app.get('/ListAppo/:id',(req,res) => {
    const sql = "SELECT `Appointment`.`idAppointment`, DATE_FORMAT(`Appointment`.`dateAppointment`, '%Y-%m-%d') as dateAppointment, `Appointment`.`reasonAppointment`, `Appointment`.`statusAppointment`,`Appointment`.`timeAppointment` FROM Appointment INNER JOIN Pet ON `Appointment`.`idPet` = `Pet`.`idPet` WHERE `Pet`.`idPet` = ?";
    const id = req.params.id;
    db.query(sql, [id],(err, result) => {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.get('/ListAppoAll',(req,res) => {
    ""
    const sql = "select appointment.idappointment, vetservices.namevetservices,appointment.dateappointment, appointment.timeappointment, client.nameowner, client.surnameowner, client.phoneowner, pet.namepet, pet.idspeciepet,speciepet.namespeciepet, genderpet.namegenderpet,  appointment.statusappointment from appointment inner join pet on appointment.idpet = pet.idpet inner join client on client.dniowner = pet.dniowner inner join speciepet on speciepet.idspeciepet = pet.idspeciepet inner join genderpet on genderpet.idgenderpet = pet.idgenderpet inner join vetservices on vetservices.idvetservices = appointment.idvetservices";
    db.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.get('/ReadAppo/:id',(req,res) => {
    const sql = "SELECT Appointment.idAppointment, Pet.namePet, Pet.idSpeciePet, Pet.idGenderPet, DATE_FORMAT(Appointment.dateAppointment, '%Y-%m-%d') as dateAppointment, Appointment.commentAppointment, Appointment.statusAppointment,Appointment.timeAppointment FROM Appointment INNER JOIN Pet ON Appointment.idPet = Pet.idPet WHERE Appointment.idAppointment = ?";
    const id = req.params.id;
    db.query(sql,[id], (err,result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.post('/CreateAppo', (req,res) => {
    const sql = "INSERT INTO Appointment (idPet, idVetServices, dateAppointment, timeAppointment, commentAppointment,statusAppointment) VALUES (?)";
    const values = [
        req.body.idPet,
        req.body.service,
        req.body.dateAppo,
        req.body.timeAppo,
        req.body.comment,
        req.body.status
    ]

    db.query(sql, [values],(err,result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.put('/UpdateAppo/:id', (req, res) => {
    const sql = "UPDATE Appointment SET  `dateAppointment` = ?, `reasonAppointment` = ?, `commentAppointment` = ?, `statusAppointment` = ?, `timeAppointment` = ? WHERE `idAppointment` = ?";
    const id = req.params.id;
    db.query(sql, [req.body.dateAppo, req.body.reason,req.body.comment, req.body.status,req.body.timeAppo,id],(err,result) =>{
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })   
})

app.delete('/DeleteAppo/:id', (req, res) => {
    const sql = "DELETE FROM Appointment WHERE `idAppointment` = ?";
    const id = req.params.id;
    db.query(sql, [id],(err,result) =>{
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })   
})


//PET



app.get('/ListPet/:id',(req,res) => {
    const sql = "SELECT idPet,dniOwner,namePet, Pet.idSpeciePet, SpeciePet.nameSpeciePet, Pet.idGenderPet, GenderPet.nameGenderPet, idOriginPet,racePet,colorPet,DATE_FORMAT(birthdatePet, '%Y-%m-%d') as birthdatePet, particularsignsPet, photoPet from vet.Pet INNER JOIN SpeciePet ON Pet.idSpeciePet = SpeciePet.idSpeciePet INNER JOIN GenderPet ON Pet.idGenderPet = GenderPet.idGenderPet WHERE Pet.dniOwner = ?";
    const id = req.params.id;
    db.query(sql, [id],(err, result) => {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

//Listar género
app.get('/ListGender',(req,res) => {
    const sql = "SELECT * FROM GenderPet";
    db.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

//Listar Procedencia
app.get('/ListOrigin',(req,res) => {
    const sql = "SELECT * FROM OriginPet";
    db.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

//Listar Especie
app.get('/ListSpecie',(req,res) => {
    const sql = "SELECT * FROM SpeciePet";
    db.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.get('/ReadPet/:id',(req,res) => {
    const sql = "SELECT idPet,dniOwner,namePet,idSpeciePet, idGenderPet, idOriginPet, racePet, colorPet, DATE_FORMAT(birthdatePet, '%Y-%m-%d') as birthdatePet , particularsignsPet, photoPet FROM Pet WHERE idPet = ?";
    const id = req.params.id;
    db.query(sql,[id], (err,result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.post('/CreatePet/:id',(req,res) => {
    const sql = "INSERT INTO Pet (dniOwner,namePet, idSpeciePet,idGenderPet, idOriginPet, racePet,colorPet,birthdatePet,particularsignsPet, photoPet) VALUES (?)";
    const id = req.params.id;
    const values = [
        id,
        req.body.name,
        req.body.specie,
        req.body.gender,
        req.body.origin,
        req.body.race,
        req.body.color,
        req.body.birthday,
        req.body.description,
        req.body.photoFile
    ]

    db.query(sql, [values],(err,result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.put('/UpdatePet/:id', (req, res) => {
    const sql = "UPDATE Pet SET  namePet = ?, idSpeciePet = ?, idGenderPet = ?, idOriginPet = ?, racePet = ?, colorPet = ?, birthdatePet = ?,particularsignsPet = ?, photoPet = ? WHERE idPet = ?";
    const id = req.params.id;
    db.query(sql, [req.body.name,req.body.specie,req.body.gender,req.body.origin,req.body.race,req.body.color,req.body.birthday,req.body.description,req.body.photoFile,id],(err,result) =>{
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })   
})

app.delete('/DeletePet/:id', (req, res) => {
    const sql = "DELETE FROM Pet WHERE idPet = ?";
    const id = req.params.id;
    db.query(sql, [id],(err,result) =>{
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })   
})


//CLIENT
app.get('/',(req,res) => {
    const sql = "select * from Owner";
    db.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.get('/ReadClient/:id',(req,res) => {
    const sql = "SELECT * FROM Owner WHERE dniOwner = ?";
    const id = req.params.id;
    db.query(sql,[id], (err,result) => {
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.post('/CreateClient', (req,res) => {
    const sql = "CALL CreateOwner(?)";
    const values = [
        req.body.dni,
        req.body.name,
        req.body.lastname,
        req.body.address,
        req.body.email,
        req.body.phone
    ]

    db.query(sql,[values],(err,result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

app.put('/UpdateClient/:id', (req, res) => {
    const sql = "UPDATE Owner SET  nameOwner = ?, surnameOwner= ?, addressOwner= ?, emailOwner = ?, phoneOwner = ? WHERE dniOwner = ?";
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.lastname,req.body.address, req.body.email,req.body.phone,id],(err,result) =>{
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })   
})

app.delete('/DeleteClient/:id', (req, res) => {
    const sql = "DELETE FROM Owner WHERE dniOwner = ?";
    const id = req.params.id;
    db.query(sql, [id],(err,result) =>{
        if(err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })   
})

//ATENCIONES
app.post('/CreateHistory/:id', (req,res) => {
    const sql = "INSERT INTO ClinicHistory (`idAppointment`,`symptomsHistory`,`diagnosisHistory`,`treatmentHistory`,`commentHistory`) VALUES (?)";
    const id = req.params.id;
    const values = [
        id,
        req.body.symptoms,
        req.body.diagnosis,
        req.body.treatment,
        req.body.comment,
    ]

    db.query(sql, [values],(err,result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

//SERVICIOS
app.get('/ListVetService',(req,res) => {
    const sql = "SELECT * FROM VetServices";
    db.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

//GROOMING
app.get('/ListDataPet/:id',(req,res) => {
    const sql = "SELECT Appointment.idAppointment, Pet.namePet, SpeciePet.nameSpeciePet FROM vet.Appointment INNER JOIN vet.Pet ON Appointment.idPet = Pet.idPet  INNER JOIN vet.SpeciePet On SpeciePet.idSpeciePet = Pet.idSpeciePet where Appointment.idAppointment = ? ";
    const id = req.params.id;
    db.query(sql,[id], (err,result) => {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.get('/ListServicesGrooming',(req,res) => {
    const sql = "SELECT * FROM ServicesGrooming";
    db.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.post('/CreateGrooming/:id', (req,res) => {
    const sql = "CALL vet.CreateGrooming(?)";
    const id = req.params.id;
    const values = [
        id,
        req.body.xphotoBefore,
        req.body.xphotoAfter,
        req.body.comment,
        req.body.services
    ]

    db.query(sql, [values],(err,result) => {
        if(err) return res.json(err);
        return res.json(result);
    })
})

//PETCARE
app.get('/ListSymptoms',(req,res) => {
    const sql = "SELECT * FROM SymptomsPet";
    db.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.get('/ListDiagnosis',(req,res) => {
    const sql = "SELECT * FROM DiagnosisPet";
    db.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.get('/ListDiseases',(req,res) => {
    const sql = "SELECT * FROM DiseasesPet";
    db.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

app.get('/ListVaccines',(req,res) => {
    const sql = "SELECT * FROM Vaccine";
    db.query(sql, (err, result) => {
        if (err) return res.json({Message: "Error inside server"});
        return res.json(result);
    })
})

const PORT = process.env.PORT || 5001;
//ESCUCHA DEL PUERTO
app.listen(PORT, ()=> {
    console.log("Listening");
})



