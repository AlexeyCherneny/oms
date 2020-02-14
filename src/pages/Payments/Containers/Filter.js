import { compose, withProps, lifecycle } from "recompose";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { withRouter } from "react-router-dom";
import qs from "qs";
import moment from "moment";

import Filter from "../Components/Filter";

const mapDispatch = { push };

const dateFormat = "YYYY-MM";

const FilterContainer = compose(
  connect(null, mapDispatch),
  withRouter,
  withProps(({ location, push }) => {
    const searchObject = qs.parse(location.search, { ignoreQueryPrefix: true });

    const handleDateChange = name => value => {
      searchObject[name] = moment(value).format(dateFormat);
      push({ search: qs.stringify(searchObject) });
    };

    return {
      handleDateChange,
      startDate: moment(searchObject.start_date, dateFormat),
      endDate: moment(searchObject.end_date, dateFormat)
    };
  }),
  lifecycle({
    componentDidMount() {
      let searchObject = qs.parse(this.props.location.search, {
        ignoreQueryPrefix: true
      });

      let startDate = moment()
        .startOf("month")
        .subtract(6, "month");
      if (moment(searchObject.start_date, dateFormat).isValid()) {
        startDate = moment(searchObject.start_date, dateFormat).startOf(
          "month"
        );
      }
      let endDate = moment()
        .startOf("month")
        .add(6, "month");
      if (moment(searchObject.end_date, dateFormat).isValid()) {
        endDate = moment(searchObject.end_date, dateFormat).startOf("month");
      }

      searchObject = {
        start_date: startDate.format(dateFormat),
        end_date: endDate.format(dateFormat)
      };

      this.props.push({ search: qs.stringify(searchObject) });
    }
  })
)(Filter);

export default FilterContainer;
