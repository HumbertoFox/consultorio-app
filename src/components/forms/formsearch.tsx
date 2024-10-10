'use client';
import { SearchUser } from '@/app/api/searchuser/requser';
import { SearchDoctor } from '@/app/api/searchdoctor/reqdoctor';
import { SearchPatient } from '@/app/api/searchpatient/reqpatient';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputsSearchCpfProps, PatDocUserSearchResultProps } from '@/interfaces/interfaces';
import styles from './form.module.css'
import Swal from 'sweetalert2';
export default function SearchForm({ type, searchPatDocUserCpf }: PatDocUserSearchResultProps) {
    const [patdocuserSearch, setPatDocUserSearch] = useState<any>('');
    const { register, handleSubmit, setError, formState: { errors } } = useForm<InputsSearchCpfProps>();
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
    const onSubmit: SubmitHandler<InputsSearchCpfProps> = async (data: any) => {
        const cpf = data.searchcpf as string;
        if (!getCheckedCpf(cpf)) {
            setError('searchcpf', { type: 'focus' }, { shouldFocus: true });
            return;
        };
        try {
            const formData = new FormData();
            formData.append('cpf', cpf);
            let result;
            switch (type) {
                case 'patient':
                    result = await SearchPatient(formData);
                    break;
                case 'doctor':
                    result = await SearchDoctor(formData);
                    break;
                case 'user':
                    result = await SearchUser(formData);
                    break;
            };
            setPatDocUserSearch(result);
            if (result.Error === false) {
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: result.message,
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: result.message,
                    confirmButtonText: 'OK'
                });
            };
        } catch (error) {
            console.error('Erro', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Erro ao Conectar com o Banco!',
                confirmButtonText: 'OK'
            });
        };
    };
    useEffect(() => {
        if (patdocuserSearch) {
            const res = Object.values(patdocuserSearch);
            searchPatDocUserCpf(res[3]);
        };
    }, [patdocuserSearch, searchPatDocUserCpf]);
    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='searchcpf'>Pesquisar</label>
            <input
                type='search'
                id='searchcpf'
                placeholder={`${errors.searchcpf ? 'Campo Obrigatório' : ''}`}
                className={`${errors.searchcpf ? styles.required : ''}`}
                {...register('searchcpf', { required: true, maxLength: 11, pattern: /\d{11}/g })}
            />
            <input type='submit' title='Pesquisar Por CPF' value='Pesquisar' />
        </form>
    );
};