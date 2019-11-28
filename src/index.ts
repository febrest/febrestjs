import main, { Febrest } from "main";
let version;
try {
  //@ts-ignore
  version = VERSION;
} catch (e) {}

const febrest: Febrest & {
  version: "string";
} = Object.assign({}, main, {
  version
});
export default febrest;
