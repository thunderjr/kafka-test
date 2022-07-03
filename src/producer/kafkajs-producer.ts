import { Kafka, Producer } from 'kafkajs';
import { KafkaClient } from '../shared/kafkajs-client';
import { IProducer } from "./IProducer";

interface ProduceParams {
  topic: string;
  key?: string;
  value: string;
}

export class KafkaJsProducer implements IProducer<Producer> {
  public readonly producer: Producer;
  public isReady: boolean = false;
  private kafkaInstance: Kafka;
  
  constructor() {
    this.kafkaInstance = KafkaClient.getInstance();
    this.producer = this.kafkaInstance.producer();

    this.connect();

    this.producer.on('producer.connect', () => {
      this.isReady = true;
    });

    this.producer.on('producer.disconnect', () => {
      this.isReady = false;
    });

    this.producer.on('producer.network.request_timeout', e => {
      console.warn('[Producer] Connection timeout...', e);
    });
  }

  public async connect() {
    try {
      await this.producer.connect();
    } catch (err) {
      console.log(`[Producer] Connection error...`);
      console.log(err);
    }
  }

  public async produce({ topic, value }: ProduceParams) {
    try {
      if (!this.isReady) throw new Error('The producer is disconnected!');

      await this.producer.send({
        topic,
        messages: [
          { value: Buffer.from(value), key: 'key', timestamp: Date.now().toString() }
        ],
      });

      return Date.now();
      } catch (err) {
        console.error("[PRODUCER] Error processing message...");
        console.error(err);
    }
  }
}