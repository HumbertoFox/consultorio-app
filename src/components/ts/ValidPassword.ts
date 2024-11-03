export const validatePassword = (value: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return regex.test(value)
        ||
        'A senha deve conter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula e um número.';
};