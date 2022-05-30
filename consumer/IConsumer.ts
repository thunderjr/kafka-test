export interface IHandlers<T> {
  [topic: string]: (message: T) => void;
}

export interface ConsumerParams {
  brokerUrl: string;
  handlers: IHandlers<any>
}

export interface IConsumer<T> {
  consumer: T;

  connect(params: ConsumerParams): Promise<any>;
}