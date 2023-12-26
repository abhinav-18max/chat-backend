export type createConversationParams = {
  authorId: number;
  recipientId: number;
  message: string;
};

export interface Iconversation {
  createConversation(createConversationDetails: createConversationParams);
}
