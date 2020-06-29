import { Server } from "./Server";
require("dotenv").config();

async function main():Promise<void>
{
	new Server(parseInt(process.env.PORT || "3000"));
}

main().catch((err:Error) => {
	console.log(err.stack);
	process.exit(1);
});
