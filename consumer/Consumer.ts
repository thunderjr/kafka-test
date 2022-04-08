import { Message, KafkaConsumer } from "node-rdkafka";

interface IHandlers {
  [topic: string]: (message: Message) => void;
}

interface ConsumerParams {
  brokerUrl: string;
  handlers: IHandlers
}

export class Consumer {
  private readonly consumer: KafkaConsumer;

  constructor({ brokerUrl, handlers }: ConsumerParams) {
    this.consumer = new KafkaConsumer({
      'group.id': 'kafka',
      'metadata.broker.list': brokerUrl,
    }, {});

    this.consumer.connect();

    this.consumer.on('ready', () => {
      console.log('Consumer Ready!')

      this.consumer.subscribe(Object.keys(handlers));

      this.consumer.consume();
    }).on('data', (message: Message) => {
      console.log(`New message on topic ${message.topic}`);
      
      handlers[message.topic](message);
    });
  }
}