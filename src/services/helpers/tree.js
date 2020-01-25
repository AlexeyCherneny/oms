export const getAllParents = (documents, nodeId) => {
  const document = documents.find(el => String(el.id) === String(nodeId));
  const parentId = document ? document.parent_document : null;
  if (!parentId && parentId !== 0) return [];
  return [...getAllParents(documents, parentId), String(parentId)];
}
