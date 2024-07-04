import { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 5000,
  },
  cors: {
    enabled: true,
  },
  swagger: {
    enabled: true,
    title: 'Restaurant Api',
    description: 'rest api for restaurant system',
    version: '1',
    path: 'api',
  },
  security: {
    // expiresIn: '2m',
    expiresIn: '7d',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
