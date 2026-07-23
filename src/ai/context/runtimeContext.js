import { AsyncLocalStorage } from "node:async_hooks";

const asyncLocalStorage = new AsyncLocalStorage();

export function runWithContext(context, callback) {
    return asyncLocalStorage.run(context, callback);
}

export function getRuntimeContext() {
    return asyncLocalStorage.getStore();
}