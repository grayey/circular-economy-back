import * as fs from 'fs';
import { EnvironmentVariables } from 'src/interfaces/environment.interface';

let environment: EnvironmentVariables;
try {
  environment = JSON.parse(
    fs.readFileSync('src/environments/env.json', 'utf8'),
  );
} catch (e) {
  environment = {} as EnvironmentVariables;
}

export default environment;
