const Routes = {
  mainPage: "/",
  login: "/login",
  signup: "/signup",
  bookpage: "/bookpage/:id",
  bookAdd: "/book/add",
  bookEdit: "/book/:id/edit",
  bookChaptersEdit: "/book/:id/editChapters",
  myProfile: "/myProfile",
  author: "/author/:id",
  chapterAdd: "/chapter/add/:bookId",
  chapterRead: "/chapter/:chapterId/read",
  chapterEdit: "/chapter/:chapterId/edit",
  myBooks: "/myBooks",
  myComments: "/myComments",
  favorites: "/favorites", // TODO
  policy: "/policy",
  search: "/search/:text",
};

export type UrlArgs = { [arg: string]: any };

export function prepareUrl(url: string, data?: UrlArgs) {
  if (data === undefined) {
    return url;
  }

  var regex = /:(\w+)/g;
  return url.replace(regex, function (match, p1) {
    return data[p1] || ":" + p1;
  });
}

export default Routes;
