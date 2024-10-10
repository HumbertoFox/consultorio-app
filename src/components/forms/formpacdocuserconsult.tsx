'use client';
import { GetCrmY } from '@/app/api/getcrms/crmy';
import { EditUser } from '@/app/api/edituser/requser';
import { viaCepApi } from '@/app/api/searchviacep/viacep';
import { EditDoctor } from '@/app/api/editdoctor/reqdoctor';
import { EditPatient } from '@/app/api/editpatient/reqpatient';
import { BlockedUser } from '@/app/api/blockeduser/requser';
import { RegisterUser } from '@/app/api/registeruser/requser';
import { RegisterDoctor } from '@/app/api/registerdoctor/reqdoctor';
import { RegisterPatient } from '@/app/api/resgisterpatient/reqpatient';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { RegisterConsultation } from '@/app/api/registerconsultation/reqconsultation';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEvent, useEffect, useState } from 'react';
import { InputsProps, PatDocUserSearchResultFormProps } from '@/interfaces/interfaces';
import Link from 'next/link';
import styles from './form.module.css';
import Swal from 'sweetalert2';
export default function FormPacDocUserConsult({ crm, docpatuser, buttons, searchPatDocUserCpf }: PatDocUserSearchResultFormProps) {
    const [crmyEnv, setCrmyEnv] = useState<number>(0);
    const [ispass, setIspass] = useState(false);
    const [ispasschecked, setIspasschecked] = useState(false);
    const [age, setAge] = useState<number>(0);
    const formattedNow = new Date().toISOString().slice(0, 16);
    const [endDateStart, setEndDateStart] = useState<string>(formattedNow);
    const [radioSelect, setRadioSelect] = useState<string>('house');
    const [selectRadio, setSelectRadio] = useState<string>('covenantradio');
    const [isReturn, setIsReturn] = useState<boolean>(false);
    const { register, handleSubmit, setError, setValue, setFocus, watch, reset, formState: { errors } } = useForm<InputsProps>();
    const handlePass = () => setIspass(!ispass);
    const handlePassChecked = () => setIspasschecked(!ispasschecked);
    const value = watch('particular');
    const password = watch('password');
    const getCheckedCpf = (data: string) => {
        const isRepeatedCpf = (cpf: string) => {
            const firstDigit = cpf[0];
            return cpf.split('').every(digit => digit === firstDigit);
        };
        if (isRepeatedCpf(data)) { return; };
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
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Formato de CEP inválido!',
                confirmButtonText: 'OK'
            });
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
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro!',
                        text: 'CEP não encontrado!',
                        confirmButtonText: 'OK'
                    });
                };
            } else {
                clearZipCode();
                setFocus('email');
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: 'Formato de CEP inválido!',
                    confirmButtonText: 'OK'
                });
            };
        } catch (error) {
            console.error(error);
            clearZipCode();
            setFocus('email');
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Formato de CEP inválido ou não encontrado!',
                confirmButtonText: 'OK'
            });
            return;
        };
    };
    const swapRadioSelect = (element: ChangeEvent<HTMLInputElement>) => {
        const selectValue = element.target.value;
        setRadioSelect(selectValue);
    };
    const swapSelectedRadio = (element: ChangeEvent<HTMLInputElement>) => {
        const selectedValue = element.target.value;
        setSelectRadio(selectedValue);
        setValue('courtesy', selectedValue !== 'courtesyradio' ? 'Não' : 'Sim');
    };
    const onSubmit: SubmitHandler<InputsProps> = async (data: any) => {
        const cpf = data.cpf;
        if (!getCheckedCpf(cpf)) {
            setError('cpf', { type: 'focus' }, { shouldFocus: true });
            return;
        };
        try {
            const formData = new FormData();
            Object.keys(data).forEach(key => {
                formData.append(key, data[key as keyof InputsProps]);
            });
            let response;
            switch (docpatuser) {
                case 'patient':
                    response = await RegisterPatient(formData);
                    break;
                case 'editpatient':
                    response = await EditPatient(formData);
                    break;
                case 'doctor':
                    response = await RegisterDoctor(formData);
                    break;
                case 'editdoctor':
                    response = await EditDoctor(formData);
                    break;
                case 'user':
                    response = await RegisterUser(formData);
                    break;
                case 'edituser':
                    response = await EditUser(formData);
                    break;
                case 'blockeduser':
                    response = await BlockedUser(formData);
                    break;
                case 'consultation':
                    response = await RegisterConsultation(formData);
                    break;
            };
            if (response.Error === false) {
                reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Sucesso!',
                    text: response.message,
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro!',
                    text: response.message,
                    confirmButtonText: 'OK'
                });
            };
        } catch (error) {
            console.error('Erro ao Conectar ao Banco:', error);
            Swal.fire({
                icon: 'error',
                title: 'Erro!',
                text: 'Erro ao Conectar com o Banco!',
                confirmButtonText: 'OK'
            });
        };
    };
    useEffect(() => {
        const formatValue = formatAsCurrency(value ?? '0');
        setValue('particular', formatValue, { shouldValidate: true });
    }, [value, setValue]);
    useEffect(() => {
        if (searchPatDocUserCpf) {
            setValue('cpf', searchPatDocUserCpf.cpf);
            setValue('name', searchPatDocUserCpf.name);
            setValue('dateofbirth', searchPatDocUserCpf.dateofbirth);
            setValue('telephone', searchPatDocUserCpf.telephone);
            setValue('email', searchPatDocUserCpf.email);
            setValue('zipcode', searchPatDocUserCpf.zipcode);
            setValue('residencenumber', searchPatDocUserCpf.residencenumber);
            setValue('typeresidence', searchPatDocUserCpf.typeresidence);
            setValue('street', searchPatDocUserCpf.street)
            setValue('district', searchPatDocUserCpf.district);
            setValue('city', searchPatDocUserCpf.city);
            setValue('building', searchPatDocUserCpf.building);
            setValue('buildingblock', searchPatDocUserCpf.buildingblock);
            setValue('apartment', searchPatDocUserCpf.apartment);
            { !crm && setValue('crm', searchPatDocUserCpf.crm); };
            setValue('consultdatestart', searchPatDocUserCpf.consultdatestart);
            setValue('consultdateend', searchPatDocUserCpf.consultdateend);
            setValue('observation', searchPatDocUserCpf.observation);
            setValue('typeservice', searchPatDocUserCpf.typeservice);
            setValue('covenant', searchPatDocUserCpf.covenant);
            setValue('courtesy', searchPatDocUserCpf.courtesy);
            setValue('particular', searchPatDocUserCpf.particular);
            setValue('password', searchPatDocUserCpf.password);
            setIsReturn(searchPatDocUserCpf.isLastConsultationOld);
            setRadioSelect(searchPatDocUserCpf.typeresidence);
            setSelectRadio(searchPatDocUserCpf.typeservice);
        };
    }, [crm, searchPatDocUserCpf, setValue]);
    useEffect(() => {
        const getCrmEnv = async () => {
            const crmy = await GetCrmY();
            setCrmyEnv(crmy);
        };
        getCrmEnv();
        setValue('crm', crm);
    }, [crm, setValue]);
    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <fieldset disabled={buttons === 'Des/Bloquear' ? true : false}>
                {(docpatuser === 'doctor' || docpatuser === 'consultation' || docpatuser === 'editdoctor') && (
                    <label htmlFor='crm'>CRM
                        <input
                            type='number'
                            id='crm'
                            disabled={(buttons === 'Editar' || buttons === 'Cadastrar') ? false : true}
                            placeholder={`${errors.crm ? 'Campo Obrigatório' : ''}`}
                            className={`${errors.crm ? styles.required : ''}`}
                            {...register('crm', { required: true, maxLength: 4, pattern: /\d{4}/g })}
                        />
                    </label>
                )}
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
                            defaultChecked
                            {...register('typeresidence', { onChange: swapRadioSelect })}
                        />
                        Casa
                    </label>
                    <label htmlFor='buildingradio'>
                        <input
                            type='radio'
                            id='buildingradio'
                            value='buildingradio'
                            {...register('typeresidence')}
                        />
                        Edifício
                    </label>
                </div>
                {radioSelect === 'buildingradio' && (
                    <div className={styles.divbuilding}>
                        <label htmlFor='building'>Nome do Edifício
                            <input
                                type='text'
                                id='building'
                                placeholder={`${errors.building ? 'Campo Obrigatório' : ''}`}
                                className={`${errors.building ? styles.required : ''}`}
                                {...register('building', { required: true })}
                            />
                        </label>
                        <label htmlFor='buildingblock'>Bloco
                            <input
                                type='text'
                                id='buildingblock'
                                {...register('buildingblock')}
                            />
                        </label>
                        <label htmlFor='apartment'>Apartamento
                            <input
                                type='text'
                                id='apartment'
                                placeholder={`${errors.apartment ? 'Campo Obrigatório' : ''}`}
                                className={`${errors.apartment ? styles.required : ''}`}
                                {...register('apartment', { required: true })}
                            />
                        </label>
                    </div>
                )}
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
                {docpatuser === 'user' && (
                    <div className={styles.divpassword}>
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
                )}
                {buttons === 'Agendar' && (
                    <div className={styles.radiolabeldiv}>
                        <label htmlFor='covenantradio'>
                            <input
                                type='radio'
                                id='covenantradio'
                                value='covenantradio'
                                defaultChecked
                                {...register('typeservice', { onChange: swapSelectedRadio })}
                            />
                            Covênio
                        </label>
                        <label htmlFor='particularradio'>
                            <input
                                type='radio'
                                id='particularradio'
                                value='particularradio'
                                {...register('typeservice')}
                            />
                            Particular
                        </label>
                        {crm == crmyEnv && <label htmlFor='courtesyradio'>
                            <input
                                type='radio'
                                id='courtesyradio'
                                value='courtesyradio'
                                {...register('typeservice')}
                            />
                            Cortesia
                        </label>
                        }
                    </div>
                )}
                {selectRadio === 'covenantradio' && buttons === 'Agendar' && (
                    <label htmlFor='covenant'>Covênio
                        <input
                            type='text'
                            id='covenant'
                            placeholder={`${errors.covenant ? 'Campo Obrigatório' : ''}`}
                            className={`${errors.covenant ? styles.required : ''}`}
                            {...register('covenant', { required: true })}
                        />
                    </label>
                )}
                {selectRadio === 'particularradio' && (
                    <label htmlFor='particular'>Valor
                        <input
                            type='text'
                            id='particular'
                            {...register('particular', { value: '0' })}
                        />
                    </label>
                )}
                {selectRadio === 'courtesyradio' && (
                    <label htmlFor='courtesy'>Cortesia
                        <input
                            type='text'
                            id='courtesy'
                            disabled={true}
                            placeholder={`${errors.courtesy ? 'Campo Obrigatório' : ''}`}
                            className={`${errors.courtesy ? styles.required : ''}`}
                            {...register('courtesy', { required: true, value: 'Não' })}
                        />
                    </label>
                )}
                {isReturn && (
                    <label htmlFor='returnconsult'>Volta/Retorno
                        <select
                            {...register('returnconsult')}>
                            <option value='yes'>Sim</option>
                            <option value='no'>Não</option>
                        </select>
                    </label>
                )}
                {buttons === 'Agendar' && (
                    <label htmlFor='consultdatestart'>Data da Consulta Inicio
                        <input
                            type='datetime-local'
                            id='consultdatestart'
                            min={formattedNow}
                            className={`${errors.consultdatestart ? styles.requireddate : ''}`}
                            {...register('consultdatestart', { required: true, onBlur: (elementDate) => setEndDateStart(elementDate.target.value) })}
                        />
                    </label>
                )}
                {buttons === 'Agendar' && (
                    <label htmlFor='consultdateend'>Data da Consulta Termino
                        <input
                            type='datetime-local'
                            id='consultdateend'
                            min={endDateStart == '' ? formattedNow : endDateStart}
                            className={`${errors.consultdateend ? styles.requireddate : ''}`}
                            {...register('consultdateend', { required: true })}
                        />
                    </label>
                )}
                {buttons === 'Agendar' && (
                    <label htmlFor='observation'>Observações
                        <textarea
                            id='observation'
                            {...register('observation', { value: '...' })}
                        />
                    </label>
                )}
            </fieldset>
            {docpatuser === 'blockeduser' && (
                <div className={styles.radiolabeldivuser}>
                    <label htmlFor='userblock'>
                        <input
                            type='radio'
                            value='true'
                            id='userblock'
                            {...register('userblock')}
                        />
                        Bloquear
                    </label>
                    <label htmlFor='userunblock'>
                        <input
                            type='radio'
                            value='false'
                            id='userunblock'
                            defaultChecked
                            {...register('userblock')}
                        />
                        Desbloquear
                    </label>
                </div>
            )}
            <div className={styles.divbtn}>
                <input type='submit' title={buttons} value={buttons} />
                {buttons !== 'Agendar' && (
                    <Link href={'/menu'} title='Voltar ao Menu' aria-label='Voltar ao Menu'>Menu</Link>
                )}
            </div>
        </form >
    );
};