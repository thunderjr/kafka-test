import { KafkaJsConsumer } from "./kafkajs-consumer";

new KafkaJsConsumer({
  handlers: {
    'test-topic': (data) => {
      console.log(`[${new Date().toLocaleDateString()}] ${data.value.toString()}`);
      console.log('\n')
    }
  }
});
