import React from "react";
import { Tree, Button, Spin, Typography, Tooltip } from "antd";
import ContextMenu from "../Components/ContextMenu";

import * as styles from "./styles/TreeView.module.scss";

const { TreeNode } = Tree;

const getTreeNodeTitle = (el, handleCreate, handleRename, handleDelete) => (
  <ContextMenu
    onCreate={() => handleCreate(el)}
    onRename={() => handleRename(el)}
    onDelete={() => handleDelete(el)}
  >
    <span className={styles.nodeTitle}>{el.title}</span>
  </ContextMenu>
);

const renderJSXTree = (tree, documents, ...args) => 
  tree.map(el => {
    const children = documents.filter(doc => doc.parent_document === el.id);
    return (
      <TreeNode
        title={getTreeNodeTitle(el, ...args)}
        key={String(el.id)}
        className={styles.treeNode}
      >
        {children.length > 0 && renderJSXTree(children, documents, ...args)}
      </TreeNode>
    )
});
  

const TreeView = ({
  isLoading,
  selectedId,
  expandedKeys,
  rootChildren,
  documents,
  readDocuments,
  handleSelectNode,
  handleCreate,
  handleRename,
  handleDelete,
}) => {
  const treeContainerRef = React.useRef(null);
  const handleTreeRightClick = ({ event }) => {
    event.stopPropagation(); 
    treeContainerRef.current.click();
  }

  return (
    <div className={styles.container}>
      <div className={styles.treeHader}>
        <Typography.Text className={styles.title} strong>
          Документы
        </Typography.Text>
        <span>
          <Tooltip placement="top" title="Создать">
            <Button 
              icon="file" 
              type="link" 
              onClick={() => handleCreate()}
            />
          </Tooltip>
          <Tooltip placement="top" title="Обновить">
            <Button 
              icon="sync"
              type="link"
              onClick={() => readDocuments()} 
            />
          </Tooltip>
        </span>
      </div>
      <ContextMenu
        onCreate={() => handleCreate()}
        hideRename
        hideDelete
      >
        <div style={{ flex: 'auto' }} ref={treeContainerRef}>
          {isLoading ? (
            <Spin style={{ paddingTop: 20, width: '100%' }} />
          ) : (
            <Tree
              onSelect={handleSelectNode}
              selectedKeys={[selectedId]}
              defaultExpandedKeys={expandedKeys}
              style={{ margin: 10 }}
              onRightClick={handleTreeRightClick}
              showLine
            >
              {renderJSXTree(rootChildren, documents, handleCreate, handleRename, handleDelete)}
            </Tree>
            )}
        </div>
      </ContextMenu>
    </div>
  );
};

export default TreeView;
