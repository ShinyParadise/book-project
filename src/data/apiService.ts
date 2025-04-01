import axios from "axios";
import {
  getToken,
  getUserId,
  removeToken,
  removeUserId,
  saveToken,
  saveUserId,
} from "./storage";
import { BookCreate, DBBook, BookUpdate } from "../models/book";
import { DBChapter } from "../models/chapter";
import { DBComment, CommentCreate } from "../models/comment";
import { DBRating, IRating, BookRating } from "../models/rating";
import { DBUserReport, IUserReport, IBookReport } from "../models/report";
import { IUser, UserUpdate, DBUser } from "../models/user";

const API_URL = "http://localhost:8080/";

// Моковые данные
const mockUsers: DBUser[] = [
  {
    _id: "1",
    name: "Иван Иванов",
    email: "ivan@example.com"
  },
  {
    _id: "2",
    name: "Петр Петров",
    email: "petr@example.com"
  }
];

const mockBooks: DBBook[] = [
  {
    _id: "1",
    user: mockUsers[0],
    userId: "1",
    title: "Война и мир",
    summary: "Великий роман Льва Толстого",
    tags: "классика, роман",
    commentRestriction: "all",
    ageRestriction: "12+",
    agreement: true,
    isFavorite: false,
    createdAt: new Date()
  },
  {
    _id: "2",
    user: mockUsers[1],
    userId: "2",
    title: "Преступление и наказание",
    summary: "Роман Федора Достоевского",
    tags: "классика, психология",
    commentRestriction: "all",
    ageRestriction: "16+",
    agreement: true,
    isFavorite: true,
    createdAt: new Date()
  }
];

const mockChapters: DBChapter[] = [
  {
    _id: "1",
    bookId: "1",
    title: "Глава 1",
    text: "Текст первой главы",
    comment: "Комментарий к главе"
  },
  {
    _id: "2",
    bookId: "1",
    title: "Глава 2",
    text: "Текст второй главы",
    comment: "Комментарий к главе"
  }
];

const mockComments: DBComment[] = [
  {
    _id: "1",
    user: mockUsers[0],
    userId: "1",
    bookId: "1",
    content: "Отличная книга!",
    likes: 5
  },
  {
    _id: "2",
    user: mockUsers[1],
    userId: "2",
    bookId: "1",
    content: "Очень интересно!",
    likes: 3
  }
];

const mockRatings: DBRating[] = [
  {
    _id: "1",
    bookId: "1",
    userId: "1",
    grade: 5
  },
  {
    _id: "2",
    bookId: "2",
    userId: "1",
    grade: 4
  }
];

// region user and auth flow
export const register = async (
  name: string,
  email: string,
  password: string,
) => {
  // const response = await axios.post(API_URL + "users/", {
  //   email,
  //   name,
  //   password,
  // });

  // if (response.status >= 200 && response.status < 300 && response.data.token) {
  //   saveToken(response.data.token["access_token"]);
  // }
  // saveUserId(response.data.user["_id"]);

  // return {
  //   status: response.status,
  //   data: response.data,
  // };

  // Моковый ответ
  const mockUser = {
    _id: "3",
    name,
    email
  };
  saveToken("mock_token");
  saveUserId(mockUser._id);
  return {
    status: 200,
    data: {
      token: { access_token: "mock_token" },
      user: mockUser
    }
  };
};

export const login = async (email: string, password: string) => {
  // const response = await axios.post(API_URL + "users/login", {
  //   email,
  //   password,
  // });

  // if (response.status >= 200 && response.status < 300 && response.data.token) {
  //   saveToken(response.data.token["access_token"]);
  // }
  // saveUserId(response.data.user["_id"]);

  // return {
  //   status: response.status,
  //   data: response.data,
  // };

  // Моковый ответ
  const mockUser = mockUsers.find(user => user.email === email);
  if (!mockUser) {
    throw new Error("User not found");
  }
  saveToken("mock_token");
  saveUserId(mockUser._id);
  return {
    status: 200,
    data: {
      token: { access_token: "mock_token" },
      user: mockUser
    }
  };
};

export const getUser = async (id: string): Promise<IUser | null> => {
  // const response = await axios.get(API_URL + "users/" + id);
  // return response.data;

  // Моковый ответ
  return mockUsers.find(user => user._id === id) || null;
};

export const getCurrentUser = async () => {
  const userId = getUserId();
  if (userId === null) return null;
  return await getUser(userId);
};

export const updateUser = async (
  email: string,
  name: string,
  password: string,
  passwordRepeat: string,
): Promise<IUser | null> => {
  const userId = getUserId();
  if (userId === null) return null;
  if (email === "") return null;
  if (name === "") return null;

  // let updatedUser: UserUpdate = { email: email, name: name };
  // if (password !== "" && passwordRepeat === password) {
  //   updatedUser.password = password;
  // }
  // const response = await axios.put(API_URL + "users/" + userId, updatedUser, {
  //   headers: getHeaders(),
  // });
  // return response.data;

  // Моковый ответ
  const userIndex = mockUsers.findIndex(user => user._id === userId);
  if (userIndex === -1) return null;
  
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    email,
    name
  };
  
  return mockUsers[userIndex];
};

export const deleteUser = async () => {
  const userId = getUserId();
  if (userId === null) return;

  // await axios.delete(API_URL + "users/" + userId, {
  //   headers: getHeaders(),
  // });

  // Моковый ответ
  const userIndex = mockUsers.findIndex(user => user._id === userId);
  if (userIndex !== -1) {
    mockUsers.splice(userIndex, 1);
  }
};

export const logout = () => {
  removeToken();
  removeUserId();
};

export const addChapter = async (
  bookId: string,
  title: string,
  text: string,
  comment: string,
) => {
  // const response = await axios.post(
  //   API_URL + "chapters/",
  //   {
  //     bookId,
  //     title,
  //     text,
  //     comment,
  //   },
  //   {
  //     headers: getHeaders(),
  //   },
  // );

  // Моковый ответ
  const newChapter: DBChapter = {
    _id: `${Date.now()}`,
    bookId,
    title,
    text,
    comment
  };
  mockChapters.push(newChapter);
  return newChapter;
};

export const updateChapter = async (
  id: string,
  bookId: string,
  title: string,
  text: string,
  comment: string,
): Promise<DBChapter> => {
  // const response = await axios.put(
  //   API_URL + "chapters/" + id,
  //   {
  //     bookId,
  //     title,
  //     text,
  //     comment,
  //   },
  //   {
  //     headers: getHeaders(),
  //   },
  // );

  // Моковый ответ
  const chapterIndex = mockChapters.findIndex(chapter => chapter._id === id);
  if (chapterIndex === -1) throw new Error("Chapter not found");
  
  mockChapters[chapterIndex] = {
    ...mockChapters[chapterIndex],
    bookId,
    title,
    text,
    comment
  };
  
  return mockChapters[chapterIndex];
};

export const deleteChapter = async (id: string) => {
  // await axios.delete(API_URL + "chapters/" + id, {
  //   headers: getHeaders(),
  // });

  // Моковый ответ
  const chapterIndex = mockChapters.findIndex(chapter => chapter._id === id);
  if (chapterIndex !== -1) {
    mockChapters.splice(chapterIndex, 1);
  }
};

export async function getChapters(bookId: string): Promise<DBChapter[]> {
  // const response = await axios.get(API_URL + "chapters/book/" + bookId);
  // return response.data;

  // Моковый ответ
  return mockChapters.filter(chapter => chapter.bookId === bookId);
}

export const getChapter = async (id: string): Promise<DBChapter> => {
  // const response = await axios.get(API_URL + "chapters/" + id);
  // return response.data;

  // Моковый ответ
  const chapter = mockChapters.find(chapter => chapter._id === id);
  if (!chapter) throw new Error("Chapter not found");
  return chapter;
};

export const addBook = async (
  title: string,
  ageRestriction: string,
  tags: string,
  summary: string,
  commentRestriction: string,
  agreement: boolean,
) => {
  // const response = await axios.post(
  //   API_URL + "books/",
  //   {
  //     title,
  //     ageRestriction,
  //     tags,
  //     summary,
  //     commentRestriction,
  //     agreement,
  //   },
  //   {
  //     headers: getHeaders(),
  //   },
  // );

  // Моковый ответ
  const userId = getUserId();
  if (!userId) throw new Error("User not found");
  
  const user = mockUsers.find(u => u._id === userId);
  if (!user) throw new Error("User not found");

  const newBook: DBBook = {
    _id: `${Date.now()}`,
    user,
    userId,
    title,
    ageRestriction,
    tags,
    summary,
    commentRestriction,
    agreement,
    isFavorite: false,
    createdAt: new Date()
  };
  
  mockBooks.push(newBook);
  return newBook;
};

export const updateBook = async (
  id: string,
  title: string,
  ageRestriction: string,
  tags: string,
  summary: string,
  commentRestriction: string,
): Promise<DBBook | undefined> => {
  // const response = await axios.put(
  //   API_URL + "books/" + id,
  //   {
  //     title,
  //     ageRestriction,
  //     tags,
  //     summary,
  //     commentRestriction,
  //   },
  //   {
  //     headers: getHeaders(),
  //   },
  // );

  // Моковый ответ
  const bookIndex = mockBooks.findIndex(book => book._id === id);
  if (bookIndex === -1) return undefined;
  
  mockBooks[bookIndex] = {
    ...mockBooks[bookIndex],
    title,
    ageRestriction,
    tags,
    summary,
    commentRestriction
  };
  
  return mockBooks[bookIndex];
};

export const deleteBook = async (id: string) => {
  // await axios.delete(API_URL + "books/" + id, {
  //   headers: getHeaders(),
  // });

  // Моковый ответ
  const bookIndex = mockBooks.findIndex(book => book._id === id);
  if (bookIndex !== -1) {
    mockBooks.splice(bookIndex, 1);
  }
};

export async function getBooks(): Promise<DBBook[]> {
  // const response = await axios.get(API_URL + "books/");
  // return response.data;

  // Моковый ответ
  return mockBooks;
}

export async function getCurrentUserBooks(): Promise<DBBook[]> {
  // const response = await axios.get(API_URL + "books/user/", {
  //   headers: getHeaders(),
  // });
  // return response.data;

  // Моковый ответ
  const userId = getUserId();
  if (!userId) return [];
  return mockBooks.filter(book => book.userId === userId);
}

export async function getUserBooks(id: string): Promise<DBBook[]> {
  // const response = await axios.get(API_URL + "books/user/" + id);
  // return response.data;

  // Моковый ответ
  return mockBooks.filter(book => book.userId === id);
}

export const getBook = async (id: string): Promise<DBBook> => {
  // const response = await axios.get(API_URL + "books/" + id);
  // return response.data;

  // Моковый ответ
  const book = mockBooks.find(book => book._id === id);
  if (!book) throw new Error("Book not found");
  return book;
};

export async function getCommentsByBook(bookId: string): Promise<DBComment[]> {
  // const response = await axios.get(API_URL + "comments/book/" + bookId);
  // return response.data;

  // Моковый ответ
  return mockComments.filter(comment => comment.bookId === bookId);
}

export async function getCommentsByUser(): Promise<DBComment[]> {
  // const response = await axios.get(API_URL + "comments/user/", {
  //   headers: getHeaders(),
  // });
  // return response.data;

  // Моковый ответ
  const userId = getUserId();
  if (!userId) return [];
  return mockComments.filter(comment => comment.userId === userId);
}

export const addComment = async (
  bookId: string,
  content: string,
): Promise<DBComment> => {
  // const response = await axios.post(
  //   API_URL + "comments/",
  //   {
  //     bookId,
  //     content,
  //   },
  //   {
  //     headers: getHeaders(),
  //   },
  // );

  // Моковый ответ
  const userId = getUserId();
  if (!userId) throw new Error("User not found");
  
  const user = mockUsers.find(u => u._id === userId);
  if (!user) throw new Error("User not found");

  const newComment: DBComment = {
    _id: `${Date.now()}`,
    user,
    userId,
    bookId,
    content,
    likes: 0
  };
  
  mockComments.push(newComment);
  return newComment;
};

export async function deleteComment(commentId: string) {
  // await axios.delete(API_URL + "comments/" + commentId, {
  //   headers: getHeaders(),
  // });

  // Моковый ответ
  const commentIndex = mockComments.findIndex(comment => comment._id === commentId);
  if (commentIndex !== -1) {
    mockComments.splice(commentIndex, 1);
  }
}

export async function getFavoriteBooks(): Promise<DBBook[]> {
  // const response = await axios.get(API_URL + "books/favorite/", {
  //   headers: getHeaders(),
  // });
  // return response.data;

  // Моковый ответ
  return mockBooks.filter(book => book.isFavorite);
}

export async function addFavoriteBook(bookId: string) {
  // await axios.post(API_URL + "books/favorite/" + bookId, null, {
  //   headers: getHeaders(),
  // });

  // Моковый ответ
  const bookIndex = mockBooks.findIndex(book => book._id === bookId);
  if (bookIndex !== -1) {
    mockBooks[bookIndex].isFavorite = true;
  }
}

export async function deleteFavoriteBook(bookId: string): Promise<DBBook> {
  // const response = await axios.delete(API_URL + "books/favorite/" + bookId, {
  //   headers: getHeaders(),
  // });
  // return response.data;

  // Моковый ответ
  const bookIndex = mockBooks.findIndex(book => book._id === bookId);
  if (bookIndex !== -1) {
    mockBooks[bookIndex].isFavorite = false;
  }
  return mockBooks[bookIndex];
}

export async function sendUserReport(
  reportedUserId: string,
  reportText: string,
): Promise<DBUserReport> {
  // const response = await axios.post(
  //   API_URL + "reports/user/",
  //   {
  //     reportedUserId,
  //     report: reportText,
  //   },
  //   {
  //     headers: getHeaders(),
  //   },
  // );
  // return response.data;

  // Моковый ответ
  const userId = getUserId();
  if (!userId) throw new Error("User not found");

  const newReport: DBUserReport = {
    _id: `${Date.now()}`,
    userId,
    reportedUserId,
    report: reportText
  };
  
  return newReport;
}

export async function sendBookReport(
  reportedBookId: string,
  reportText: string,
): Promise<IBookReport> {
  // const response = await axios.post(
  //   API_URL + "reports/book/",
  //   {
  //     reportedBookId,
  //     report: reportText,
  //   },
  //   {
  //     headers: getHeaders(),
  //   },
  // );
  // return response.data;

  // Моковый ответ
  const userId = getUserId();
  if (!userId) throw new Error("User not found");

  const newReport: IBookReport = {
    userId,
    reportedBookId,
    report: reportText
  };
  
  return newReport;
}

export async function updateRating(
  bookId: string,
  grade: number,
): Promise<DBRating> {
  // const response = await axios.post(
  //   API_URL + "ratings/",
  //   {
  //     bookId,
  //     grade,
  //   },
  //   {
  //     headers: getHeaders(),
  //   },
  // );
  // return response.data;

  // Моковый ответ
  const userId = getUserId();
  if (!userId) throw new Error("User not found");

  const existingRatingIndex = mockRatings.findIndex(
    rating => rating.bookId === bookId && rating.userId === userId
  );

  if (existingRatingIndex !== -1) {
    mockRatings[existingRatingIndex].grade = grade;
    return mockRatings[existingRatingIndex];
  }

  const newRating: DBRating = {
    _id: `${Date.now()}`,
    bookId,
    userId,
    grade
  };
  
  mockRatings.push(newRating);
  return newRating;
}

export async function getUserRating(bookId: string): Promise<DBRating> {
  // const response = await axios.get(API_URL + "ratings/user/" + bookId, {
  //   headers: getHeaders(),
  // });
  // return response.data;

  // Моковый ответ
  const userId = getUserId();
  if (!userId) throw new Error("User not found");

  const rating = mockRatings.find(
    rating => rating.bookId === bookId && rating.userId === userId
  );
  
  if (!rating) throw new Error("Rating not found");
  return rating;
}

export async function getBookRating(bookId: string): Promise<BookRating | null> {
  // const response = await axios.get(API_URL + "ratings/book/" + bookId);
  // return response.data;

  // Моковый ответ
  const bookRatings = mockRatings.filter(rating => rating.bookId === bookId);
  if (bookRatings.length === 0) return null;

  const averageRating = bookRatings.reduce((sum, rating) => sum + rating.grade, 0) / bookRatings.length;
  return {
    bookId,
    rating: averageRating
  };
}

export async function searchBooks(book: string): Promise<DBBook[]> {
  // const response = await axios.get(API_URL + "books/search/" + book);
  // return response.data;

  // Моковый ответ
  return mockBooks.filter(b => 
    b.title.toLowerCase().includes(book.toLowerCase()) ||
    b.summary.toLowerCase().includes(book.toLowerCase())
  );
}

export async function searchAuthors(name: string): Promise<DBUser[]> {
  // const response = await axios.get(API_URL + "users/search/" + name);
  // return response.data;

  // Моковый ответ
  return mockUsers.filter(user => 
    user.name.toLowerCase().includes(name.toLowerCase())
  );
}

function getHeaders() {
  const token = getToken();
  return {
    Authorization: `Bearer ${token}`,
  };
}
