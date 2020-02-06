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
    updateQuery: ({ history }) => search =>
      history.push({ pathName: "salaries", search }),

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

      history.push({ pathName: "salaries", search: query });

      readSalaries({ search: `?${query}` });
    },
    handleUsersChange: ({
      readSalaries,
      history,
      location
    }) => name => value => {
      const queryObject = qs.parse(location.search, {
        ignoreQueryPrefix: true
      });

      queryObject[name] = value;
      const query = qs.stringify(queryObject);

      history.push({ pathName: "salaries", search: query });

      readSalaries({ search: `?${query}` });
    }
  }),
  withProps(({ users, location }) => {
    const usersOptions = defaultTo(get(users, "data", []), []).map(user => ({
      label: `${user.firstName[0]}. ${user.lastName}`,
      value: String(user.uuid)
    }));

    const searchObject = qs.parse(location.search, { ignoreQueryPrefix: true });

    return {
      usersOptions,
      values: searchObject
    };
  })
)(Filter);

export default FilterContainer;
