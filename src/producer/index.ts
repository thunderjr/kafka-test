import { KafkaJsProducer } from './kafkajs-producer';

const producer = new KafkaJsProducer();

setInterval(async () => {
  const result = await producer.produce({
    topic: 'message.sms',
    value: 'F ' + Date.now()
  });

  console.log({result})
}, 1000);


