import { BROKER_URL } from "../constants";
import { KafkaJsConsumer } from "./kafkajs-consumer";

const consumer = new KafkaJsConsumer({
  brokerUrl: BROKER_URL,
  handlers: {
    'test-topic': (data) => {
      console.log(`[${new Date().toLocaleDateString()}] ${data.value.toString()}`);
      console.log('\n')
    }
  }
});
