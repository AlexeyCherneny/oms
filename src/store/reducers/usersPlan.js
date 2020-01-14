import Moment from "moment";
import { CRUDReducer } from "./utils";

export default CRUDReducer("usersPlan", {
  onCreateDataMap: (data, payload) => {
    if (!Array.isArray(payload) || payload.length === 0) {
      return data;
    };
    if (!Array.isArray(data) || data.length === 0) {
      return payload;
    };
    const newData = [...data];
    payload.forEach(el => {
      const idx = data.findIndex(item => item.date_from === el.date_from);
      if (idx === -1) {
        newData.push(el);
      } else {
        newData[idx] = el;
      }
    });
    return newData.sort((a, b) => {
      if (Moment(a.date_from).isBefore(b.date_from)) return -1;
      if (Moment(b.date_from).isBefore(a.date_from)) return 1;
      return 0;
    });
  },
  onDeleteDataMap: (data, payload) => {
    if (!payload || !Array.isArray(data) || data.length === 0) {
      return data;
    };
    return data.filter(item => item.date_from !== payload);
  }
});
