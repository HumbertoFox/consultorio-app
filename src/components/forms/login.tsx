'use client';
import { useState } from 'react';
import { loginAuth } from '@/app/api/modules/actions/auth/authactions';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputsLoginProps } from '@/interfaces/interfaces';
import styles from './form.module.css';
import Swal from 'sweetalert2';
export default function FormLogin() {
    const [ispass, setIspass] = useState<boolean>(false);
    const { register, handleSubmit, formState: { errors } } = useForm<InputsLoginProps>();
    const router = useRouter();
    const handlePass = () => setIspass(!ispass);
    const onSubmit: SubmitHandler<InputsLoginProps> = async (data) => {
        try {
            const formData = new FormData();
            formData.append('cpf', data.cpf);
            formData.append('password', data.password);
            const response = await loginAuth(formData);
            if (response.Error === false) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: response.message,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
                setTimeout(() => {
                    router.push('/');
                }, 3000);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: response.message,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
                setTimeout(() => {
                    window.location.reload();
                    router.push('/login');
                }, 3000);
            };
        } catch (error) {
            console.error('Erro ao Conectar ao Banco:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Erro ao Conectar com o Banco!',
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true
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
            <input type='submit' title='Entrar' value='Entrar' id='entrar' aria-label='Entrar Login' />
        </form>
    );
};