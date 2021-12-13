import Redis from 'redis';
import Bluebird from 'bluebird';
import logger from '../config/logger';
import config from '../config/config';

Bluebird.promisifyAll(Redis.RedisClient.prototype);
Bluebird.promisifyAll(Redis.Multi.prototype);

const redisClient = Redis.createClient(
  config.redis.port,
  config.redis.url,
  { no_ready_check: true },
);
redisClient.auth(config.redis.password, (error) => {
  if (error) logger.error('Redis auth error', error);
});

const redisPub = Redis.createClient(
  config.redis.port,
  config.redis.url,
  { no_ready_check: true },
);
redisPub.auth(config.redis.password, (error) => {
  if (error) logger.error('Redis auth error', error);
});

const redisSub = Redis.createClient(
  config.redis.port,
  config.redis.url,
  { no_ready_check: true },
);
redisSub.auth(config.redis.password, (error) => {
  if (error) logger.error('Redis auth error', error);
});

// Production
// const redisClient = redis.createClient(process.env.REDIS_URL);

redisClient.on('connect', () => {
  logger.info('Redis client is connected');
});
redisClient.on('error', (error) => {
  logger.error('Redis client not connected', error);
});

redisPub.on('connect', () => {
  logger.info('Redis publisher is connected');
});
redisPub.on('error', (error) => {
  logger.error('Redis publisher not connected', error);
});

redisSub.on('connect', () => {
  logger.info('Redis subscriber is connected');
});
redisSub.on('error', (error) => {
  logger.error('Redis subscriber not connected', error);
});

export default redisClient;

export { redisPub, redisSub };
