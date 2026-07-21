import fs from "fs";
import path from "path";
import { Document } from "@langchain/core/documents";

export async function loadDocuments(rootDir) {
    const docs = [];

    function walk(dir) {
        const files = fs.readdirSync(dir);

        for (const file of files) {
            const fullPath = path.join(dir, file);

            if (fs.statSync(fullPath).isDirectory()) {
                walk(fullPath);
            } else if (file.endsWith(".md")) {
                const content = fs.readFileSync(fullPath, "utf8");

                docs.push(
                    new Document({
                        pageContent: content,
                        metadata: {
                            source: file,
                            category: path.basename(path.dirname(fullPath)),
                        },
                    })
                );
            }
        }
    }

    walk(rootDir);

    return docs;
}