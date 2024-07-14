import parseApacheLog from './apache-parser.js';
import parseNginxLog from './nginx-parser.js';

function parseLog(logLine, format) {
    switch (format.toLowerCase()) {
        case 'apache':
            return parseApacheLog(logLine);
        case 'nginx':
            return parseNginxLog(logLine);
        // TODO: Add cases for other formats
        default:
            throw new Error('Unknown log format');
    }
}

export default parseLog;
