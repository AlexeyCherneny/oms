import React from "react";
import { Tree, Button, Icon } from 'antd';

import { getTreeNodeUrl } from '../../../helpers/tree'

import * as styles from './TreeView.module.scss';

const { TreeNode } = Tree;

const getTreeNodeTitle = el => {
  const handleAddClick = event => {
    event.stopPropagation()
    console.log(`click to btn add with node id - ${el.data.id}(calls onClick at button)`)
  }
  const handleDeleteClick = event => {
    event.stopPropagation()
    console.log(`click to btn delete with node id - ${el.data.id}(calls onClick at button)`)
  }
  return (
    <div className={styles.treeElement}>
      <p>{el.data.title}</p>
      <div className={styles.btnWrapper}>
        <Button
          onClick={handleAddClick}
          size="small"
          type="primary"
          shape="circle"
          className={styles.btn}
        >
            <Icon type="file-add" />
        </Button>

        <Button
          onClick={handleDeleteClick}
          size="small"
          type="primary"
          shape="circle"
          className={styles.btn}
        >
          <Icon type="delete" />
        </Button>

      </div>
    </div>
  )
}

const getTreeJSX = tree => (
  tree.map(el => (
    <TreeNode title={getTreeNodeTitle(el)} key={el.data.id} disabled={el.isDisabled}>
      {getTreeJSX(el.children)}
    </TreeNode>
  ))
)

export const TreeView = ({ tree, documents, history }) => {
  const handleSelect = ([ id ]) => history.push(`/app/cabinet/documents${getTreeNodeUrl(documents, id)}`)
  return (
    <Tree onSelect={handleSelect}>
      {getTreeJSX(tree)}
    </Tree>
  )
}
