import React from "react";
import { Menu, Spin } from "antd";
import { NavLink } from "react-router-dom";

import { ListHeader } from "../../../Components";
import { BASE_URL } from "../constants";
import ContextMenu from "./ContextMenu";

const menuProps = {
  theme: "light",
  mode: "inline",
  style: {
    marginBottom: 20
  }
};

const Header = ({
  selectedKey,
  projects,
  handleCreate,
  readProjects,
  isLoading,
  handleDelete,
  handleRename,
  location
}) => {
  return (
    <div>
      <ListHeader
        title="Проекты"
        handleCreate={handleCreate}
        handleUpdate={readProjects}
      />

      {isLoading ? (
        <Spin style={{ paddingTop: 20, width: "100%" }} />
      ) : (
        <Menu {...menuProps} selectedKeys={[selectedKey]}>
          {projects.map(project => (
            <Menu.Item
              key={project.id}
              style={{
                lineHeight: "40px",
                margin: 0,
                height: 60,
                display: "flex",
                alignItems: "center"
              }}
            >
              <ContextMenu
                onDelete={() => handleDelete(project.id)}
                onRename={() => handleRename(project.id)}
              >
                <NavLink
                  to={{
                    pathname: `${BASE_URL}/${project.id}/users`,
                    search: location.search
                  }}
                >
                  {project.title}
                </NavLink>
              </ContextMenu>
            </Menu.Item>
          ))}
        </Menu>
      )}
    </div>
  );
};

export default Header;
