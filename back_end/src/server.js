import app from "./app.js";

const startServer = async () => {
  try {
    app.listen(3000,() => {
      console.log("server listo http://localhost:3000");
    })
  } catch (error) {
      console.log("error en el server", error);
    }
};

startServer();