const currentYear = new Date().getFullYear();
const currentMonth = new Date().getMonth();
const currentDay = new Date().getDate();
export const eventsTest = [{
    id: 1,
    title: 'Ciclano',
    start: new Date(currentYear, currentMonth, currentDay, 14, 0),
    end: new Date(currentYear, currentMonth, currentDay, 14, 30),
    desc: 'Teste 1',
    color: '#90EE90',
    tipo: 'activity'
},
{
    id: 2,
    title: 'Fulano',
    start: new Date(currentYear, currentMonth, currentDay, 7, 0),
    end: new Date(currentYear, currentMonth, currentDay, 7, 10),
    desc: 'Teste 2',
    color: '#3C91E6',
    tipo: 'activity'
}];