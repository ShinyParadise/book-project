export interface IRating {
  bookId: string;
  userId: string;
  grade: number;
}

export interface DBRating extends IRating {
  _id: string;
}

export interface BookRating {
  bookId: string;
  rating: number;
}
