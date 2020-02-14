import React from 'react';

import Settings from "../Containers/Settings";
import Document from "../Containers/Document";

const DocumentArea = props => (
  <>
    <Document {...props} />
    <Settings {...props} />
  </>
);

export default DocumentArea;
