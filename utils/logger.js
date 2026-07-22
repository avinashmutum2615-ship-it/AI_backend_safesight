const line = "=".repeat(60);

export function logInfo(title, data = {}) {
    console.log(`\n${line}`);
    console.log(`📌 ${title}`);
    console.log(line);

    for (const [key, value] of Object.entries(data)) {
        console.log(`${key}:`, value);
    }

    console.log(`${line}\n`);
}

export function logSuccess(title, data = {}) {
    console.log(`\n${line}`);
    console.log(`✅ ${title}`);
    console.log(line);

    for (const [key, value] of Object.entries(data)) {
        console.log(`${key}:`, value);
    }

    console.log(`${line}\n`);
}

export function logError(title, error) {
    console.error(`\n${line}`);
    console.error(`❌ ${title}`);
    console.error(line);

    if (error instanceof Error) {
        console.error("Message:", error.message);
        if (error.stack) {
            console.error(error.stack);
        }
    } else {
        console.error(error);
    }

    console.error(`${line}\n`);
}