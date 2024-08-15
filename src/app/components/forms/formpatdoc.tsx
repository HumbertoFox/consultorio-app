'use client';
import styles from './page.module.css';

type PropsName = {
    name?: string
};

export default function FormPatDoc({ name }: PropsName) {
    return (
        <form className={styles.form}>
            {name && <label htmlFor='crm'>CRM
                <input type="number" name='crm' />
            </label>}
            <label htmlFor='cpf'>CPF
                <input type='number' name='cpf' />
            </label>
            <label htmlFor='name'>Name
                <input type='text' name='name' />
            </label>
            <label htmlFor='dateofbirth'>Data de Nascimento
                <input type='date' name='dateofbirth' />
            </label>
            <label htmlFor='tel'>Tel
                <input type='tel' name='tel' />
            </label>
            <label htmlFor='email'>Email
                <input type='email' name='email' />
            </label>
            <label htmlFor='zipecode'>CEP
                <input type='text' name='zipecode' />
            </label>
            <label htmlFor='numresid'>Nº Casa/Edif.
                <input type='text' name='numresid' />
            </label>
            <label htmlFor='street'>Rua/Av/Tav
                <input type='text' name='street' />
            </label>
            <label htmlFor='district'>Bairro/Distrito
                <input type='text' name='district' />
            </label>
            <label htmlFor='city'>Cidade
                <input type='text' name='city' />
            </label>
            <input type='submit' value='Cadastrar' />
        </form>
    );
};