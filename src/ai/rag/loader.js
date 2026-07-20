import fs from "fs/promises";
import path from "path";
import pdf from "pdf-parse";

export const loadPDFs = async (folderPath) => {

    const files = await fs.readdir(folderPath);

    const documents = [];

    for (const file of files) {

        if (!file.endsWith(".pdf")) continue;

        const buffer = await fs.readFile(
            path.join(folderPath, file)
        );

        const data = await pdf(buffer);

        documents.push({

            pageContent: data.text,

            metadata: {
                source: file,
            },

        });

    }

    return documents;

};