// src/components/Calendar.js
import './Suggetion.css'

import React from 'react';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, isSameMonth } from 'date-fns';

const Calendar = () => {
  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const startOfMonthDate = startOfMonth(today);
  const endOfMonthDate = endOfMonth(today);

  const startWeek = startOfWeek(startOfMonthDate);
  const endWeek = endOfWeek(endOfMonthDate);

  const days = eachDayOfInterval({ start: startWeek, end: endWeek });

  const renderDays = () => {
    return days.map((day, index) => {
      const isCurrentMonth = isSameMonth(day, today);
      const className = isCurrentMonth ? 'day current-month' : 'day';

      return (
        <div className={className} key={index}>
          {format(day, 'd')}
        </div>
      );
    });
  };

  return (
    <div className="calendar">
      <div className="header">
        <div>{format(today, 'MMMM yyyy')}</div>
        <div>{format(today, 'EEEE, d')}</div>
      </div>
    </div>
  );
};

export default Calendar;
