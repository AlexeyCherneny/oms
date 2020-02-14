export const getAllParents = (documents, nodeUuid) => {
  const document = documents.find(el => String(el.uuid) === String(nodeUuid));
  const parentUuid = document ? document.parentDocument : null;
  if (!parentUuid && parentUuid !== 0) return [];
  return [...getAllParents(documents, parentUuid), String(parentUuid)];
}
