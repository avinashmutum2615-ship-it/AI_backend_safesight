import { DynamicStructuredTool } from "@langchain/core/tools";

export function createTool({
    name,
    description,
    schema,
    handler,
}) {
    return new DynamicStructuredTool({

        name,

        description,

        schema,

       func: async (input, config) => {

            try {

                const result = await handler(input, config);

                return JSON.stringify({
                    success: true,
                    data: result,
                });

            } catch (error) {

                return JSON.stringify({
                    success: false,
                    message: error.message,
                });

            }

        },

    });
}