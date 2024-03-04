import app, { init } from "./index";
import { env } from "./config/env.config";

const port = env.PORT;

init().then(() => {
  app.listen(port, () => {
    console.log(`Server listening in http://localhost:${port}`);
  });
});
