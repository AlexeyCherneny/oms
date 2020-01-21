import React from "react";
import { Dropdown, Switch, Input, Button, Card, Menu } from "antd";

const Header = props => {
  const [ isMenuVisible, toggleMenu ] = React.useState(false);
  const [ password, handlePasswordChange ] = React.useState('');
  
  const handleSubmit = () => {
    props.publicRequest({ password });
    handlePasswordChange('');
    toggleMenu(!isMenuVisible);
  }

  return (
    <Dropdown
      visible={isMenuVisible}
      overlay={
        <Menu style={{ padding: 0 }}>
          <Menu.Item style={{ padding: 0 }}>
            <Card style={{ padding: 15, width: '100%', margin: '10px 0' }} bodyStyle={{ padding: 0 }}>
              <Input
                name="password"
                placeholder="Пароль"
                type="password"
                onChange={e => handlePasswordChange(e.target.value)}
                onPressEnter={handleSubmit}
                value={password}
              />
              <br />
              <Button style={{ marginTop: 10 }} onClick={handleSubmit}>
                Подтвердить
              </Button>
            </Card>
          </Menu.Item>
        </Menu>
      }
    >
      <div style={{ color: "white" }}>
        {props.isPublic ? "Публичный доступ" : "Приватный доступ"} &nbsp;&nbsp;
        <Switch
          checked={props.isPublic}
          onClick={props.isPublic ? props.resetPublicAccess : () => toggleMenu(!isMenuVisible)}
        />
      </div>
    </Dropdown>
  );
};

export default Header;
