import { join } from 'path';

const getNpmBuildPath = (appRoot: string) => {
  return join(appRoot, 'node_modules', 'lucidy', 'build');
};

export default { getNpmBuildPath };
