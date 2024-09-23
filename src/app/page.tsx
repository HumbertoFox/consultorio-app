'use client';
import { GetCrmX } from './api/getcrms/crmx';
import { AgendaPacient } from './api/agendapatient/reqpatients';
import { CalendarEventProps } from '@/interfaces/interfaces';
import { useEffect, useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import styles from './page.module.css';
import SideBar from '@/components/sidebar';
import ConsultClick from '@/components/modal/eventconsults';
import CustomToolbar from '@/components/toobar';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
moment.locale('pt-br');
const localizer = momentLocalizer(moment);
export default function CalendarPage() {
  const [consults, setConsults] = useState<CalendarEventProps[]>([]);
  const [consultSelected, setConsultSelected] = useState<CalendarEventProps | any>(null);
  const styleColor = (event: CalendarEventProps): { style: { backgroundColor: string } } => ({
    style: { backgroundColor: event.color }
  });
  const handleConsultSelectClick = (element: any) => setConsultSelected(element);
  const handleConsultSelectClose = () => setConsultSelected(null);
  useEffect(() => {
    const eventAgendCalendar = async () => {
      try {
        const crmx = await GetCrmX();
        const result = await AgendaPacient();
        const res = Object.values(result);
        const response = res[3];
        const formattedEvents = response.map((consult: any) => ({
          ...consult,
          color: consult.desc == crmx ? '#FF0075' : '#3C91E6',
          tipo: 'activity',
          start: new Date(consult.start.replace(/-/g, ',').replace(/T/g, ' ')),
          end: new Date(consult.end.replace(/-/g, ',').replace(/T/g, ' ')),
          title: consult.title.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4'),
          telephone: consult.telephone.replace(/(\d{2})(\d{5})(\d{4})/, '($1)$2-$3')
        }));
        setConsults(formattedEvents);
      } catch (Error) {
        console.error({
          type: 'Error',
          message: 'Erro ao Conectar ao Banco!'
        });
      };
    };
    eventAgendCalendar();
  }, []);
  return (
    <main className={styles.main}>
      <SideBar />
      <div className={styles.divmain}>
        <Calendar
          localizer={localizer}
          events={consults}
          eventPropGetter={styleColor}
          onSelectEvent={handleConsultSelectClick}
          startAccessor='start'
          endAccessor='end'
          components={{ toolbar: CustomToolbar }}
        />
        {consultSelected && (<ConsultClick {...consultSelected} onClose={handleConsultSelectClose} />)}
      </div>
    </main>
  );
};