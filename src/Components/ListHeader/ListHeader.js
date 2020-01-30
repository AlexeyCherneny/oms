import React from "react";
import { Tooltip, Typography, Button } from "antd";

import styles from "./styles.module.scss";

const Header = props => (
  <div className={styles.header}>
    <Typography.Text className={styles.title} strong>
      {props.title}
    </Typography.Text>

    <span>
      <Tooltip placement="top" title="Создать">
        <Button icon="file" type="link" onClick={props.handleCreate} />
      </Tooltip>
      <Tooltip placement="top" title="Обновить">
        <Button icon="sync" type="link" onClick={props.handleUpdate} />
      </Tooltip>
    </span>
  </div>
);

export default Header;
