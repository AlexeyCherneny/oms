import React from 'react';
import Moment from 'moment';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import PlanForm from '../Components/PlanForm';
import { DATE_FORMATS } from '../../../services/constants';
import actions from '../../../store/actions';
import { BASE_URL } from '../constants';

const mapState = ({ usersPlan }) => ({
  isLoading: usersPlan.isCreating || usersPlan.isDownloading,
  data: usersPlan.data || [],
});

const mapDispatch = {
  createUsersPlan: actions.createUsersPlanRequest,
  deleteUsersPlan: actions.deleteUsersPlanRequest,
};

const mergeProps = (state, dispatch, own) => {
  const selectedPeriod = state.data.find(item => item.date_from === own.match.params.uuid);
  return { ...state, ...dispatch, ...own, selectedPeriod }
};

const enchance = compose(
  withRouter,
  connect(mapState, mapDispatch, mergeProps),
);

class PlanFormContainer extends React.PureComponent {
  componentDidMount() {
    const { data } = this.props;
    if (data.length > 0) {
      this.checkSelectedPeriod();
    }
  }

  componentDidUpdate() {
    this.checkSelectedPeriod();
  }

  checkSelectedPeriod = () => {
    const { match, history, selectedPeriod, isLoading } = this.props;
    if (match.params.operation === 'edit' && !isLoading && !selectedPeriod) {
      history.replace(`${BASE_URL}/new`)
    }
  }

  handleSubmit = values => {
    const { createUsersPlan } = this.props;
    const date_to = Moment(values.date_to).endOf('month').format(DATE_FORMATS.dashReverse);
    const period = {
      step: parseFloat(values.step),
      number: parseFloat(values.number) + parseFloat(values.step),
      date_from: Moment(values.date_from).startOf('month').format(DATE_FORMATS.dashReverse),
      date_to: Moment(values.date_from).endOf('month').format(DATE_FORMATS.dashReverse),
    };
    const periods = [{ ...period }];

    while (Moment(period.date_to).isBefore(date_to)) {
      period.date_from = Moment(period.date_from).add(1, 'M').startOf('month').format(DATE_FORMATS.dashReverse);
      period.date_to = Moment(period.date_from).endOf('month').format(DATE_FORMATS.dashReverse);
      period.number += period.step;
      periods.push({ ...period });
    }

    createUsersPlan(periods, { onSuccess: this.handleClose });
  }

  handleClose = () => {
    this.props.history.push(BASE_URL);
  }

  render() {
    const { match, selectedPeriod, isLoading } = this.props;
    const isOpenDrawer = Boolean(match.params.operation);
    const isCreate = match.params.operation === 'new';

    return (
      <PlanForm
        handleSubmit={this.handleSubmit}
        initialValues={selectedPeriod || {}}
        isOpen={isOpenDrawer}
        isCreate={isCreate}
        isLoading={isLoading}
        onClose={this.handleClose}
      />
    );
  }
}

export default enchance(PlanFormContainer);
