import { compose, lifecycle } from 'recompose';
import { connect } from "react-redux";

import Home from '../Components';
import Authenticated from "../../../Components/HOC/Authenticated";
import actions from "../../../store/actions";

const mapState = ({ authorization }) => ({
  role: authorization.user && authorization.user.role,
});

const mapDispatch = {
  fetchEvents: actions.eventsListRequest,
}

const HomeContainer = compose(
  Authenticated,  
  connect(mapState, mapDispatch),
  lifecycle({
    componentDidMount() {
      // const { search } = this.props.location;
      // this.props.fetchEvents({ search });
    }
  })
)(Home);

export default HomeContainer;
