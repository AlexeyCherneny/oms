import { compose, lifecycle } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import Authenticated from "../../../Components/HOC/Authenticated";
import actions from "../../../store/actions";

import EventsPage from "../Components";

const mapState = ({ events }) => ({
  ...events
});

const mapDispatch = {
  fetchEventsList: actions.eventsListRequest,
  fetchUsersList: actions.usersRequest,
  createEvent: actions.createEventRequest
};

const EventsPageContainer = compose(
  Authenticated,
  connect(mapState, mapDispatch),
  withRouter,
  lifecycle({
    componentDidMount() {
      const { fetchEventsList, fetchUsersList, location } = this.props;

      fetchEventsList({ search: location.search });
      fetchUsersList();
    }
  })
)(EventsPage);

export default EventsPageContainer;
