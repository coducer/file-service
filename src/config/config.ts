import { config } from 'dotenv';
config();

interface ICONFIG {
  node_env: string;
  port: number;
  ip: string;
  spaces_key: string;
  spaces_secret: string;
  spaces_region: string;
  spaces_bucket: string;
  spaces_endpoint: string;
}

let _config: ICONFIG;

const configuration = () => {
  if (!_config) {
    _config = {
      node_env: process.env.NODE_ENV || 'development',
      port: parseInt(process.env.PORT) || 3000,
      ip: process.env.IP || '127.0.0.1',
      spaces_key: process.env.DO_SPACE_KEY,
      spaces_secret: process.env.DO_SPACE_SECRET,
      spaces_region: process.env.DO_SPACE_REGION,
      spaces_bucket: process.env.DO_SPACE_BUCKET,
      spaces_endpoint: process.env.DO_SPACE_ENDPOINT,
    };

    let toExit = false;
    for (const key in _config) {
      if (_config.hasOwnProperty(key) && typeof _config[key] === 'undefined') {
        console.error('not defined \t-\t' + key);
        toExit = true;
      }
    }

    if (toExit) {
      console.error('process exiting');
      process.exit(-1);
    }
  }

  return _config;
};

export const env = configuration();
