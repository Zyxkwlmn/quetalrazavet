import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from '../containers/Layout';
import Login from '../pages/Login';
import Home from '../pages/Home';
import CreateClient from '../pages/CreateClient';
import EditClient from '../pages/EditClient';
import ListPet from '../pages/ListPet';
import CreatePet from '../pages/CreatePet';
import EditPet from '../pages/EditPet';
import CreateAppo from '../pages/CreateAppo';
import ListAppo from '../pages/ListAppo';
import EditAppo from '../pages/EditAppo';
import CreateHistory from '../pages/CreateHistory';
import NotFound from '../pages/NotFound';
import Account from '../containers/Account';
import Landing from '../pages/Landing';
import Calendar from '../pages/index';
import CreateGrooming from '../pages/CreateGrooming';
import CreateCare from '../pages/CreateCare';
import CreateVaccine from '../pages/CreateVaccine';
import CreateMedicine from '../pages/CreateMedicine';
import CreateProduct from '../pages/CreateProduct';
import ListCare from '../pages/ListCare';
import ListInventory from '../pages/ListInventory';
import '../styles/global.css';

const App = () => {

    return(
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route exact path="/" element={<Landing/>}/>
                        <Route exact path="/home" element={<Home/>}/>
                        <Route exact path="/login" element={<Login/>}/>
                        <Route exact path="/calendar" element={<Calendar/>}/>
                        <Route exact path="/CreateClient" element={<CreateClient/>}/>
                        <Route exact path="/EditClient/:id" element={<EditClient/>}/>
                        <Route exact path="/ListPet/:id" element={<ListPet/>}/>
                        <Route exact path="/CreatePet/:id" element={<CreatePet/>}/>
                        <Route exact path="/EditPet/:id" element={<EditPet/>}/>
                        <Route exact path="/CreateAppo/:id" element={<CreateAppo/>}/>
                        <Route exact path="/ListAppo" element={<ListAppo/>}/>
                        <Route exact path="/EditAppo/:id" element={<EditAppo/>}/>
                        <Route exact path="/CreateHistory/:id" element={<CreateHistory/>}/>
                        <Route exact path="/CreateGrooming/:id" element={<CreateGrooming/>}/>
                        <Route exact path="/CreateCare/:id" element={<CreateCare/>}/>
                        <Route exact path="/CreateVaccine/:id" element={<CreateVaccine/>}/>
                        <Route exact path="/CreateMedicine" element={<CreateMedicine/>}/>
                        <Route exact path="/CreateProduct" element={<CreateProduct/>}/>
                        <Route exact path="/ListCare" element={<ListCare/>}/>
                        <Route exact path="/ListInventory" element={<ListInventory/>}/>
                        <Route exact path="account" element={<Account/>}/>
                        <Route path="*" element={<Landing/>}/>
                    </Routes>        
                </Layout>
            </BrowserRouter>
    );
}

export default App;

