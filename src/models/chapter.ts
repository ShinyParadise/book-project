export interface IChapter {
    bookId: string;
    title: string;
    text: string;
    comment: string;
  }
  
  export type DBChapter = IChapter & {
    _id: string;
  };
  