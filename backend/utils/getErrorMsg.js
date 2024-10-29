export default function getErrorMsg(errorResponse) {
    const errorEntries = Object.entries(errorResponse);
    const lastError = errorEntries[errorEntries.length - 1]?.[1];
    
    return lastError?.message || "An unknown error occurred";
}
