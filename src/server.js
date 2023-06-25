const App = require("./index");
const router = require("./routes/index");

// prettier-ignore
const app = new App([
    new router.ComputerRoutes(),
    new router.AuthRoutes(),
    new router.CategoryRoutes(),
    new router.ModelRoutes(),
    new router.BrendRoutes(),
])

app.run();
