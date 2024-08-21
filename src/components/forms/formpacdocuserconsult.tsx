'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';
import { viaCepApi } from '@/app/api/viacep';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'next/navigation';
import styles from './form.module.css';
import EventClick from '../modal/eventclick';

type Inputs = {
    cpf?: number;
    name?: string;
    dateofbirth?: number;
    telephone?: string;
    email?: string;
    zipcode?: string;
    residencenumber?: string;
    street?: string;
    district?: string;
    city?: string;
    building?: string;
    buildingblock?: string;
    apartment?: string;
    crm?: number;
    consultdatestart?: string;
    consultdateend?: string;
    observation?: string;
    covenant?: string;
    courtesy?: string;
    particular?: string;
    password?: string;
    passwordchecked?: string;
};

interface PatDocUserSearchResult {
    crm?: number;
    docpatuser?: string;
    buttons?: string;
    searchPatDocUserCpf: {
        cpf: number;
        name: string;
        dateofbirth: number;
        telephone: string;
        email: string;
        zipcode: string;
        residencenumber: string;
        street: string;
        district: string;
        city: string;
        building: string;
        buildingblock: string;
        apartment: string;
        crm: number;
        consultdatestart: string;
        consultdateend: string;
        observation: string;
        covenant: string;
        courtesy: string;
        particular: string;
        password: string;
        passwordchecked: string;
    } | any;
};

interface EventMessage {
    message?: string;
    Error: boolean;
    title?: string;
    onClose?: () => void;
}

export default function FormPacDocUserConsult({ crm, docpatuser, buttons, searchPatDocUserCpf }: PatDocUserSearchResult) {
    const router = useRouter();
    const [ispass, setIspass] = useState(false);
    const [ispasschecked, setIspasschecked] = useState(false);
    const [age, setAge] = useState<number>(0);
    const formattedNow = new Date().toISOString().slice(0, 16);
    const [endDateStart, setEndDateStart] = useState<string>(formattedNow);
    const [radioSelect, setRadioSelect] = useState<string>('house');
    const [selectRadio, setSelectRadio] = useState<string>('covenantradio');
    const [eventAlert, setEventAlert] = useState<EventMessage | null>(null);
    const handlePass = () => setIspass(!ispass);
    const handlePassChecked = () => setIspasschecked(!ispasschecked);
    const { register, handleSubmit, setError, setValue, setFocus, watch, formState: { errors } } = useForm<Inputs>();
    const value = watch('particular');
    const password = watch('password');
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
    const handleEventAlertClose = () => {
        setEventAlert(null);
    };
    const onSubmit: SubmitHandler<Inputs> = (data: any) => {
        const cpf = data.cpf;
        if (!getCheckedCpf(cpf)) {
            setError('cpf', { type: 'focus' }, { shouldFocus: true });
            return;
        };
        console.log(data);
    };
    useEffect(() => {
        const formatValue = formatAsCurrency(value ?? '');
        setValue('particular', formatValue, { shouldValidate: true });
    }, [value, setValue]);
    useEffect(() => {
        setValue('cpf', searchPatDocUserCpf?.cpf)
        setValue('name', searchPatDocUserCpf?.name)
        setValue('dateofbirth', searchPatDocUserCpf?.dateofbirth)
        setValue('telephone', searchPatDocUserCpf?.telephone)
        setValue('email', searchPatDocUserCpf?.email)
        setValue('zipcode', searchPatDocUserCpf?.zipcode)
        setValue('residencenumber', searchPatDocUserCpf?.residencenumber)
        setValue('street', searchPatDocUserCpf?.street)
        setValue('district', searchPatDocUserCpf?.district)
        setValue('city', searchPatDocUserCpf?.city)
        setValue('building', searchPatDocUserCpf?.building)
        setValue('buildingblock', searchPatDocUserCpf?.buildingblock)
        setValue('apartment', searchPatDocUserCpf?.apartment)
        setValue('crm', searchPatDocUserCpf?.crm)
        setValue('consultdatestart', searchPatDocUserCpf?.consultdatestart)
        setValue('consultdateend', searchPatDocUserCpf?.consultdateend)
        setValue('observation', searchPatDocUserCpf?.observation)
        setValue('covenant', searchPatDocUserCpf?.covenant)
        setValue('courtesy', searchPatDocUserCpf?.courtesy)
        setValue('particular', searchPatDocUserCpf?.particular)
        setValue('password', searchPatDocUserCpf?.password)
    }, [searchPatDocUserCpf, setValue]);

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={buttons === 'Remover' ? true : false}>
                {docpatuser === 'doctors' && <label htmlFor='crm'>CRM
                    <input
                        type='number'
                        id='crm'
                        disabled={buttons !== 'Editar' ? true : false}
                        placeholder={`${errors.crm ? 'Campo Obrigatório' : ''}`}
                        className={`${errors.crm ? styles.required : ''}`}
                        {...register('crm', { required: true, maxLength: 11, pattern: /\d{11}/g })}
                    />
                </label>
                }
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
                {radioSelect === 'buildingradio' &&
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
                {docpatuser === 'user' && <div className={styles.divpassword}>
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
                {buttons === 'Agendar' && <div className={styles.radiolabeldiv}>
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
                    {crm === 6733 && <label htmlFor='courtesyradio'>
                        <input
                            type='radio'
                            id='courtesyradio'
                            value='courtesyradio'
                            checked={selectRadio === 'courtesyradio' ? true : false}
                            onChange={swapSelectedRadio}
                        />
                        Cortesia
                    </label>
                    }
                </div>
                }
                {selectRadio === 'covenantradio' && buttons === 'Agendar' && <label htmlFor='covenant'>Covênio
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
                {buttons === 'Agendar' && <label htmlFor='consultdatestart'>Data da Consulta Inicio
                    <input
                        type='datetime-local'
                        id='consultdatestart'
                        min={formattedNow}
                        className={`${errors.consultdatestart ? styles.requireddate : ''}`}
                        {...register('consultdatestart', { required: true, onBlur: (elementDate) => setEndDateStart(elementDate.target.value) })}
                    />
                </label>
                }
                {buttons === 'Agendar' && <label htmlFor='consultdateend'>Data da Consulta Termino
                    <input
                        type='datetime-local'
                        id='consultdateend'
                        min={endDateStart == '' ? formattedNow : endDateStart}
                        className={`${errors.consultdateend ? styles.requireddate : ''}`}
                        {...register('consultdateend', { required: true })}
                    />
                </label>
                }
                {buttons === 'Agendar' && <label htmlFor='observation'>Observações
                    <textarea
                        id='observation'
                        {...register('observation', { value: '...' })}
                    />
                </label>
                }
            </fieldset>
            <div className={styles.divbtn}>
                <input type='submit' title={buttons} value={buttons} />
                {buttons !== 'Agendar' && <button type='button' title='Voltar ao Menu' onClick={() => router.push('/menu')}>Menu</button>}
            </div>
            {eventAlert && <EventClick {...eventAlert} title='Fechar Login' onClose={handleEventAlertClose} />}
        </form >
    );
};