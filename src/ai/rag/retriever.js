import mongoose from "mongoose";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { embeddings } from "./embeddings.js";

export function getRetriever() {
    const collection = mongoose.connection.db.collection("knowledge");

    const vectorStore = new MongoDBAtlasVectorSearch(embeddings, {
        collection,
        indexName: "vector_index",
        textKey: "text",
        embeddingKey: "embedding",
    });

    return vectorStore.asRetriever({
        k: 3,
    });
}