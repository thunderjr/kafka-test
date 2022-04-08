import { BROKER_URL } from "../constants";
import { Consumer } from "./Consumer";

new Consumer({
  brokerUrl: BROKER_URL,
  handlers: {
    'test-topic': (data) => {
      console.log(`[${new Date(data.timestamp)}] ${data.value.toString()}`);
      console.log('\n')
    }
  }
});