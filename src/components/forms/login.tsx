'use client';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { loginAuth } from '@/app/modules/auth/actions/authactions';
import { useRouter } from 'next/navigation';
import EventClick from '../modal/eventclick';
import styles from './form.module.css';

type Inputs = {
    cpf: string;
    password: string;
};

interface EventMessage {
    message?: string;
    Error: boolean;
    title?: string;
    onClose?: () => void;
};

export default function FormLogin() {
    const [ispass, setIspass] = useState<boolean>(false);
    const [eventAlert, setEventAlert] = useState<EventMessage | null>(null);
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const router = useRouter();
    const handlePass = () => setIspass(!ispass);
    const handleEventAlertClose = () => {
        setEventAlert(null);
    };
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const formData = new FormData();
            formData.append('cpf', data.cpf);
            formData.append('password', data.password);

            const response = await loginAuth(formData);
            setEventAlert(response);

            if (response.Error === false) {
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            } else {
                setTimeout(() => {
                    window.location.reload();
                    router.push('/login');
                }, 3000);
            };

        } catch (error) {
            console.error('Erro ao Conectar ao Banco:', error);
            setEventAlert({
                Error: true,
                message: 'Erro ao Conectar ao Banco !'
            });
            setTimeout(() => {
                window.location.reload();
                router.push('/login');
            }, 3000);
        };
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
            <input type='submit' title='Entrar' value='Entrar' aria-label='Fechar Login' />
            {eventAlert && <EventClick {...eventAlert} title='Fechar Login' onClose={handleEventAlertClose} />}
        </form>
    );
};