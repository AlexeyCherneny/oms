import React from "react";
import FullCalendar from "@fullcalendar/react";
import interactionPlugin from "@fullcalendar/interaction";
import dayGridPlugin from "@fullcalendar/daygrid";
import ruLocale from "@fullcalendar/core/locales/ru";
import moment from "moment";

import calendarDays from "../../../assets/calendar.json";

import "./styles/calendar.scss";

const Calendar = props => (
  <FullCalendar
    defaultView="dayGridMonth"
    plugins={[interactionPlugin, dayGridPlugin]}
    selectable={true}
    eventClick={props.handleEventClick}
    select={props.handleSelect}
    events={props.events}
    height={540}
    locale={ruLocale}
    eventLimit={3}
    dayRender={(date, cell) => {
      const day = calendarDays.find(day => {
        return day.date === moment(date.date).format("YYYY-MM-DD");
      });

      if (day && day.workday === "true") {
        if (date.el) {
          date.el.style.background = "green";
          date.el.style.opacity = "0.7";
        }
      } else {
        if (date.el) {
          date.el.style.background = "red";
          date.el.style.opacity = "0.3";
        }
      }
    }}
  />
);

export default Calendar;
