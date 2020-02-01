import React from "react";

import styles from "./index.module.scss";

const File = props => (
  <a href={props.path} className={styles.title} download>
    {/[^/]*$/.exec(props.path)[0]}
  </a>
);

export default File;
