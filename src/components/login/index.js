import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Button, Form, Collapse, Alert } from 'react-bootstrap';
import { useForm } from "react-hook-form";
import { useFirebaseContext } from '../../context/firebaseContext';
import { useCartContext } from '../../context/cartContext';
import './login.css';

const Login = () => {
    const [error, setError] = useState('');
    const [open, setOpen] = useState(false);

    const { register, handleSubmit, watch, errors } = useForm();
    const { loginUser } = useFirebaseContext();
    const { setUser } = useCartContext();
    
    const history = useHistory();
    const onSubmitLogin = (data) => {
        setError('');
        setOpen(false);
        let userData = data;
        loginUser(userData).then( (result) => {
            console.log(result);
            if (result.id) {
                setUser(result);
                history.push("/");
            }
        })
        .catch((error) => {
            setError(error)
            setOpen(true);
        });
    };

    return (
        <Form className="form-login" onSubmit={handleSubmit(onSubmitLogin)}>
            <p className="before-login-text">Bienvenido! Inicia sesión en tu cuenta.</p>
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
                Ingresar
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

export default Login;