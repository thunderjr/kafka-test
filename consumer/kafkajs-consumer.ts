import { Kafka, Consumer, EachMessagePayload } from 'kafkajs';
import { BROKER_URL } from '../constants';
import { KafkaClient } from '../shared/kafkajs-client';
import { ConsumerParams, IConsumer } from "./IConsumer";

export class KafkaJsConsumer implements IConsumer<Consumer> {
  public readonly consumer: Consumer;
  public isReady: boolean = false;
  private kafkaInstance: Kafka;
  
  constructor(params: ConsumerParams) {
    this.kafkaInstance = KafkaClient.getInstance('client');

    this.consumer = this.kafkaInstance.consumer({
      groupId: `kafka-${Date.now()}`
    });

    this.connect(params);
  }

  public async connect({ handlers }: ConsumerParams) {
    await this.consumer.connect();
    
    Object.keys(handlers).forEach(async topic => {
      await this.consumer.subscribe({ topic, fromBeginning: true })
    });

    await this.consumer.run({
      eachMessage: async ({ topic, message }: EachMessagePayload) => {
        console.log(`New message on topic ${topic}`);
        handlers[topic](message);
      },
    })
  }
}