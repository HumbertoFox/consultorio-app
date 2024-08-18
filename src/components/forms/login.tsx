'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import styles from './page.module.css';

type Inputs = {
    cpf: string,
    password: string
};

export default function FormLogin() {
    const [ispass, setIspass] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const handlePass = () => setIspass(!ispass);
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='cpf'>CPF
                <input
                    type='number'
                    id='cpf'
                    autoComplete='off'
                    placeholder={`${errors.cpf ? 'Campo Obrigatório' : ''}`}
                    className={`${errors.cpf ? styles.required : ''}`}
                    {...register('cpf', { required: true })}
                />
            </label>
            <div className={styles.divpassword}>
                <label htmlFor='password'>Senha
                    <input
                        type={ispass ? 'text' : 'password'}
                        id='password'
                        autoComplete='off'
                        placeholder={`${errors.password ? 'Campo Obrigatório' : ''}`}
                        className={`${errors.password ? styles.required : ''}`}
                        {...register('password', { required: true })}
                    />
                    <button type='button' onClick={handlePass}>
                        {!ispass && <FontAwesomeIcon icon={faEye} />}
                        {ispass && <FontAwesomeIcon icon={faEyeSlash} />}
                    </button>
                </label>
            </div>
            <input type='submit' title='Entrar' value='Entrar' />
        </form>
    );
};