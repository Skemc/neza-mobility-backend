/* eslint-disable no-param-reassign */
import http from 'http';
import socketIO from 'socket.io';
import redisAdapter from 'socket.io-redis';
import mongoose from 'mongoose';
import app from './app';
import { redisPub, redisSub } from './database/redis';
import config from './config/config';
import logger from './config/logger';
import { tokenService, messageService } from './services';
import presence from './utils/presence';
import { initEvent } from './events/notification';

const server = http.createServer(app);
server.listen(config.port, () =>
  logger.info(
    `Server is listening on port ${config.port} ${config.env}!`,
  ),
);

const io = socketIO(server);
io.adapter(
  redisAdapter({ pubClient: redisPub, subClient: redisSub }),
);

io.use(async (socket, next) => {
  const { token } = socket.handshake.query;
  try {
    if (token) {
      const decoded = await tokenService.verifyToken(token);
      const userId = decoded.sub;

      presence.upsert(userId, socket.id);

      socket.authenticated = true;
      socket.userId = userId;
      socket.id = userId;
    }
    return next();
  } catch (error) {
    logger.error('Invalid socket io token provided');
    return next(error);
  }
});

app.use((req, res, next) => {
  req.io = io;
  next();
});

io.on('connection', (socket) => {
  logger.info(`A user connected ${socket.id} ${socket.userId}!`);

  socket.conn.on('packet', (packet) => {
    if (socket.authenticated && packet.type === 'ping') {
      presence.refresh(socket.userId, socket.id);
    }
  });

  socket.on('position', async (position) => {
    logger.info(
      `position\n-----------------\n${JSON.stringify(position)}`,
    );
    socket.emit('last_position', position);
    await presence.addLocation(position);
    // await locationService.updateCurrentDriverLocation(position);
  });

  socket.on('update_pickup_location', async (location) => {
    logger.info(
      `update_pickup_location\n-----------------\n${JSON.stringify(
        location,
      )}`,
    );
    const nearbyDrivers = await presence.getNearByDrivers(location);
    socket.emit('nearby_drivers', nearbyDrivers);
    logger.info(
      `nearby_drivers\n-----------------\n${JSON.stringify(
        nearbyDrivers,
      )}`,
    );
  });

  socket.on('message', async (msg) => {
    console.log(`message`, msg);
    const message = await messageService.createMessage(msg);
    io.to(msg.receiverId).emit('message', message);
    console.log(`sent message`, message);
  });

  // socket.on('nearby_drivers', async (position) => {
  //   logger.info(
  //     `position\n-----------------\n${JSON.stringify(position)}`,
  //   );
  //   const nearByDrivers = presence.getNearByDrivers(position);
  //   socket.broadcast.emit('last_position', nearByDrivers);
  //   // await locationService.updateCurrentDriverLocation(position);
  // });

  socket.on('disconnect', () => {
    logger.info(`A user disconnected ${socket.id} ${socket.userId}!`);
    if (socket.authenticated) {
      presence.remove(socket.userId);
      presence.removeLocation(socket.userId);
      socket.authenticated = false;
    }
  });

  // socket.on('notification:trip', () => {
  //   initNotificationEvent(io);
  // });
});

initEvent(io);

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.warn('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);
process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close((err) => {
      if (err) {
        logger.error(err);
        process.exit(1);
      }
    });
  }
});
process.on('SIGINT', () => {
  logger.info('SIGINT signal received.');

  // Stops the server from accepting new connections and finishes existing connections.
  server.close((err) => {
    if (err) {
      logger.error(err);
      process.exit(1);
    }
  });

  // close your database connection and exit with success (0 code)
  // for example with mongoose
  mongoose.connection.close(() => {
    logger.warn('MongoDB is disconnected');
    process.exit(0);
  });
});
process.on('message', (msg) => {
  if (msg === 'shutdown') {
    logger.warn('Closing all connections...');
    setTimeout(() => {
      logger.warn('Finished closing connections');
      process.exit(0);
    }, 1500);
  }
});
