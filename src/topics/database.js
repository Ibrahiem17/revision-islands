import { mountTopic } from "../shared/topic-page.js";

mountTopic("database", () => import("../../content/database/index.js"));
