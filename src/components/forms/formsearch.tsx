'use client';
import styles from './page.module.css'
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { SearchPatient } from '@/app/api/searchpatient/reqpatient';
import { SearchDoctor } from '@/app/api/searchdoctor/reqdoctor';
import { SearchUser } from '@/app/api/searchuser/requser';

type Inputs = {
    searchpatient: string;
};

interface Typesearch {
    type: string;
    searchPatDocUserCpf: (patientSearch: any) => void;
};

export default function SearchForm({ type, searchPatDocUserCpf }: Typesearch) {
    const [patdocuserSearch, setPatDocUserSearch] = useState<any>('');
    const { register, handleSubmit, setError, formState: { errors } } = useForm<Inputs>();
    const getCheckedCpf = (data: string) => {
        const isRepeatedCPF = (cpf: string) => {
            const firstDigit = cpf[0];
            return cpf.split('').every(digit => digit === firstDigit);
        };
        if (isRepeatedCPF(data)) {
            return;
        };
        const calculateCheckDigit = (input: string) => {
            let sum = 0;
            for (let i = 0; i < input.length; i++) {
                const digit = input.charAt(i);
                const weight = (input.length + 1 - i);
                sum += Number(digit) * weight;
            };
            const remainder = sum % 11;
            return remainder < 2 ? '0' : (11 - remainder);
        };
        let primaryCheckDigit = calculateCheckDigit(data.substring(0, 9));
        let secondaryCheckDigit = calculateCheckDigit(data.substring(0, 9) + primaryCheckDigit);
        let correctCpf = data.substring(0, 9) + primaryCheckDigit + secondaryCheckDigit;
        return data === correctCpf;
    };
    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const cpf = data.searchpatient;
        if (!getCheckedCpf(cpf)) {
            setError('searchpatient', { type: 'focus' }, { shouldFocus: true });
            return;
        };
        try {
            const formData = new FormData();
            formData.append('cpf', data.searchpatient);

            if (type == 'patient') {
                const result = await SearchPatient(formData);
                setPatDocUserSearch(result);
                console.log(result);
            };
            if (type == 'doctor') {
                const result = await SearchDoctor(formData);
                setPatDocUserSearch(result);
                console.log(result);
            };
            if (type == 'user') {
                const result = await SearchUser(formData);
                setPatDocUserSearch(result);
                console.log(result);
            };
        } catch (error) {
            console.error('Erro', error);
        };
    };
    useEffect(() => {
        searchPatDocUserCpf(patdocuserSearch);
    }, [patdocuserSearch, searchPatDocUserCpf]);

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