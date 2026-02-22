import main, { Febrest } from './main';
let version = '1.0.0';
try {
  //@ts-ignore
  version = VERSION;
} catch (e) {}

const febrest: Febrest & {
  version: string;
} = {
  ...main,
  version,
};
export default febrest;
