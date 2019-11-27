import Observer from "observer";
import { ObserverListener } from "observer/Observer";

function observe(l: ObserverListener) {
  return Observer.observe(l);
}
export { observe };
