export interface About {
  id: number;
  documentId: string;
  body: {
    type: string;
    children: {
      text: string;
      type: string;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
}
export interface AboutContent {
  body: About['body'];
}
