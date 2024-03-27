const appInit = require("./App");

appInit().then((app) => {
  app.listen(process.env.PORT, () => {
    console.log(`Example app listening at http://localhost:${process.env.PORT}`);
  });
});

