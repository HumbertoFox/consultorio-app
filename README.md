<div align="center">

<a href="https://portfolio-react-betofoxnet-info-projects.vercel.app/"><img src="https://github.com/user-attachments/assets/8e37b052-5c84-4c25-bcb3-56f36e875326" width="150px"/></a>

# BetoFoxNet_Info

</div>

### App para agendamento de consulta exemplo

##

Para rodar localmente.

```bash

npm run dev

```

Tela de Login.

<img src="https://github.com/user-attachments/assets/9a77b493-4afc-4b0c-bf3c-c24eebdc1bef" width="250px"/>

<img src="https://github.com/user-attachments/assets/89bc5e20-846c-42f0-bc4a-ce7d87bdcff7" width="250px"/>

<img src="https://github.com/user-attachments/assets/578f0414-3a60-4f15-9734-c807e71a8f09" width="250px"/>

##

### React Hook Form

Usando errors do form para informar no proprio input no placeholder especificamente que o campo é obrigatório e fazendo a verificação de número maximo de caracteres e sinalizando com bordas vermelhas.

```js html

    <label htmlFor='searchcpf'>Pesquisar</label>
        <input
            type='search'
            id='searchcpf'
            placeholder={`${errors.searchcpf ? 'Campo Obrigatório' : ''}`}
            className={`${errors.searchcpf ? styles.required : ''}`}
            {...register('searchcpf', { required: true, maxLength: 11, pattern: /\d{11}/g })}
        />
    <input type='submit' title='Pesquisar Por CPF' value='Pesquisar' />
            
```

##

<img src="https://github.com/user-attachments/assets/314e43fe-4307-42b5-a4fe-edbdfd13694a" width="250px"/>


Fazendo uma verificação se o CPF informado é valido antes de enviar.

```js html

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

```

## Continui...

<div align="center">

### Full Stack

</div>

##

<div align="center">
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" width="30px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg" width="30px" />
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vercel/vercel-line.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-plain.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/reactrouter/reactrouter-original.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-plain.svg" width="30px"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg" width="30px"/>
</div>