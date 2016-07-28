import devConfig from './development';
import defaultConfig from './default';

const devMode = __DEVELOPMENT__ ? devConfig : undefined;

export default {
  ...defaultConfig,
  ...devMode,
};
