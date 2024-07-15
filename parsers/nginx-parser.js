import logEntry from './log-entry.js';

function parseNginxLog(logLine) {
    const regex = /^([^\s]+) - - \[([^\]]+)\] "([^"]+)" (\d+) (\d+) "([^"]*)" "([^"]*)" "([^"]*)"$/;
    const match = logLine.match(regex);
    if (match) {
        return {
            timestamp: match[2],
            logLevel: 'INFO', // Assuming INFO as Nginx doesn't have log level in this format
            message: match[4] + " " + match[8]
        };
    }
    return null;
}

export default parseNginxLog;
