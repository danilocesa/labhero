export function getUserAccess(module) {
  return {
    view: module.view === 'TRUE',
    create: module.create === 'TRUE',
    update: module.edit === 'TRUE',
    print: module.print === 'TRUE',
  }
}

export function omit(obj, keysToOmit) {
  let newObj = [];

  Object.keys(obj).forEach(key => {
    if(!keysToOmit.includes(key)) newObj[key] = obj[key];
  });

  return newObj;
}