export interface IReport {
  userId: string;
  report: string;
}

export interface IUserReport extends IReport {
  reportedUserId: string;
}

export interface DBUserReport extends IUserReport {
  _id: string;
}

export interface IBookReport extends IReport {
  reportedBookId: string;
}

export interface DBBookReport extends IBookReport {
  _id: string;
}
