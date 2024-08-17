'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './page.module.css'

type Inputs = {
    searchpatient: string
}

export default function SearchForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
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