const logger = require('node-color-log');
logger.setLevel('success');

// shows everytime
logger.log('hello world [LOG]');
// respects log level
logger.success('hello world [SUCCESS]');
logger.debug('hello world [DEBUG]');
logger.info('hello world [INFO]');
logger.warn('hello world [WARN]');
logger.error('hello world [ERROR]');

export {};