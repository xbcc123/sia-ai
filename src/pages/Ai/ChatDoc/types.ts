export interface Library {
	id: number;
	gmtCreate: string;
	gmtModified: string;
	libraryName: string;
	description: string;
	similarityTopK: number;
	promptTemplate: string;
	defaultApiKey: string;
	ownerUserId: string;
	documentCount: number;
	totalTokens: number;
	queryCount: number;
  }
  

export interface libraryDocument {
	docId: string;
	gmtCreate: string;
	gmtModified: string;
	libraryId: number;
	title: string;
	url?: string;
	fileType: string;
	totalTokens: number;
	vectorSize: number;
	statusCode: string;
	statusMessage?: string;
}