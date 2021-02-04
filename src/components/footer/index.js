import { Link } from 'react-router-dom';
import './footer.css';

const Footer = () => {

    return (
        <footer>
            <div className="d-flex flex-column flex-lg-row justify-content-center advantages-container">
                <div className="col-md-2 p-2 advantage">
                    <img src="/assets/img/LIFE_Entrega_inmediata_blank.png" title="Entrega Inmedidata" alt="Entrega Inmediata"/>
                    <h5>Envío inmediato</h5>
                    <p>Miles de productos con <b>entrega inmediata</b>.</p>
                </div>
                <div className="col-md-2 p-2 advantage">
                    <img src="/assets/img/LIFE_Devolucion_blank.png" title="Devolución fácil" alt="Devolución fácil"/>
                    <h5>Devolución fácil</h5>
                    <p>Tu satisfacción como objetivo principal.</p>
                </div>
                <div className="col-md-2 p-2 advantage">
                    <img src="/assets/img/LIFE_financiar.png" title="Financiación instantánea" alt="Financiación instantánea"/>
                    <h5>Financiación instantánea</h5>
                    <p>Sin papeleos y sin letra pequeña.</p>
                </div>
                <div className="col-md-2 p-2 advantage">
                    <img src="/assets/img/LIFE_Servicio_Tecnico.png" title="Asesoramiento técnico" alt="Asesoramiento técnico"/>
                    <h5>Asesoramiento técnico</h5>
                    <p>Contamos con <b>servicio técnico propio</b>.</p>
                </div> 
            </div>
            <div className="d-none d-lg-flex newsletter-container">
                <div className="container">
                    <div className="d-flex flex-row align-items-center ">
                        <div className="d-flex flex-row align-items-center newsletter-content">
                            <h5 className="newsletter-title">Suscríbete a nuestra newsletter</h5>
                            <span className="newsletter-marketing-text">...e infórmate de nuestras ofertas!</span>
                        </div>
                        <div className="d-flex flex-row align-items-center newsletter-form">
                            <input type="email" className="form-control txt-email" data-inputmask="" value="" placeholder="Email" aria-invalid="false"/>                        
                            <button type="button" className="form-control btn-suscribirse">Sucríbete!</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-none d-lg-flex align-items-center container">
                <div className="col-12 col-md-7">
                    <div className="d-flex justify-content-center">
                        <img className="stamp" src="/assets/img/24_years_footer_HQ.png" alt="25 años"/>
                        <img className="stamp" src="/assets/img/lifeinn-min.png" alt="Life Informática"/>
                    </div>
                </div>
                <div className="col-12 col-md-4 social text-center">
                    <h4>Seguinos en nuestras redes</h4>
                    <ul className="d-flex justify-content-center">
                        <li><a href="/#"><i className="fab fa-facebook-f"></i></a></li>
                        <li><a href="/#"><i className="fab fa-twitter"></i></a></li>
                        <li><a href="/#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="/#"><i className="fab fa-linkedin-in"></i></a></li>
                        <li><a href="/#"><i className="fab fa-blogger-b"></i></a></li>
                    </ul>
                </div>
            </div>
            <div className="d-flex flex-column flex-lg-row justify-content-around align-items-center container-fluid copyright">
                <p>© <Link to={`/`} >LIFE Informática</Link> - Todos los derechos reservados.</p>
                <ul className="d-flex cash-card">
                    <li className="card-item">
                        <img className="stamp" src="/assets/img/mastercard1-min-5d52a09a22f2d.png" alt="Master Card"/>
                    </li>
                    <li className="card-item">
                        <img className="stamp" src="/assets/img/visa1-min-5d52a0a61ae5b.png" alt="Visa"/>
                    </li>
                    <li className="card-item">
                        <img className="stamp" src="/assets/img/paypal1-min-5d52a09e2e050.png" alt="Paypal"/>
                    </li>
                    <li className="card-item">
                        <img className="stamp" src="/assets/img/transfe1-min-5d52a0a15b326.png" alt="Transfer Euro"/>
                    </li>
                    <li className="card-item">
                        <img className="stamp" src="/assets/img/logo-aplazame.png" alt="Aplazame"/>
                    </li>
                </ul>
            </div>
        </footer>
    );
}

export default Footer;