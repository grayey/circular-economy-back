import { EnvironmentVariables } from "src/interfaces/environment.interface";
import { AppEnvironments } from "src/utils/enums";

const env = process.env.NODE_ENV;
const appMode = env ? env.trim() : AppEnvironments.DEVELOPMENT;
const environment: EnvironmentVariables = require(`./${appMode}`).default;
export default environment;
