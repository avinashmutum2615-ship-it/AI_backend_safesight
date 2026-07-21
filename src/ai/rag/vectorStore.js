import mongoose from "mongoose";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
import { embeddings } from "./embeddings.js";

const collection = mongoose.connection.collection("knowledge");

export const vectorStore = new MongoDBAtlasVectorSearch(
    embeddings,
    {
        collection,
        indexName: "vector_index",
        textKey: "text",
        embeddingKey: "embedding",
    }
);