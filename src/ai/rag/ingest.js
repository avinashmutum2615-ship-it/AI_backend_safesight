import "dotenv/config";
import mongoose from "mongoose";

import { connectDb } from "../../../config/database.js";
import { loadDocuments } from "./loader.js";
import { splitDocuments } from "./splitter.js";
import { embeddings } from "./embeddings.js";

async function ingest() {
    try {
        await connectDb();

        console.log("📚 Loading documents...");
        const docs = await loadDocuments("./src/ai/knowledge");

        console.log(`Loaded ${docs.length} documents`);

        console.log("✂️ Splitting documents...");
        const chunks = await splitDocuments(docs);

        console.log(`Created ${chunks.length} chunks`);

        console.log("🧠 Generating embeddings...");

        const vectors = await embeddings.embedDocuments(
            chunks.map(chunk => chunk.pageContent)
        );

        const collection = mongoose.connection.collection("knowledge");

        const records = chunks.map((chunk, index) => ({
            text: chunk.pageContent,
            embedding: vectors[index],
            metadata: chunk.metadata,
        }));

        await collection.deleteMany({}); // Optional: clear old data

        await collection.insertMany(records);

        console.log(`✅ Inserted ${records.length} documents`);
        console.log("🎉 Knowledge ingestion completed!");

    } catch (error) {
        console.error(error);
    } finally {
        await mongoose.disconnect();
    }
}

ingest();