export interface Comment {
  labId: string;
  labName: string;
  statement: string;
  createdAts: string; // 追加: コメントの作成日時
  likes: number;
}