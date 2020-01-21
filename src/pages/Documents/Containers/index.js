import { compose, lifecycle, withProps } from "recompose";
import { connect } from "react-redux";

import Authenticated from "../../../Components/HOC/Authenticated";
import { tree } from "../../../helpers";
import actions from "../../../store/actions";
import selectors from "../../../store/selectors";

import DocumentsPage from "../Components";

const mapState = state => ({
  documents: selectors.getDocuments(state)
});

const mapDispatch = {
  readDocuments: actions.documentsRequest
};

const DocumentsPageContainer = compose(
  Authenticated,
  connect(mapState, mapDispatch),
  lifecycle({
    componentDidMount() {
      const { readDocuments } = this.props;

      readDocuments();
    }
  })
)(DocumentsPage);

export default DocumentsPageContainer;
