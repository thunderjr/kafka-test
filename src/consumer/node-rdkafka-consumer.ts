import { Message, KafkaConsumer } from "node-rdkafka";
import { ConsumerParams, IConsumer } from './IConsumer';

export class NodeRdKafkaConsumer implements IConsumer<KafkaConsumer> {
  consumer: KafkaConsumer;

  public async connect({ handlers }: ConsumerParams) {
    this.consumer = new KafkaConsumer({
      'group.id': `kafka-${Date.now()}`,
      'metadata.broker.list': 'brokerUrl',
      'bootstrap.servers': 'brokerUrl'
    }, {});

    this.consumer.connect({}, (err, result) => {
      if (err) throw err;
      console.log({result, topics: result.topics, brokers: result.brokers});

      this.consumer.on('ready', () => {
        console.log('Consumer Ready!')
  
        this.consumer.subscribe(Object.keys(handlers));
  
        this.consumer.consume();
      }).on('data', (message: Message) => {
        console.log(`New message on topic ${message.topic}`);
        
        handlers[message.topic](message);
      });
    });
  }
}