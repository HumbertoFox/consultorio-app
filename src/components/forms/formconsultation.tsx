'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useState } from 'react';
import { viaCepApi } from '@/api/viacep';
import styles from './page.module.css';

type Inputs = {
    cpf: string,
    name: string,
    dateofbirth: number,
    telephone: string,
    email: string,
    zipcode: string,
    residencenumber: string,
    street: string,
    district: string,
    city: string,
    building: string,
    buildingblock: string,
    apartment: string,
    crm: number,
    consultdatestart: string,
    consultdateend: string,
    observation: string
}

export default function FormConsultation() {
    const [age, setAge] = useState<number>(0);
    const formattedNow = new Date().toISOString().slice(0, 16);
    const [endDateStart, setEndDateStart] = useState(formattedNow);
    const { register, handleSubmit, setError, setValue, setFocus, formState: { errors } } = useForm<Inputs>();
    const getCheckedCpf = (data: string) => {
        const isRepeatedCpf = (cpf: string) => {
            const firstDigit = cpf[0];
            return cpf.split('').every(digit => digit === firstDigit);
        };
        if (isRepeatedCpf(data)) {
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
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const cpf = data.cpf;
        if (!getCheckedCpf(cpf)) {
            setError('cpf', { type: 'focus' }, { shouldFocus: true });
            return;
        };
        console.log(data)
    };
    const calculateAge = (data: string) => {
        const birthDate = new Date(data);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        };
        return age;
    };
    const handleDateChange = (element: ChangeEvent<HTMLInputElement>) => {
        const data = element.target.value;
        if (data) {
            const calculatedAge = calculateAge(data);
            setAge(calculatedAge);
        } else {
            setAge(0);
        };
    };
    const checkedZipCode = async (element: ChangeEvent<HTMLInputElement>) => {
        const clearZipCode = () => {
            setValue('zipcode', '');
            setValue('street', '');
            setValue('district', '');
            setValue('city', '');
        };
        if (!element.target.value) {
            clearZipCode();
            setFocus('email');
            alert('Formato de CEP inválido.');
            return;
        };
        const zipcode = element.target.value.replace(/\D/g, '');
        var validazipcode = /^[0-9]{8}$/;
        try {
            if (validazipcode.test(zipcode)) {
                const data = await viaCepApi.get(`${zipcode}/json/`)
                    .then(res => res.data);
                if (data && !data.erro) {
                    setValue('street', data.logradouro);
                    setValue('district', data.bairro);
                    setValue('city', data.localidade);
                    setFocus('residencenumber');
                } else {
                    clearZipCode();
                    setFocus('email');
                    alert('CEP não encontrado.');
                }
            } else {
                clearZipCode();
                setFocus('email');
                alert('Formato de CEP inválido.');
            }
        } catch (error) {
            console.error(error);
            clearZipCode();
            setFocus('email');
            alert(`Formato de CEP inválido ou não encontrado.`);
            return;
        }
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='cpf'>CPF</label>
            <input
                type='number'
                id='cpf'
                placeholder={`${errors.cpf ? 'Campo Obrigatório' : ''}`}
                className={`${errors.cpf ? styles.required : ''}`}
                {...register('cpf', { required: true, maxLength: 11, pattern: /\d{11}/g })}
            />
            <label htmlFor='name'>Nome</label>
            <input
                type='text'
                id='name'
                placeholder={`${errors.name ? 'Campo Obrigatório' : ''}`}
                className={`${errors.name ? styles.required : ''}`}
                {...register('name', { required: true, pattern: /[A-Za-z]{5}/g })}
            />
            <div className={styles.divage}>
                <div>
                    <label htmlFor='dateofbirth'>Data de Nascimento</label>
                    <input
                        type='date'
                        id='dateofbirth'
                        className={`${errors.dateofbirth ? styles.requireddate : ''}`}
                        {...register('dateofbirth', { required: true, onChange: handleDateChange })}
                    />
                </div>
                <div>
                    <p>{age}</p>
                    <p>anos</p>
                </div>
            </div>
            <label htmlFor='telephone'>Telefone</label>
            <input
                type='tel'
                id='telephone'
                placeholder={`${errors.telephone ? 'Campo Obrigatório' : ''}`}
                className={`${errors.telephone ? styles.required : ''}`}
                {...register('telephone', { required: true, maxLength: 11, pattern: /\d{11}/g })}
            />
            <label htmlFor='email'>Email</label>
            <input
                type='email'
                id='email'
                placeholder={`${errors.email ? 'Campo Obrigatório' : ''}`}
                className={`${errors.email ? styles.required : ''}`}
                {...register('email', { required: true })}
            />
            <label htmlFor='zipcode'>CEP</label>
            <input
                type='number'
                id='zipcode'
                {...register('zipcode', { required: true, onBlur: checkedZipCode })}
            />
            <label htmlFor='street'>Logradouro Av/Travessa/Rua</label>
            <input
                type='text'
                id='street'
                placeholder={`${errors.street ? 'Campo Obrigatório' : ''}`}
                className={`${errors.street ? styles.required : ''}`}
                {...register('street', { required: true })}
            />
            <label htmlFor='residencenumber'>Número da Casa/Edifício</label>
            <input
                type='text'
                id='residencenumber'
                placeholder={`${errors.residencenumber ? 'Campo Obrigatório' : ''}`}
                className={`${errors.residencenumber ? styles.required : ''}`}
                {...register('residencenumber', { required: true })}
            />
            <div className={styles.radiolabeldiv}>
                <label htmlFor='house'>
                    <input type='radio' name='house' id='house' value='house' />
                    Casa
                </label>
                <label htmlFor='buildingradio'>
                    <input type='radio' name='house' id='buildingradio' value='buildingradio' />
                    Edifício
                </label>
            </div>
            <label htmlFor='building'>Nome do Edifício</label>
            <input
                type='text'
                id='building'
                {...register('building', { required: true, value: '...' })}
            />
            <label htmlFor='buildingblock'>Bloco</label>
            <input
                type='text'
                id='buildingblock'
                {...register('buildingblock', { required: true, value: '...' })}
            />
            <label htmlFor='apartment'>Apartamento</label>
            <input
                type='text'
                id='apartment'
                {...register('apartment', { required: true, value: '...' })}
            />
            <label htmlFor='district'>Bairro/Distrito</label>
            <input
                type='text'
                id='district'
                placeholder={`${errors.district ? 'Campo Obrigatório' : ''}`}
                className={`${errors.district ? styles.required : ''}`}
                {...register('district', { required: true })}
            />
            <label htmlFor='city'>Cidade</label>
            <input
                type='text'
                id='city'
                placeholder={`${errors.city ? 'Campo Obrigatório' : ''}`}
                className={`${errors.city ? styles.required : ''}`}
                {...register('city', { required: true })}
            />
            <label htmlFor='crm'>CRM</label>
            <input
                type='number'
                id='crm'
                disabled={true}
                {...register('crm')}
            />
            <div className={styles.radiolabeldiv}>
                <label htmlFor='planradio'>
                    <input type='radio' id='planradio' name='planradio' value='planradio' />
                    Covênio
                </label>
                <label htmlFor='particularradio'>
                    <input type='radio' id='particularradio' name='planradio' value='particularradio' />
                    Particular
                </label>
                <label htmlFor='courtesyradio'>
                    <input type='radio' id='courtesyradio' name='planradio' value='courtesyradio' />
                    Cortesia
                </label>
            </div>
            <label htmlFor='covenant'>Covênio</label>
            <input type='text' id='covenant' />
            <label htmlFor='particular'>Valor</label>
            <input type='text' id='particular' />
            <label htmlFor='courtesy'>Cortesia</label>
            <input type='text' id='courtesy' />
            <label htmlFor='consultdatestart'>Data da Consulta Inicio</label>
            <input
                type='datetime-local'
                id='consultdatestart'
                min={formattedNow}
                className={`${errors.consultdatestart ? styles.requireddate : ''}`}
                {...register('consultdatestart', { required: true, onBlur: (elementDate) => setEndDateStart(elementDate.target.value) })}
            />
            <label htmlFor='consultdateend'>Data da Consulta Termino</label>
            <input
                type='datetime-local'
                id='consultdateend'
                min={endDateStart == '' ? formattedNow : endDateStart}
                className={`${errors.consultdateend ? styles.requireddate : ''}`}
                {...register('consultdateend', { required: true })}
            />
            <label htmlFor='observation'>Observações</label>
            <textarea
                id='observation'
                {...register('observation', { value: '...' })}
            />
            <input type='submit' title='Agendar Consulta' value='Agendar' />
        </form >
    );
};