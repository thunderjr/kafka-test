import { BROKER_URL } from '../constants';
import { Producer } from './Producer';

const producer = new Producer(BROKER_URL);

setInterval(() => {
  producer.isReady && producer.produce({
    topic: 'test-topic',
    value: 'Flavio Marques - Hello from Kafka'
  });
}, 1000);


