'use client';
import SideBar from '@/components/sidebar';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import { eventsTest } from './api/events';
import CustomToolbar from '@/components/toobar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import styles from './page.module.css';

interface CalendarEvent {
  start: Date;
  end: Date;
  color: string;
  [key: string]: any;
}

const localizer = momentLocalizer(moment);

export default function CalendarPage() {
  const styleColor = (event: CalendarEvent): { style: { backgroundColor: string } } => ({
    style: { backgroundColor: event.color }
  });

  return (
    <main className={styles.main}>
      <SideBar />
      <div className={styles.divmain}>
        <Calendar
          localizer={localizer}
          events={eventsTest}
          eventPropGetter={styleColor}
          startAccessor='start'
          endAccessor='end'
          components={{ toolbar: CustomToolbar }}
        />
      </div>
    </main>
  );
};