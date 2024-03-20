interface DocumentNode {
  nodeId: string;
  libraryId: number;
  docId: string;
  /* 文档内容 */
  text: string;
  score: number;
}

interface Document {
  /* 文档编号 */
  docId: string;
  gmtCreate: string;
  libraryId: number;
  /* 标题 */
  title: string;
  /* 文档链接 */
  url: string;
  nodes: DocumentNode[];
}

interface MessageResultChatDoc {
  content: string;
  finish: boolean;
  model: string;
  documents: Document[];
}
