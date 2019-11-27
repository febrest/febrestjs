import main from "main";
let version;
try {
  //@ts-ignore
  version = VERSION;
} catch (e) {}

const febrest = Object.assign({}, main, {
  version
});
export default febrest;
