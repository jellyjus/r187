
export const getParentURL = (route) => {
  return new Promise(res => {
    route.parent.url.subscribe((urlPath) => {
      console.log(urlPath)
      res(urlPath[urlPath.length - 1].path);
    });
  })
};

export const getPath = (url) => {
  console.log(url)
  /*url = url.split('/');
  console.log(url)*/
};
