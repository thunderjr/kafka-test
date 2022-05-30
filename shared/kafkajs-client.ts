import { Kafka } from "kafkajs";
import { BROKER_URL } from "../constants";

export class KafkaClient {
  public static instance: Kafka;

  public static getInstance(clientId = 'kafka-test'): Kafka {
    if (!KafkaClient.instance) {
      KafkaClient.instance = new Kafka({
        clientId,
        brokers: [BROKER_URL],
      });
    }
    
    return KafkaClient.instance;
  }
}