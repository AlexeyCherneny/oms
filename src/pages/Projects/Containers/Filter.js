import { compose, withProps, withHandlers } from "recompose";
import { connect } from "react-redux";
import { get, defaultTo } from "lodash";
import { push } from "connected-react-router";
import { withRouter } from "react-router-dom";
import qs from "qs";

import actions from "../../../store/actions";
import { programDateFormat } from "../../../services/formatters";
import Filter from "../Components/Filter";

const mapState = ({ users, authorization }) => ({
  users,
  user: authorization.user
});

const mapDispatch = { push, readSalaries: actions.salariesRequest };

const FilterContainer = compose(
  connect(mapState, mapDispatch),
  withRouter,
  withHandlers({
    handleDateChange: ({
      readSalaries,
      history,
      location
    }) => name => value => {
      const queryObject = qs.parse(location.search, {
        ignoreQueryPrefix: true
      });

      queryObject[name] = value.format(programDateFormat);
      const query = qs.stringify(queryObject);

      history.push({ pathName: "projects", search: query });

      readSalaries({ search: `?${query}` });
    }
  }),
  withProps(({ location }) => {
    const searchObject = qs.parse(location.search, { ignoreQueryPrefix: true });

    return {
      values: searchObject
    };
  })
)(Filter);

export default FilterContainer;
