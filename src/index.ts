import app from "./app";
import { AppDataSource } from "./db/conexion";

async function main() {
  try {
    await AppDataSource.initialize();
    console.log('bdconectada')
    app.listen(3000, () => {
      console.log("server acctive");
    });
  } catch (error) {
    if(error instanceof Error){
        console.log(error.message)
    }
  }
}
main();
