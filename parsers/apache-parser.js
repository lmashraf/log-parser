import logEntry from './log-entry.js';

function parseApacheLog(logLine) {
    const regex = /^\[([^\]]+)\] \[([^\]]+)\] \[client ([^\]]+)\] (.+): (.+)$/;
    const match = logLine.match(regex);
    if (match) {
        return {
            ...logEntry,
            timestamp: match[1],
            logLevel: match[2],
            clientIP: match[3],
            additionalInfo: match[4],
            message: match[5]
        };
    }
    return null;
}

export default parseApacheLog;