import { KafkaJsConsumer } from "./kafkajs-consumer";

new KafkaJsConsumer({
  handlers: {
    'message.sms': (data) => {
      console.log(`[${new Date().toLocaleDateString()}] ${data.value.toString()}`);
      console.log('\n')
    },
    'invoice.installment.operated': (data) => {
      console.log(`[${new Date().toLocaleDateString()}] ${data.value.toString()}`);
      console.log('\n')
    }
  }
});
