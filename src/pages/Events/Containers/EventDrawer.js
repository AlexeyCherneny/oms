import React from "react";
import { compose } from "recompose";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Moment from "moment";

import actions from "../../../store/actions";

import EventDrawer from "../Components/EventDrawer";
import { DATE_FORMATS } from "../../../services/constants";

const BASE_URL = "/app/cabinet/events";

const mapState = ({ events }) => ({
  isLoading:
    events.createEvent.isLoading ||
    events.updateEvent.isLoading ||
    events.fetchEvent.isLoading ||
    events.deleteEvent.isLoading,
  isErrorFetchEvent: events.fetchEvent.isError,
  event: events.fetchEvent.data
});

const mapDispatch = {
  createEvent: actions.createEventRequest,
  updateEvent: actions.updateEventRequest,
  fetchEvent: actions.fetchEventRequest,
  resetEvent: actions.fetchEventReset,
  deleteEvent: actions.deleteEventRequest
};

const enchance = compose(withRouter, connect(mapState, mapDispatch));

class EventDrawerContainer extends React.PureComponent {
  componentDidMount() {
    const { uuid } = this.props.match.params;
    if (uuid) this.props.fetchEvent({ uuid });
  }

  componentDidUpdate(prevProps) {
    const { uuid } = this.props.match.params;
    if (uuid && uuid !== prevProps.match.params.uuid) {
      this.props.fetchEvent({ uuid });
    }
    if (this.props.isErrorFetchEvent) {
      this.props.resetEvent();
      this.props.history.push(`${BASE_URL}/new`);
    }
  }

  handleClose = () => {
    const { history, event, resetEvent } = this.props;
    history.push(BASE_URL);
    if (event) resetEvent();
  };

  handleSave = data => {
    const { operation, uuid } = this.props.match.params;
    const meta = { onSuccess: this.handleClose };

    if (operation === "new")
      return this.props.createEvent(
        { ...data, date: Moment().format(DATE_FORMATS.dashReverse) },
        meta
      );
    if (operation === "edit")
      return this.props.updateEvent({ ...data, uuid }, meta);
  };

  handleDelete = () => {
    const { uuid } = this.props.match.params;
    this.props.deleteEvent({ uuid }, { onSuccess: this.handleClose });
  };

  render() {
    const isOpenDrawer = Boolean(this.props.match.params.operation);
    const isCreate = this.props.match.params.operation === "new";

    return (
      <EventDrawer
        handleSubmit={this.handleSave}
        handleDelete={this.handleDelete}
        onClose={this.handleClose}
        isLoading={this.props.isLoading}
        isCreate={isCreate}
        isOpen={isOpenDrawer}
        event={this.props.event || {}}
      />
    );
  }
}

export default enchance(EventDrawerContainer);
