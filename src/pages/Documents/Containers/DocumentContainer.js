import React from "react";
import { compose, withProps } from "recompose";
import { connect } from "react-redux";

import Authenticated from "../../../Components/HOC/Authenticated";
import actions from "../../../store/actions";

import { Document } from "../Components/Document";

const mapState = ({ documents }) => ({
  ...documents
});

const mapDispatch = {
  updateListRequest: actions.updateListRequest,
};

const DocumentContainer = compose(
  Authenticated,
  connect(mapState, mapDispatch),
  withProps(
    ({ documentsList: { data } }) => {
      const splitUrl = location.pathname.split('/')
      const id = splitUrl[splitUrl.length - 1]
      const document = data.find(el => String(el.id) === id)

      return {
        document,
      };
    }
  )
)(Document);

export default DocumentContainer;
