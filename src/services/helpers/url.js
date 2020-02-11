export const findPathInLocation = (location, paths) => {
  if (!location || !paths || !paths.length) return null;

  let path;
  let tempLocation = location;
  const checkPath = path => path === tempLocation;
  
  while (!path && tempLocation.length > 0) {
    path = paths.find(checkPath);
    const end = tempLocation.lastIndexOf('/');
    if (path || end === -1) break;
    tempLocation = tempLocation.slice(0, end);
  }

  return path || null;
}
