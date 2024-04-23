import redis from 'redis';

const client = await redis.createClient();
client.connect()


export default client;