import { compose } from 'recompose';
import { connect } from "react-redux";

import Chart from '../Components/Chart';

const data = [
  { name: 'Сентябрь 2019', userCount: 29, amt: 2400 },
  { name: 'Октябрь 2019', userCount: 29, amt: 2210 },
  { name: 'Ноябрь 2019', userCount: 30, amt: 2290 },
  { name: 'Декабрь 2019', userCount: 32, amt: 2000 },
  { name: 'Январь 2020', plannedUserCount: 33, userCount: 32, amt: 2181 },
  { name: 'Февраль 2020', plannedUserCount: 34, userCount: 32, amt: 2500 },
  { name: 'Март 2020', plannedUserCount: 36, userCount: 34, amt: 2100 },
  { name: 'Апрель 2020', plannedUserCount: 36, userCount: undefined, amt: 2100 },
  { name: 'Май 2020', plannedUserCount: 37, userCount: undefined, amt: 2100 },
  { name: 'Июнь 2020', plannedUserCount: 38, userCount: undefined, amt: 2100 },
  { name: 'Июль 2020', plannedUserCount: 40, userCount: undefined, amt: 2100 },
  { name: 'Август 2020', plannedUserCount: 42, userCount: undefined, amt: 2100 },
  { name: 'Сентябрь 2020', plannedUserCount: 44, userCount: undefined, amt: 2100 },
];

const mapState = state => ({
  data,
});

const ChartContainer = compose(
  connect(mapState, null)
)(Chart);

export default ChartContainer;
