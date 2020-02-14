import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, lifecycle, withProps } from "recompose";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

import PlanTable from "../Components/PlanTable";
import { BASE_URL } from '../constants';

const mapState = state => ({
  data: selectors.getUsersPlans(state),
  isLoading: selectors.isUsersPlansDownloading(state),
  getIsDeleting: selectors.isUsersPlanDeleting(state),
  isError: false,
});

const mapDispatch = {
  fetchUsersPlans: actions.usersPlansRequest,
  deleteUsersPlan: actions.deleteUsersPlanRequest,
}

const PlanTableContainer = compose(
  connect(mapState, mapDispatch),
  withRouter,
  withProps(({ history, location }) => {
    const urlSearch = new URLSearchParams(location.search);
    const page = urlSearch.get('page') || '1';
    return {
      goToPage: page => {
        if (page <= 1) {
          urlSearch.delete('page')
        } else {
          urlSearch.set('page', page)
        }
        const search = urlSearch.toString();
        history.push(BASE_URL + search && `?${search}`);
      },
      page,
      BASE_URL,
    };
  }),
  lifecycle({
    componentDidMount() {
      this.props.fetchUsersPlans();
    }
  })
)(PlanTable);

export default PlanTableContainer;
