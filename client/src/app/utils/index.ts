
export const getParentURL = (route) => {
  return new Promise(res => {
    route.parent.url.subscribe((urlPath) => {
      res(urlPath[urlPath.length - 1].path);
    });
  })

};
