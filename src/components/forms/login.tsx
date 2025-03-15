'use client';

import { Toast } from '@/components/ts/SweetAlert';
import { useState } from 'react';
import { loginAuth } from '@/app/api/modules/actions/auth/authactions';
import { useRouter } from 'next/navigation';
import { InputsLoginProps } from '@/interfaces/interfaces';
import {
    SubmitHandler,
    useForm
} from 'react-hook-form';
import Icon from '@/components/Icons/Icons';
import styles from './form.module.css';

export default function FormLogin() {
    const [isPassVisible, setIsPassVisible] = useState<boolean>(false);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm<InputsLoginProps>();
    const router = useRouter();
    const togglePasswordVisibility = () => setIsPassVisible(!isPassVisible);

    const onSubmit: SubmitHandler<InputsLoginProps> = async (data) => {
        setIsSubmitting(true);

        try {
            const formData = new FormData();

            formData.append('cpf', data.cpf);
            formData.append('password', data.password);

            const response = await loginAuth(formData);

            if (response.Error === false) {
                Toast.fire({
                    icon: 'success',
                    title: response.message
                });

                setTimeout(() => router.push('/agenda'), 3000);
            } else {
                Toast.fire({
                    icon: 'error',
                    title: response.message
                });

                setTimeout(() => reset(), 3000);
            };
        } catch (error) {
            console.error('Erro:', error);
            Toast.fire({
                icon: 'error',
                title: 'Erro ao Conectar com o Banco!'
            });

            setTimeout(() => reset(), 3000);
        } finally {
            setTimeout(() => setIsSubmitting(false), 3000);
        };
    };
    return (
        <form
            className={styles.form}
            onSubmit={handleSubmit(onSubmit)}
        >
            <label htmlFor='cpf'>CPF
                <input
                    type='number'
                    id='cpf'
                    autoComplete='off'
                    placeholder={`${errors.cpf
                        ? 'Campo Obrigatório'
                        : ''}`}
                    className={`${errors.cpf
                        ? styles.required
                        : ''}`}
                    {...register('cpf', { required: true, pattern: /^[0-9]{11}$/ })}
                />
            </label>

            <div className={styles.divpassword}>
                <label htmlFor='password'>Senha
                    <input
                        type={isPassVisible
                            ? 'text' :
                            'password'}
                        id='password'
                        autoComplete='off'
                        placeholder={`${errors.password
                            ? 'Campo Obrigatório'
                            : ''}`}
                        className={`${errors.password
                            ? styles.required
                            : ''}`}
                        {...register('password', { required: true, minLength: 6 })}
                    />
                    <button
                        type='button'
                        title={isPassVisible
                            ? 'Não Mostrar Senha'
                            : 'Mostrar Senha'}
                        onClick={togglePasswordVisibility}
                    >
                        <Icon icon={isPassVisible
                            ? 'fa-solid fa-eye-slash'
                            : 'fa-solid fa-eye'}
                        />
                    </button>
                </label>
            </div>

            <input
                id='entrar'
                type='submit'
                title='Entrar'
                value={isSubmitting
                    ? 'Aguarde...'
                    : 'Entrar'}
                aria-label='Entrar Login'
                disabled={isSubmitting}
            />
        </form>
    );
}