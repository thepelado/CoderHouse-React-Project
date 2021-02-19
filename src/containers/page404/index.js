import FormSearch from '../../components/searchform';
import './page404.css';

const Page404 = () => {
    return (
        <div className="row page page-404 pt-3 pb-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <img src='/assets/img/Error_404_v2.png' className='logo' alt="Error 404"/>
                    </div>
                    <div className="col-12 col-md-6 text">
                        <h1>Página no encontrada</h1>
						<p className="lead">Vaya, parece que no hemos encontrado nada aquí. Prueba a buscar algo o mira los enlaces más abajo.</p>
                        <hr className="m-y-2"/>
                        <div className="sub-form-row inner-bottom-xs busqueda404">
                            <FormSearch/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page404;