'use client';

import { Toast } from '../ts/SweetAlert';
import { SearchUser } from '@/app/api/searchuser/requser';
import { SearchDoctor } from '@/app/api/searchdoctor/reqdoctor';
import { SearchPatient } from '@/app/api/searchpatient/reqpatient';
import { getCheckedCpf } from '../ts/CheckedCpf';
import {
    useEffect,
    useState
} from 'react';
import {
    SubmitHandler,
    useForm
} from 'react-hook-form';
import {
    InputsSearchCpfProps,
    PatDocUserSearchResultProps,
    SearchResult
} from '@/interfaces/interfaces';
import Errors from '../errors/MessageErrors';
import styles from './form.module.css'

export default function SearchForm({ type, searchPatDocUserCpf }: PatDocUserSearchResultProps) {
    const [patdocuserSearch, setPatDocUserSearch] = useState<any>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const { register, handleSubmit, setError, formState: { errors } } = useForm<InputsSearchCpfProps>();

    const onSubmit: SubmitHandler<InputsSearchCpfProps> = async (data: any) => {
        const cpf = data.searchcpf as string;
        if (!getCheckedCpf(cpf)) {
            setError('searchcpf',
                { type: 'focus', message: 'CPF Inválido' },
                { shouldFocus: true }
            );
            return;
        };

        setIsSubmitting(true);
        try {
            const formData = new FormData();
            formData.append('cpf', cpf);
            let result: SearchResult;

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
                default:
                    return;
            };

            setPatDocUserSearch(result);
            const icon = result.Error ? (result.message === 'Usuário não Pode Ser Pesquisado!' ? 'warning' : 'error') : 'success';
            Toast.fire({ icon, title: result.message });
        } catch (error) {
            console.error('Erro:', error);
            Toast.fire({
                icon: 'error',
                title: 'Erro ao Conectar com o Banco!'
            });
        } finally {
            setTimeout(() => setIsSubmitting(false), 3000);
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
            <label htmlFor='searchcpf'>Pesquisar CPF apenas número</label>
            <input
                type='search'
                id='searchcpf'
                placeholder={`${errors.searchcpf
                    ? 'Campo Obrigatório'
                    : ''}`}
                className={`${errors.searchcpf
                    ? styles.required
                    : ''}`}
                {...register('searchcpf', { required: true, maxLength: 11, pattern: /\d{11}/g })}
            />

            {errors.searchcpf && (
                <Errors>{errors.searchcpf.message}</Errors>
            )}
            <input
                type='submit'
                title='Pesquisar Por CPF'
                value={isSubmitting
                    ? 'Aguarde...'
                    : 'Pesquisar'}
                disabled={isSubmitting}
            />
        </form>
    );
}