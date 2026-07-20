import { RecursiveCharacterTextSplitter }
from "@langchain/textsplitters";

const splitter = new RecursiveCharacterTextSplitter({

    chunkSize: 1000,

    chunkOverlap: 200,

});

export const splitDocuments = async (documents) => {

    return splitter.splitDocuments(documents);

};