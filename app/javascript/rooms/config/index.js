import development from './development';
import test from './test';
import production from './production';

const envName = process.env.NODE_ENV;

// TODO: ここはもっとうまくできそうな気がする
function environmentConfig() {
  switch (envName) {
    case 'production':
      return production;
    case 'test':
      return test;
    case 'development':
    default:
      return development;
  }
}
const config = environmentConfig();

export default config;
