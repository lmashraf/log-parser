import logEntry from './log-entry.js';

function parseApacheLog(logLine) {
    const regex = /^\[([^\]]+)\] \[([^\]]+)\] \[client ([^\]]+)\] (.+): (.+)$/;
    const match = logLine.match(regex);
    if (match) {
        return {
            timestamp: match[1],
            logLevel: match[2],
            message: match[3] + " " + match[4] + " " + match[5]
        };
    }
    return null;
}

export default parseApacheLog;
