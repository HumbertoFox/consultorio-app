'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';
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
    observation: string,
    covenant: string,
    courtesy: string,
    particular: string
}

type CrmDoctor = {
    crm: number
}

export default function FormConsultation({ crm }: CrmDoctor) {
    const [age, setAge] = useState<number>(0);
    const formattedNow = new Date().toISOString().slice(0, 16);
    const [endDateStart, setEndDateStart] = useState<string>(formattedNow);
    const [radioSelect, setRadioSelect] = useState<string>('house');
    const [selectRadio, setSelectRadio] = useState<string>('covenantradio');
    const { register, handleSubmit, setError, setValue, setFocus, watch, formState: { errors } } = useForm<Inputs>();
    const value = watch('particular');
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
    const formatAsCurrency = (value: string) => {
        if (!value) return '0';
        const numericalValue = parseFloat(value.replace(/[^\d]/g, '')) / 100;
        return numericalValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        });
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
    const swapRadioSelect = (element: ChangeEvent<HTMLInputElement>) => {
        const selectValue = element.target.value;
        setRadioSelect(selectValue);
        setValue('building', selectValue !== 'buildingradio' ? '...' : '');
        setValue('buildingblock', selectValue !== 'buildingradio' ? '...' : '');
        setValue('apartment', selectValue !== 'buildingradio' ? '...' : '');
    };
    const swapSelectedRadio = (element: ChangeEvent<HTMLInputElement>) => {
        const selectedValue = element.target.value;
        setSelectRadio(selectedValue);
        setValue('courtesy', selectedValue !== 'courtesyradio' ? 'Não' : 'Sim');
        setValue('covenant', selectedValue !== 'covenantradio' ? '...' : '');
    };
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        const cpf = data.cpf;
        if (!getCheckedCpf(cpf)) {
            setError('cpf', { type: 'focus' }, { shouldFocus: true });
            return;
        };
        console.log(data);
    };
    useEffect(() => {
        const formatValue = formatAsCurrency(value);
        setValue('particular', formatValue, { shouldValidate: true });
    }, [value, setValue]);

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='crm'>CRM
                <input
                    type='number'
                    id='crm'
                    disabled={true}
                    {...register('crm', { value: crm })}
                />
            </label>
            <label htmlFor='cpf'>CPF
                <input
                    type='number'
                    id='cpf'
                    placeholder={`${errors.cpf ? 'Campo Obrigatório' : ''}`}
                    className={`${errors.cpf ? styles.required : ''}`}
                    {...register('cpf', { required: true, maxLength: 11, pattern: /\d{11}/g })}
                />
            </label>
            <label htmlFor='name'>Nome
                <input
                    type='text'
                    id='name'
                    placeholder={`${errors.name ? 'Campo Obrigatório' : ''}`}
                    className={`${errors.name ? styles.required : ''}`}
                    {...register('name', { required: true, pattern: /[A-Za-z]{5}/g })}
                />
            </label>
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
            <label htmlFor='telephone'>Telefone
                <input
                    type='tel'
                    id='telephone'
                    placeholder={`${errors.telephone ? 'Campo Obrigatório' : ''}`}
                    className={`${errors.telephone ? styles.required : ''}`}
                    {...register('telephone', { required: true, maxLength: 11, pattern: /\d{11}/g })}
                />
            </label>
            <label htmlFor='email'>Email
                <input
                    type='email'
                    id='email'
                    placeholder={`${errors.email ? 'Campo Obrigatório' : ''}`}
                    className={`${errors.email ? styles.required : ''}`}
                    {...register('email', { required: true })}
                />
            </label>
            <label htmlFor='zipcode'>CEP
                <input
                    type='number'
                    id='zipcode'
                    {...register('zipcode', { required: true, onBlur: checkedZipCode })}
                />
            </label>
            <label htmlFor='street'>Logradouro Av/Travessa/Rua
                <input
                    type='text'
                    id='street'
                    placeholder={`${errors.street ? 'Campo Obrigatório' : ''}`}
                    className={`${errors.street ? styles.required : ''}`}
                    {...register('street', { required: true })}
                />
            </label>
            <label htmlFor='residencenumber'>Número da Casa/Edifício
                <input
                    type='text'
                    id='residencenumber'
                    placeholder={`${errors.residencenumber ? 'Campo Obrigatório' : ''}`}
                    className={`${errors.residencenumber ? styles.required : ''}`}
                    {...register('residencenumber', { required: true })}
                />
            </label>
            <div className={styles.radiolabeldiv}>
                <label htmlFor='house'>
                    <input
                        type='radio'
                        id='house'
                        value='house'
                        checked={radioSelect === 'house' ? true : false}
                        onChange={swapRadioSelect}
                    />
                    Casa
                </label>
                <label htmlFor='buildingradio'>
                    <input
                        type='radio'
                        id='buildingradio'
                        value='buildingradio'
                        checked={radioSelect === 'buildingradio' ? true : false}
                        onChange={swapRadioSelect}
                    />
                    Edifício
                </label>
            </div>
            {radioSelect == 'buildingradio' &&
                <div className={styles.divbuilding}>
                    <label htmlFor='building'>Nome do Edifício
                        <input
                            type='text'
                            id='building'
                            {...register('building', { required: true, value: '...' })}
                        />
                    </label>
                    <label htmlFor='buildingblock'>Bloco
                        <input
                            type='text'
                            id='buildingblock'
                            {...register('buildingblock', { required: true, value: '...' })}
                        />
                    </label>
                    <label htmlFor='apartment'>Apartamento
                        <input
                            type='text'
                            id='apartment'
                            {...register('apartment', { required: true, value: '...' })}
                        />
                    </label>
                </div>
            }
            <label htmlFor='district'>Bairro/Distrito
                <input
                    type='text'
                    id='district'
                    placeholder={`${errors.district ? 'Campo Obrigatório' : ''}`}
                    className={`${errors.district ? styles.required : ''}`}
                    {...register('district', { required: true })}
                />
            </label>
            <label htmlFor='city'>Cidade
                <input
                    type='text'
                    id='city'
                    placeholder={`${errors.city ? 'Campo Obrigatório' : ''}`}
                    className={`${errors.city ? styles.required : ''}`}
                    {...register('city', { required: true })}
                />
            </label>
            <div className={styles.radiolabeldiv}>
                <label htmlFor='covenantradio'>
                    <input
                        type='radio'
                        id='covenantradio'
                        value='covenantradio'
                        checked={selectRadio === 'covenantradio' ? true : false}
                        onChange={swapSelectedRadio}
                    />
                    Covênio
                </label>
                <label htmlFor='particularradio'>
                    <input
                        type='radio'
                        id='particularradio'
                        value='particularradio'
                        checked={selectRadio === 'particularradio' ? true : false}
                        onChange={swapSelectedRadio}
                    />
                    Particular
                </label>
                <label htmlFor='courtesyradio'>
                    <input
                        type='radio'
                        id='courtesyradio'
                        value='courtesyradio'
                        checked={selectRadio === 'courtesyradio' ? true : false}
                        onChange={swapSelectedRadio}
                    />
                    Cortesia
                </label>
            </div>
            {selectRadio === 'covenantradio' && <label htmlFor='covenant'>Covênio
                <input
                    type='text'
                    id='covenant'
                    placeholder={`${errors.covenant ? 'Campo Obrigatório' : ''}`}
                    className={`${errors.covenant ? styles.required : ''}`}
                    {...register('covenant', { required: true })}
                />
            </label>
            }
            {selectRadio === 'particularradio' && <label htmlFor='particular'>Valor
                <input
                    type='text'
                    id='particular'
                    {...register('particular')}
                />
            </label>
            }
            {selectRadio === 'courtesyradio' && <label htmlFor='courtesy'>Cortesia
                <input
                    type='text'
                    id='courtesy'
                    disabled={true}
                    placeholder={`${errors.courtesy ? 'Campo Obrigatório' : ''}`}
                    className={`${errors.courtesy ? styles.required : ''}`}
                    {...register('courtesy', { required: true, value: 'Não' })}
                />
            </label>
            }
            <label htmlFor='consultdatestart'>Data da Consulta Inicio
                <input
                    type='datetime-local'
                    id='consultdatestart'
                    min={formattedNow}
                    className={`${errors.consultdatestart ? styles.requireddate : ''}`}
                    {...register('consultdatestart', { required: true, onBlur: (elementDate) => setEndDateStart(elementDate.target.value) })}
                />
            </label>
            <label htmlFor='consultdateend'>Data da Consulta Termino
                <input
                    type='datetime-local'
                    id='consultdateend'
                    min={endDateStart == '' ? formattedNow : endDateStart}
                    className={`${errors.consultdateend ? styles.requireddate : ''}`}
                    {...register('consultdateend', { required: true })}
                />
            </label>
            <label htmlFor='observation'>Observações
                <textarea
                    id='observation'
                    {...register('observation', { value: '...' })}
                />
            </label>
            <input type='submit' title='Agendar Consulta' value='Agendar' />
        </form >
    );
};