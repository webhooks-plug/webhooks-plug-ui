export interface IMessage {
  id: string;
  status: number;
  delivery_attempts: number;
  delivered_at: string;
  endpoint: string;
  created_on: string;
  nameOfUser: string;
  payload: any;
}
