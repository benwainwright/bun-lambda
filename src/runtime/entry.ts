import { run } from "aws-lambda-ric"
import path from "node:path";

if(process.argv.length < 3) {
  throw new Error("No handler specified");
}

const appRoot = path.join(process.cwd(), '..');
const handler = process.env['_HANDLER']

console.log(`Executing '${handler}' in function directory '${appRoot}'`);
run(appRoot, handler);
