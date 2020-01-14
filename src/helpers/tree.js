const iter = (tree, callback) => {
  tree.forEach((el, index) => {
    callback(el, tree, index)
    iter(el.children, callback)
  })
}

const getParentNode = (tree, parentId) => {
  let resultNode = null;
  iter(tree, (el, tree, index) => {
    if (String(el.data.id) === String(parentId) && !resultNode) {
      resultNode = tree[index]
    }
  })
  return resultNode
}

export const getTreeFormArr = data => {
  const tree = [];
  data.forEach(el => {
    if (el.parent_document) {
      const parentNode = getParentNode(tree, el.parent_document)
      parentNode.children.push({ data: el, children: [] })
      parentNode.isDisabled = true
    } else {
      tree.push({ data: el, children: [] })
    }
  })
  return tree
}

export const getTreeNodeUrl = (documents, nodeId) => {
  let url = ''
  let id = nodeId
  while(id) {
    /* eslint-disable */
    const currentDocument = documents.find(el => String(el.id) === String(id))
    url = `/${id}${url}`
    id = currentDocument ? currentDocument.parent_document : null;
  }
  return url
}
