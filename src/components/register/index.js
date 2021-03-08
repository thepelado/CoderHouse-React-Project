import React, { useState } from 'react';
import { Button, Form, Collapse, Alert } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useHistory } from 'react-router-dom';
import { useFirebaseContext } from '../../context/firebaseContext';
import { useCartContext } from '../../context/cartContext';
import './register.css';

const Register = () => {
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);
    const { cart, setUser } = useCartContext();
    const { registerUser } = useFirebaseContext();
    const { register, handleSubmit, watch, errors } = useForm();
    const [ btnSubmit, setBtnSubmit ] = useState('Registrar');
    const history = useHistory();

    const onSubmitRegister = (data) => {
        let userData = data;
        registerUser(userData).then( (result) => {
            if (result.id) {
                setUser(result);
                if (cart.length > 0) {
                    history.push('/cart');
                } else {
                    history.push('/');
                }
            } else {
                console.error('Error al almacenar el usuario');
            }
        })
        .catch((error) => {
            console.error(error)
            setError(error);
        });
    };


    return (
        <Form className="form-register" onSubmit={handleSubmit(onSubmitRegister)}>
            <p className="before-register-text">Crea una cuenta nueva hoy.</p>
            <p className={`form-row ${errors.email ? 'error' : ''}`}>
				<label htmlFor="nombre">Nombre y Apellido</label>
                <input name="nombre"
                    ref={register({
                    required: "Campo requerido",
                    })} type="text"
                />
                {errors.nombre && <span>* {errors.nombre}</span>} 
            </p>
            <p className={`form-row ${errors.phone ? 'error' : ''}`}>
				<label htmlFor="phone">Teléfono</label>
                <input name="phone"
                    ref={register({
                    required: "Campo requerido",
                    })} type="text"
                />
                {errors.phone && <span>* {errors.phone}</span>} 
            </p>
            <p className={`form-row ${errors.email ? 'error' : ''}`}>
				<label htmlFor="email">Correo electrónico</label>
                <input
                    name="email"
                    ref={register({
                    required: "Campo requerido",
                    pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Ingrese un email válido"
                    }
                    })}
                    type="email"
                />
                {errors.email && <span>* {errors.email.message}</span>} 
            </p>
            <p className={`form-row ${errors.password ? 'error' : ''}`}>
				<label htmlFor="password">Contraseña</label>			
                <input name="password" ref={register({ required: true })} type="password" autoComplete="current-password"/>
                {errors.password && <span>* Campo requerido</span>}        
            </p>
            <Button className="w-100" variant="primary" type="submit">
                { btnSubmit }
            </Button>
            {error && 
                <Collapse in={open}>
                    <Alert variant="danger" className="w-100">
                        {error}
                    </Alert>
                </Collapse>
            }
        </Form>
    )
}

export default Register;