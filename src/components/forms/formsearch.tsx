'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './page.module.css'
import { SearchPatient } from '@/app/api/searchpatient/route';

type Inputs = {
    searchpatient: string
};

interface Typesearch {
    type: string
};

export default function SearchForm({ type }: Typesearch) {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const formData = new FormData();
            formData.append('cpf', data.searchpatient);

            if (type == 'patient') {
                const result = await SearchPatient(formData);
                console.log(result);
            };
        } catch (error) {
            console.error('Erro', error);
        };
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='searchpatient'>Pesquisar</label>
            <input
                type='search'
                id='searchpatient'
                placeholder={`${errors.searchpatient ? 'Campo Obrigatório' : ''}`}
                className={`${errors.searchpatient ? styles.required : ''}`}
                {...register('searchpatient', { required: true, maxLength: 11, pattern: /\d{11}/g })}
            />
            <input type='submit' title='Pesquisar Por CPF' value='Pesquisar' />
        </form>
    );
};