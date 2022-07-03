interface ProduceParams {
  topic: string;
  key?: string;
  value: string;
}

export interface IProducer<T> {
  producer: T;
  isReady: boolean;
  
  connect: () => Promise<any>;
  produce: ({ topic, key, value }: ProduceParams) => any;
}