import React from 'react';
import { ToolbarProps } from 'react-big-calendar';
import { CalendarEventProps } from '@/interfaces/interfaces';

type CustomToolbarProps = ToolbarProps<CalendarEventProps, object>;

const CustomToolbar: React.FC<CustomToolbarProps> = ({
  onView,
  label,
  onNavigate
}) => (
  <div className='rbc-toolbar'>
    <div className='rbc-btn-group'>
      <button
        type='button'
        onClick={() => onNavigate('PREV')}
        aria-label='Voltar um mês'
      >
        Voltar
      </button>
      <button
        type='button'
        onClick={() => onNavigate('TODAY')}
        aria-label='Voltar para hoje'
      >
        Hoje
      </button>
      <button
        type='button'
        onClick={() => onNavigate('NEXT')}
        aria-label='Avançar um mês'
      >
        Avançar
      </button>
    </div>

    <div className='rbc-toolbar-label'>
      <h2>{label}</h2>
    </div>

    <div className='rbc-btn-group'>
      <button
        type='button'
        onClick={() => onView('day')}
        aria-label='Visualizar por dia'
      >
        Dia
      </button>
      <button
        type='button'
        onClick={() => onView('week')}
        aria-label='Visualizar por semana'
      >
        Semana
      </button>
      <button
        type='button'
        onClick={() => onView('month')}
        aria-label='Visualizar por mês'
      >
        Mês
      </button>
      <button
        type='button'
        onClick={() => onView('agenda')}
        aria-label='Visualizar agenda'
      >
        Agenda
      </button>
    </div>
  </div>
);

export default CustomToolbar;