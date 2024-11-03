export const formatAsCurrency = (value: string) => {
    if (!value) return '0';

    const numericalValue = parseFloat(value.replace(/[^\d]/g, '')) / 100;

    return numericalValue.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    });
};