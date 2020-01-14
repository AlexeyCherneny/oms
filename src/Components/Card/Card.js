import React from "react";
import cn from "classnames";
import { Typography, Icon, Tooltip, Skeleton } from "antd";

import * as styles from "./Card.module.scss";
const { Paragraph } = Typography;

const Card = props => (
  <div className={styles.card}>
    <div className={cn(styles.header, !props.tooltip && styles.resetPadding)}>
      {props.header && (
        <Paragraph ellipsis style={{ margin: 0, padding: 0 }} type="secondary">
          {props.header}
        </Paragraph>
      )}
      {props.tooltip && (
        <div className={styles.tooltip}>
          <Tooltip title={props.tooltip}>
            <Icon type="info-circle-o" />
          </Tooltip>
        </div>
      )}
    </div>
    <div className={styles.main}>
      <Skeleton
        loading={props.hideContent || false}
        title={{ width: "80%" }}
        paragraph={{ rows: 1, width: "100%" }}
      >
        {props.title && <h2 className={styles.title}>{props.title}</h2>}
        {props.children}
      </Skeleton>
    </div>
    {props.footer && (
      <div className={styles.footer}>
        <Skeleton
          loading={props.hideContent || false}
          title={false}
          paragraph={{ rows: 1, width: "100%" }}
        >
          <Paragraph
            ellipsis
            style={{ margin: 0, padding: 0 }}
            type="secondary"
          >
            {props.footer}
          </Paragraph>
        </Skeleton>
      </div>
    )}
  </div>
);

export default Card;
