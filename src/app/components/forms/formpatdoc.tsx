'use client';
import styles from './page.module.css';

type PropsName = {
    name?: string
};

export default function FormPatDoc({ name }: PropsName) {
    return (
        <form className={styles.form}>
            {name && <label htmlFor='crm'>CRM
                <input type="number" id='crm' />
            </label>}
            <label htmlFor='cpf'>CPF
                <input type='number' id='cpf' />
            </label>
            <label htmlFor='name'>Name
                <input type='text' id='id' />
            </label>
            <label htmlFor='dateofbirth'>Data de Nascimento
                <input type='date' id='dateofbirth' />
            </label>
            <label htmlFor='tel'>Tel
                <input type='tel' id='tel' />
            </label>
            <label htmlFor='email'>Email
                <input type='email' id='email' />
            </label>
            <label htmlFor='zipecode'>CEP
                <input type='text' id='zipecode' />
            </label>
            <label htmlFor='numresid'>Nº Casa/Edif.
                <input type='text' id='numresid' />
            </label>
            <label htmlFor='street'>Rua/Av/Tav
                <input type='text' id='street' />
            </label>
            <label htmlFor='district'>Bairro/Distrito
                <input type='text' id='district' />
            </label>
            <label htmlFor='city'>Cidade
                <input type='text' id='city' />
            </label>
            <input type='submit' value='Cadastrar' />
        </form>
    );
};