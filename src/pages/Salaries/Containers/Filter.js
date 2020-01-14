import { compose, withProps } from "recompose";
import { connect } from "react-redux";
import { get, defaultTo } from "lodash";
import { push } from "connected-react-router";
import { withRouter } from "react-router-dom";
import qs from "qs";
import moment from "moment";

import Filter from "../Components/Filter";

const mapState = ({ users }) => ({ users });

const mapDispatch = { push };

const FilterContainer = compose(
  connect(mapState, mapDispatch),
  withRouter,
  withProps(({ users, location, push }) => {
    const usersOptions = defaultTo(get(users, "data", []), []).map(user => ({
      label: `${user.first_name} ${user.last_name}`,
      value: String(user.id)
    }));

    const searchObject = qs.parse(location.search, { ignoreQueryPrefix: true });

    const handleChange = search => {
      push({
        pathName: "salaries",
        search
      });
    };

    const handleReset = () => {
      push({
        pathName: "salaries",
        search: ""
      });
    };

    const handleDateChange = name => value => {
      searchObject[name] = moment(value).format("YYYY-MM-DD");
      handleChange(qs.stringify(searchObject));
    };

    const handleSelectChange = name => value => {
      searchObject[name] = value;

      handleChange(qs.stringify(searchObject));
    };

    return {
      usersOptions,
      handleDateChange,
      handleSelectChange,
      handleReset,
      values: searchObject
    };
  })
)(Filter);

export default FilterContainer;
