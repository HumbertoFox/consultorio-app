'use client';
import { ChangeEvent, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { viaCepApi } from '@/api/viacep';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
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
    particular: string,
    password: string,
    passwordchecked: string
}

type DocPatUser = {
    docpatuser: string,
    buttons: string
}

export default function FormPatDocUser({ docpatuser, buttons }: DocPatUser) {
    const [age, setAge] = useState<number>(0);
    const [radioSelect, setRadioSelect] = useState<string>('house');
    const [ispass, setIspass] = useState(false);
    const [ispasschecked, setIspasschecked] = useState(false);
    const handlePass = () => setIspass(!ispass);
    const handlePassChecked = () => setIspasschecked(!ispasschecked);
    const { register, handleSubmit, setValue, setFocus, watch, formState: { errors } } = useForm<Inputs>();
    const password = watch('password');
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
    const swapRadioSelect = (element: ChangeEvent<HTMLInputElement>) => {
        const selectValue = element.target.value;
        setRadioSelect(selectValue);
        setValue('building', selectValue !== 'buildingradio' ? '...' : '');
        setValue('buildingblock', selectValue !== 'buildingradio' ? '...' : '');
        setValue('apartment', selectValue !== 'buildingradio' ? '...' : '');
    };
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        console.log(data);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={buttons == 'Remover' ? true : false}>
                {docpatuser === 'doctors' && <label htmlFor='crm'>CRM
                    <input
                        type='number'
                        id='crm'
                        placeholder={`${errors.crm ? 'Campo Obrigatório' : ''}`}
                        className={`${errors.crm ? styles.required : ''}`}
                        {...register('crm', { required: true, maxLength: 11, pattern: /\d{11}/g })}
                    />
                </label>}
                <label htmlFor='cpf'>CPF
                    <input
                        type='number'
                        id='cpf'
                        placeholder={`${errors.cpf ? 'Campo Obrigatório' : ''}`}
                        className={`${errors.cpf ? styles.required : ''}`}
                        {...register('cpf', { required: true, maxLength: 11, pattern: /\d{11}/g })}
                    />
                </label>
                <label htmlFor='name'>Name
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
                {docpatuser == 'user' && <div className={styles.divpassword}>
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
                    <label htmlFor='passwordchecked'>Confirme Senha
                        <input
                            type={ispasschecked ? 'text' : 'password'}
                            id='passwordchecked'
                            autoComplete='off'
                            placeholder={`${errors.passwordchecked ? 'Campo Obrigatório' : ''}`}
                            className={`${errors.passwordchecked ? styles.required : ''}`}
                            {...register('passwordchecked', { required: true, validate: (value) => value === password })}
                        />
                        <button type='button' onClick={handlePassChecked}>
                            {!ispasschecked && <FontAwesomeIcon icon={faEye} />}
                            {ispasschecked && <FontAwesomeIcon icon={faEyeSlash} />}
                        </button>
                    </label>
                </div>
                }
            </fieldset>
            <input type='submit' value={buttons} />
        </form>
    );
};