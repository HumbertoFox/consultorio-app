'use client';

import { GetCrmX } from './api/getcrms/crmx';
import { AgendaPacient } from './api/agendapatient/reqpatients';
import { CalendarEventProps } from '@/interfaces/interfaces';
import {
  useEffect,
  useState
} from 'react';
import {
  Calendar,
  momentLocalizer
} from 'react-big-calendar';
import moment from 'moment';
import styles from './page.module.css';
import SideBar from '@/components/sidebar';
import CustomToolbar from '@/components/toobar';
import 'moment/locale/pt-br';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import Swal from 'sweetalert2';

const localizer = momentLocalizer(moment);
moment.locale('pt-br');

export default function CalendarPage() {
  const [consults, setConsults] = useState<CalendarEventProps[]>([]);

  const styleColor = (event: CalendarEventProps): { style: { backgroundColor: string } } => ({
    style: { backgroundColor: event.color }
  });
  const handleConsultSelectClick = (element: any) => {
    Swal.fire({
      title: element.name,
      html: `<p><strong>Status:</strong> ${element.status}</p>
                ${element.returnconsult === 'Sim' ? `<p><strong>Volta:</strong> ${element.returnconsult}</p>` : ''}
                <p><strong>CPF:</strong> ${element.title}</p>
                <p><strong>Telefone:</strong> ${element.telephone}</p>
                <p><strong>Plano:</strong> ${element.covenant}</p>
                <p><strong>Início:</strong> ${element.start.toLocaleString()}</p>
                <p><strong>Termino:</strong> ${element.end.toLocaleString()}</p>
                <p><strong>Crm:</strong> ${element.desc}</p>
                <p><strong>Obs:</strong> ${element.observation}</p>`,
      icon: 'info',
      confirmButtonText: 'Ok'
    });
  };

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
      } catch (error) {
        console.error(error);
        Swal.fire({
          icon: 'error',
          title: 'Erro!',
          text: 'Erro ao Conectar com o Banco!',
          confirmButtonText: 'OK'
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
      </div>
    </main>
  );
}