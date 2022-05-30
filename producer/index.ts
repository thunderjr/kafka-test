import { KafkaJsProducer } from './kafkajs-producer';

const producer = new KafkaJsProducer();

setInterval(async () => {
  const result = await producer.produce({
    topic: 'test-topic',
    value: 'F ' + Date.now()
  });

  console.log({result})
}, 1000);


