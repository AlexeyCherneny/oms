import React from "react";
import { Tree, Button, Icon } from "antd";

import * as styles from "./styles/TreeView.module.scss";

const { TreeNode } = Tree;

const getTreeNodeTitle = (el, handleCreateNode, handleDeleteNode) => (
  <div className={styles.treeElement}>
    <p>{el.data.title}</p>
    <div className={styles.btnWrapper}>
      <Button
        onClick={handleCreateNode}
        size="small"
        type="primary"
        shape="circle"
        className={styles.btn}
      >
        <Icon type="file-add" />
      </Button>

      <Button
        onClick={handleDeleteNode}
        size="small"
        type="primary"
        shape="circle"
        className={styles.btn}
      >
        <Icon type="delete" />
      </Button>
    </div>
  </div>
);

const renderJSXTree = (tree, handleCreateNode, handleDeleteNode) =>
  tree.map(el => (
    <TreeNode
      title={getTreeNodeTitle(el, handleCreateNode, handleDeleteNode)}
      key={el.data.id}
      disabled={el.isDisabled}
    >
      {renderJSXTree(el.children, handleCreateNode, handleDeleteNode)}
    </TreeNode>
  ));

const TreeView = ({
  tree,
  handleSelectNode,
  handleCreateNode,
  handleDeleteNode
}) => {
  return (
    <Tree onSelect={handleSelectNode}>
      {renderJSXTree(tree, handleCreateNode, handleDeleteNode)}
    </Tree>
  );
};

export default TreeView;
