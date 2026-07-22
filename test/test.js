import "dotenv/config";
import { connectDb } from "../config/database.js";
import { answerQuestion } from "../src/ai/rag/answerQuestion.js";

async function main() {
    await connectDb();

    const answer = await answerQuestion(
        "What is cataract?"
    );

    console.log(answer);

    process.exit();
}

main();