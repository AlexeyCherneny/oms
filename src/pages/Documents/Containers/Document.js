import { compose, withProps } from "recompose";
import { connect } from "react-redux";

import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

import { Document } from "../Components/Document";

const mapState = state => ({
  getDocumentById: selectors.getDocumentById(state),
  documents: selectors.getDocuments(state)
});

const mapDispatch = {
  updateListRequest: actions.updateListRequest
};

const DocumentContainer = compose(
  connect(mapState, mapDispatch),
  withProps(({ match, getDocumentById }) => {
    console.log(
      "getDocumentById(match.params.id) :",
      getDocumentById(match.params.id)
    );
    return {
      document: getDocumentById(match.params.id)
    };
  })
)(Document);

export default DocumentContainer;
