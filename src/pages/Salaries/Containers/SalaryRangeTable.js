import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { compose, withProps, withHandlers } from "recompose";
import { get, sortBy } from "lodash";
import moment from "moment";

import {
  fromProgramToDisplayDate,
  programDateFormat
} from "../../../services/formatters";
import { splitRange } from "../../../services/chartUtils";
import selectors from "../../../store/selectors";
import actions from "../../../store/actions";
import SalaryRangeTable from "../Components/SalaryRangeTable";

const mapState = state => ({
  salaries: selectors.getSalaries(state),
  isDownloading: selectors.isSalariesDownloading(state),
  isSalaryDeleting: selectors.isSalaryDeleting(state),
  isSalaryUpdating: selectors.isSalaryUpdating(state),
  getUserByUuid: selectors.getUserByUuid(state)
});

const mapDispatch = {
  handleSalaryRangeDelete: actions.deleteSalaryRangeRequest,
  openModal: actions.openModal
};

const SalaryRangeTableContainer = compose(
  connect(mapState, mapDispatch),
  withRouter,
  withProps(({ salaries }) => {
    const sortedSalaries = sortBy(salaries, s => s.date).reverse();

    const lS = sortedSalaries[0];
    const fS = sortedSalaries[sortedSalaries.length - 1];

    const fDate = get(fS, "date", "");
    const lDate = get(lS, "date", "");

    const range = splitRange(fDate, lDate, "month", true);

    Object.keys(range).forEach(date => {
      const salary = sortedSalaries.find(
        s =>
          moment(s.date, programDateFormat)
            .startOf("month")
            .format(programDateFormat) === date
      );

      if (salary) {
        range[date] = salary;
      } else {
        range[date] = { date, value: 0, uuid: sortedSalaries[0].uuid };
      }
    });

    const filledSalaries = Object.values(range);

    const tData = filledSalaries.reduce((ss, s) => {
      const lS = get(ss, `${ss.length - 1}`, "");

      const dateDiff = moment(lS.dateFrom, programDateFormat).diff(
        moment(s.date, programDateFormat),
        "month"
      );

      if (!lS) {
        ss.push({ ...s, dateFrom: s.date, dateTo: s.date });
        return ss;
      }
      if (lS.value === s.value && dateDiff === 1) {
        lS.dateFrom = s.date;
      } else {
        ss.push({
          ...s,
          dateFrom: s.date,
          dateTo: s.date
        });
      }

      return ss;
    }, []);

    const formedTData = tData.map(tR => ({
      ...tR,
      date: `${fromProgramToDisplayDate(
        tR.dateFrom
      )} - ${fromProgramToDisplayDate(tR.dateTo)}`
    }));

    return {
      tableData: formedTData
    };
  }),
  withHandlers({
    handleSalaryRangeEdit: ({ openModal }) => salary => {
      return openModal({
        form: {
          initialValues: { ...salary, user: salary.uuid },
          submitTitle: "Создать",
          rejectTitle: "Отменить"
        },
        type: "customSalary",
        meta: {
          start: params => actions.createSalaryRangeRequest(params),
          success: () => actions.createSalaryRangeSuccess(),
          failure: () => actions.createSalaryRangeFailure()
        }
      });
    }
  })
)(SalaryRangeTable);

export default SalaryRangeTableContainer;
