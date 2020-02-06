import { withRouter } from "react-router";
import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import { get } from "lodash";

import {
  formatEventsForCalendar,
  formatBirthdayForCalendar
} from "../../../services/formatters";

import Calendar from "../Components/Calendar";

const mapState = ({ events, users }) => ({
  eventsList: events.eventsList,
  usersList: users.data ? users.data : []
});

const CalendarContainer = compose(
  connect(mapState),
  withRouter,
  withProps(({ usersList, eventsList, history, match }) => {
    const events = get(eventsList, "data", []);

    const usersBirths = usersList.map(user => ({
      name: user.firstName + " " + user.lastName,
      date: user.birthday,
      type: "birth"
    }));

    const formattedEvents = [
      ...formatEventsForCalendar(events),
      ...formatBirthdayForCalendar(usersBirths)
    ];

    return {
      events: formattedEvents,
      handleEventClick: ({ event }) => {
        history.push(`${match.path}/edit/${event.id}`);
      }
    };
  })
)(Calendar);

export default CalendarContainer;
