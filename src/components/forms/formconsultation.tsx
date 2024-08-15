'use client';
import { SubmitHandler, useForm } from 'react-hook-form';
import styles from './page.module.css';

type Inputs = {
    cpf: string,
    cpfRequired: string
}

export default function FormConsultation() {

    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>();
    const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

    return (
        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <label htmlFor='cpf'>CPF</label>
            <input
                type='number'
                id='cpf'
                placeholder={`${errors.cpf ? 'Campo Obrigatório' : ''}`}
                className={`${errors.cpf ? styles.required : ''}`}
                {...register("cpf", { required: true, maxLength: 11, pattern: /\d{11}/g })} />
            <label htmlFor='name'>Nome</label>
            <input type='text' id='name' />
            <label htmlFor='dateofbirth'>Data de Nascimento</label>
            <input type='date' id='dateofbirth' />
            <label htmlFor='telephone'>Telefone</label>
            <input type='tel' id='telephone' />
            <label htmlFor='email'>Email</label>
            <input type='email' id='email' />
            <label htmlFor='zipcode'>CEP</label>
            <input type='number' id='zipcode' />
            <label htmlFor='street'>Logradouro Av/Travessa/Rua</label>
            <input type='text' id='street' />
            <label htmlFor='residencenumber'>Número da Casa/Edifício</label>
            <input type='text' id='residencenumber' />
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
            <input type='text' id='building' />
            <label htmlFor='buildingblock'>Bloco</label>
            <input type='text' id='buildingblock' />
            <label htmlFor='apartment'>Apartamento</label>
            <input type='text' id='apartment' />
            <label htmlFor='district'>Bairro/Distrito</label>
            <input type='text' id='district' />
            <label htmlFor='city'>Cidade</label>
            <input type='text' id='city' />
            <label htmlFor='crm'>CRM</label>
            <input type='number' id='crm' disabled={true} />
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
            <input type='datetime-local' id='consultdatestart' />
            <label htmlFor='consultdateend'>Data da Consulta Termino</label>
            <input type='datetime-local' id='consultdateend' />
            <label htmlFor='observation'>Observações</label>
            <textarea id='observation' />
            <input type='submit' title='Agendar Consulta' value='Agendar' />
        </form >
    );
};