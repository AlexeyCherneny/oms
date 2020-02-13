import React from 'react';
import { Spin } from 'antd';
import cn from 'classnames';

import * as styles from "./styles/index.module.scss";

export default ({
  children,
  className,
  classNameSpinner,
  style,
  styleSpinner,
  spinning,
  delay,
  ...props
}) => {
  const [ isSpinnig, setSpinnig ] = React.useState(false);
  React.useEffect(() => {
    if (delay && isSpinnig && !spinning) {
      const timerUuid = setTimeout(() => setSpinnig(spinning), delay);
      return () => clearTimeout(timerUuid);
    } else {
      setSpinnig(spinning);
    }
  }, [ spinning, isSpinnig, delay ]);

  return (
    <div className={cn(styles.wrapper, className)} style={style}>
      {children}
      <div className={cn(styles.spinner, classNameSpinner, isSpinnig && styles.spinning)} style={styleSpinner}>
        <Spin spinning={isSpinnig} {...props} />
      </div>
    </div>
  )
}
