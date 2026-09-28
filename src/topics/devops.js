// devops.html is a bespoke page (its own tabs/game); it needs the mascot and the lazy game loader.
import { init } from "../shared/mascot.js";
import { initDevopsGameLoader } from "../games/devops-combat/loader.js";

initDevopsGameLoader();
import("../../content/devops/index.js").then((m) => init(m.default));
