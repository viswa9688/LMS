import { logger } from './logger.js';

export const findAvailablePort = async (startPort) => {
  const net = await import('net');
  
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    
    server.once('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        // Port is in use, try the next one
        findAvailablePort(startPort + 1)
          .then(resolve)
          .catch(reject);
      } else {
        reject(err);
      }
    });

    server.once('listening', () => {
      const { port } = server.address();
      server.close(() => {
        resolve(port);
      });
    });

    server.listen(startPort);
  });
};

export const startServer = async (app, port) => {
  try {
    const availablePort = await findAvailablePort(port);
    
    if (availablePort !== port) {
      logger.warn(`Port ${port} was in use, using port ${availablePort} instead`);
    }
    
    app.listen(availablePort, () => {
      logger.info(`Server running on port ${availablePort}`);
    });
    
    return availablePort;
  } catch (error) {
    logger.error('Failed to start server:', error);
    throw error;
  }
};