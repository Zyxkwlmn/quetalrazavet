import React, {useState} from 'react';
import '../styles/Landing.scss';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import pet1 from '../assets/icons/land/pet1.jpg';
import pet2 from '../assets/icons/land/pet2.jpg';
import {Link} from 'react-router-dom';

const Landing = () => {
    return (
        <><header className="hero">
            <nav className="nav container">
                <div className="nav__logo">
                    <h2 className="nav__title">Veterinaria Que tal Raza Actulizado</h2>
                </div>

                <ul className="nav__link nav__link--menu">
                    <li className="nav__items">
                        <a href="#" className="nav__links">Servicios</a>
                    </li>
                    <li className="nav__items">
                        <a href="#" className="nav__links">Espcialistas</a>
                    </li>
                    <li className="nav__items">
                        <a href="#" className="nav__links">Ubícanos</a>
                    </li>
                    <li className="nav__items">
                        <a href="#" className="nav__links">Preguntas Frecuentes</a>
                    </li>
                    <li className="nav__items">
                        <a href="/Login" className="nav__links">Ingresar</a>
                    </li>
                    <img src="../assets/icons/land/close.svg" className="nav__close" alt="Veterinaria" />
                </ul>

                <div className="nav__menu">
                    <img src="../assets/icons/land/menu.svg" className="nav__img" alt="Veterinaria Huancayo" />
                </div>
            </nav>
            <section className="hero__container container">
                <h1 className="hero__title">Porque la salud de tu mascota no es un juego</h1>
                <p className="hero__paragraph">Ofrecemos servicios de grooming, consultas de especialidad, planes de vacunación, internamientos, tienda para mascotas y mucho más.
                </p>
                <a href="" className="cta">Reserva tu cita ahora</a>
            </section>
        </header><main>
        {/* <section className="container about">
        <h2 className="subtitle">¿Qué servicios ofrecemos?</h2>
        <p className="about__paragraph">Tenemos lo que tu mascota necesita</p>

        <div className="about__main">
            <article className="about__icons">
                <ImageWebp srcWebp={medVet} className="about__icon rounded-circle"/>
                <h3 className="about__title">Medicina Veterinaria</h3>
                <p className="about_paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nam assumenda autem quibusdam.</p>
            </article>

            <article className="about__icons">
                <ImageWebp srcWebp="../assets/icons/land/grooming.webp" className="about__icon rounded-circle"/>
                <h3 className="about__title">Grooming</h3>
                <p className="about_paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nam assumenda autem quibusdam.</p>
            </article>

            <article className="about__icons">
                <ImageWebp srcWebp="../assets/icons/land/petvet.webp" className="about__icon rounded-circle"/>
                <h3 className="about__title">Otros servicios</h3>
                <p className="about_paragraph">Lorem ipsum dolor sit amet consectetur adipisicing elit. Tenetur nam assumenda autem quibusdam.</p>
            </article>
        </div>
    </section> */}

    <section className="staffvet">
        <div className="staffvet__container container">
           <div className="staffvet__texts">
               <h2 className="subtitle"> Nuestros especialistas</h2>
              <p className="staffvet__paragraph"> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi,
                aliquam nemo in facere suscipit at delectus unde labore ad officia iste accusantium eaque
                aperiam laborum est voluptate totam? Modi, obcaecati?</p>
            <a href="#" className="cta">Saber más</a>
            </div>
        </div>
        <figure className="staffvet__picture">
            <img src="" alt="Veterinaria Que tal Raza" className="staffvet__img"/>
        </figure>
    </section>

    <section>
        <div className="container__map container">
             <h2 className="subtitle"> ¿Cómo ubicarnos?</h2>
             <p className="map__paragraph">Conoce las instalaciones de nuestra Clínica Veterinaria y ubícalas con mayor facilidad Actualizado.</p>
            {/*<div className="map">
                 <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d344.8752343636554!2d-75.19323067326577!3d-12.056049078783614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x910e97a5b660aca7%3A0x7adb450dfa7818f!2sVeterinaria%20Que%20Tal%20Raza!5e0!3m2!1ses-419!2spe!4v1687318727858!5m2!1ses-419!2spe" width="100%" height="600" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>*/}
        </div>
    </section>

    <section className="testimony">
        <div className="testimony__container container">
            <img src="../assets/icons/land/leftarrow.svg" className="testimony__arrow" id="before"/>

            <section className="testimony__body testimony__body--show" data-id="1">
                <div className="testimony__texts">
                    <h2 className="subtitle">Metemos algo aqui, <span>Referente a la Veterinaria.</span></h2>
                    <p className="testimony__review">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut est
                        esse, asperiores eaque totam nulla repudiandae quasi, deserunt culpa exercitationem
                        blanditiis laborum veniam laboriosam saepe reiciendis dolorem. Cum, ratione voluptatum!</p>
                </div>

                <figure className="testimony__picture">
                    <img src={pet1} className="testimony__img"/>
                </figure>
            </section>

            <section className="testimony__body" data-id="2">
                <div className="testimony__texts">
                    <h2 className="subtitle">Metemos algo aqui, <span>Referente a la Veterinaria.</span></h2>
                    <p className="testimony__review">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut est
                        esse, asperiores eaque laborum veniam laboriosam saepe reiciendis dolorem. Cum, ratione
                        voluptatum!</p>
                </div>

                <figure className="testimony__picture">
                    <img src={pet2} className="testimony__img"/>
                </figure>
            </section>

            <section className="testimony__body" data-id="3">
                <div className="testimony__texts">
                    <h2 className="subtitle">Metemos algo aqui, <span>Referente a la Veterinaria.</span></h2>
                    <p className="testimony__review">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut est
                        esse, niam laboriosam saepe reiciendis dolorem. Cum, ratione voluptatum!</p>
                </div>

                <figure className="testimony__picture">
                    <img src="../assets/icons/land/pet3.jpg" className="testimony__img"/>
                </figure>
            </section>

            <section className="testimony__body" data-id="4">
                <div className="testimony__texts">
                    <h2 className="subtitle">Metemos algo aqui, <span>Referente a la Veterinaria.</span></h2>
                    <p className="testimony__review">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut est
                        esse, niam laboriosam saepe reiciendis dolorem. Cum, ratione voluptatum!</p>
                </div>

                <figure className="testimony__picture">
                    <img src="../assets/icons/land/pet4.jpg" className="testimony__img"/>
                </figure>
            </section>


            <img src="../assets/icons/land/rightarrow.svg" className="testimony__arrow" id="next"/>
        </div>
    </section>

    <section className="questions container">
        <h2 className="subtitle">Preguntas frecuentes</h2>
        <p className="questions__paragraph">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ea, porro
            doloribus neque perspiciatis sapiente fuga.</p>

        <section className="questions__container">
            <article className="questions__padding">
                <div className="questions__answer">
                    <h3 className="questions__title">Primera pregunta que meteremos
                        <span className="questions__arrow">
                            <img src="../assets/icons/land/arrow.svg" className="questions__img"/>
                        </span>
                    </h3>

                    <p className="questions__show">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
                        facere, quidem eum id excepturi assumenda explicabo nam accusamus veritatis voluptates
                        eveniet adipisci, dicta nihil nemo modi possimus officiis quam atque? Lorem ipsum, dolor sit
                        amet consectetur adipisicing elit. Quos facere, quidem eum id excepturi assumenda explicabo
                        nam accusamus veritatis voluptates eveniet adipisci, dicta nihil nemo modi possimus officiis
                        quam atque?</p>
                </div>
            </article>

            <article className="questions__padding">
                <div className="questions__answer">
                    <h3 className="questions__title">Segunda pregunta que meteremos
                        <span className="questions__arrow">
                            <img src="../assets/icons/land/arrow.svg" className="questions__img"/>
                        </span>
                    </h3>

                    <p className="questions__show">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
                        facere, quidem eum id excepturi assumenda explicabo nam accusamus veritatis voluptates
                        eveniet adipisci, dicta nihil nemo modi possimus officiis quam atque? Lorem ipsum, dolor sit
                        amet consectetur adipisicing elit. Quos facere, quidem eum id excepturi assumenda explicabo
                        nam accusamus veritatis voluptates eveniet adipisci, dicta nihil nemo modi possimus officiis
                        quam atque?</p>
                </div>
            </article>

            <article className="questions__padding">
                <div className="questions__answer">
                    <h3 className="questions__title">Tercera pregunta que meteremos
                        <span className="questions__arrow">
                            <img src="../assets/icons/land/arrow.svg" className="questions__img"/>
                        </span>
                    </h3>

                    <p className="questions__show">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quos
                        facere, quidem eum id excepturi assumenda explicabo nam accusamus veritatis voluptates
                        eveniet adipisci, dicta nihil nemo modi possimus officiis quam atque? Lorem ipsum, dolor sit
                        amet consectetur adipisicing elit. Quos facere, quidem eum id excepturi assumenda explicabo
                        nam accusamus veritatis voluptates eveniet adipisci, dicta nihil nemo modi possimus officiis
                        quam atque?</p>
                </div>
            </article>
        </section>

        <section className="questions__offer">
            <h2 className="subtitle">¿Quieres reservar tu cita ahora?</h2>
            <p className="questions__copy">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Amet ratione
                architecto magnam, officiis ex porro vero est voluptates quaerat quibusdam illo veniam reprehenderit
                eius atque tempora iure ab non autem.</p>
            <a href="#" className="cta">Contactate con nosotros</a>
        </section>
    </section>

    <footer className="footer">
        <section className="footer__container container">
            <nav className="nav nav--footer">
                <h2 className="footer__title">Veterinaria Que tal raza.</h2>    
                <ul className="nav__link nav__link--footer">
                    <li className="nav__items">
                        <a href="#" className="nav__links">Servicios</a>
                    </li>
                    <li className="nav__items">
                        <a href="#" className="nav__links">Espcialistas</a>
                    </li>
                    <li className="nav__items">
                        <a href="#" className="nav__links">Ubícanos</a>
                    </li>
                    <li className="nav__items">
                        <a href="#" className="nav__links">Preguntas Frecuentes</a>
                    </li>
                </ul>
            </nav>

        </section>

        <section className="footer__copy container">
            <div className="footer__social">
                <a href="#" className="footer__icons"><img src="../assets/icons/land/facebook.svg" className="footer__img"/></a>
                <a href="#" className="footer__icons"><img src="../assets/icons/land/whatsapp.svg" className="footer__img"/></a>
            </div>

            <h3 className="footer__copyright">Derechos reservados &copy; Banda del choclito (Carlos, Xio y a lider criminal Mochicienta)</h3>
        </section>
    </footer>
        </main></>
    );
}

export default Landing;