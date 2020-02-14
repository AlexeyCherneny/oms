import * as React from "react";
import { Drawer } from "antd";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";

const drawerWrapper = ({ defaultBackLocation, ...settings}) => Component => {
  const DrawerWrap = props => {
    let onClose = props.history.goBack;

    if (props.history.length <= 2 && defaultBackLocation) {
      onClose = () => props.history.replace(defaultBackLocation);
    }

    return (
      <Drawer visible={true} onClose={onClose} {...settings} destroyOnClose>
        <Component {...props} />
      </Drawer>
    );
  };

  return compose(withRouter)(DrawerWrap);
};

export default drawerWrapper;
