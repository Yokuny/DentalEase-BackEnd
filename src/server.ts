import app, { init } from "./index";

const port = process.env.PORT || 8080;

init().then(() => {
  app.listen(port, () => {
    console.log(`Server listening in http://localhost:${port}`);
  });
});
