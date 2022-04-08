import { Producer as KafkaProducer } from "node-rdkafka";

interface ProduceParams {
  topic: string;
  key?: string;
  value: string;
}

export class Producer {
  private readonly producer: KafkaProducer;
  public isReady: boolean = false;
  
  constructor(brokerUrl: string) {
    this.producer = new KafkaProducer({
      'metadata.broker.list': brokerUrl
    });

    this.producer.connect();

    this.producer.on('event.error', (err) => {
      console.error('[PRODUCER] Error from producer');
      console.error(err);
    });

    this.producer.on('ready', () => {
      this.isReady = true;
    });
  }

  public produce({ topic, key, value }: ProduceParams) {
    try {
      const result = this.producer.produce(
        topic,
        -1,
        Buffer.from(value),
        key,
        Date.now()
      );

      console.log({ result })
      console.log('\n')
      } catch (err) {
        console.error("[PRODUCER] Error processing message...");
        console.error(err);
    }
  }
}