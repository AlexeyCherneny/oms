import React from 'react';
import { Dropdown, Menu, Icon } from 'antd';

const handleClick = func => e => {
  e.domEvent.stopPropagation();
  if (typeof func === 'function') func();
}

const onContextMenuHandler = e => {
  e.stopPropagation();
  e.preventDefault();
  e.currentTarget.click();
}

const contextMenu = ({
  children,
  onRename,
  onCreate,
  onDelete,
  hideDelete,
  hideRename,
}) => (
  <Dropdown
    trigger={["contextMenu"]}
    overlay={(
      <Menu>
        <Menu.Item key="create" onClick={handleClick(onCreate)} onContextMenu={onContextMenuHandler}>
          <Icon type="file-add" />
          Создать
      </Menu.Item>
        {!hideRename && (
          <Menu.Item key="rename" onClick={handleClick(onRename)} onContextMenu={onContextMenuHandler}>
            <Icon type="edit" />
            Переименовать
        </Menu.Item>
        )}
        {!hideDelete && (
          <Menu.Item key="delete" onClick={handleClick(onDelete)} onContextMenu={onContextMenuHandler}>
            <Icon type="delete" />
            Удалить
        </Menu.Item>
        )}
      </Menu>
    )}
  >
    {children}
  </Dropdown>
);

export default contextMenu;
