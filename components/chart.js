document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('logChart');
    const context = canvas.getContext('2d');
    // Data
    const parsedLogs = JSON.parse(localStorage.getItem('parsedLogs'));
    const occurrences = calculateOccurrences(parsedLogs);
    const percentages = calculatePercentages(occurrences, parsedLogs.length);

    drawChart(context, occurrences, percentages);

    canvas.addEventListener('mousemove', (event) => {
        handleHover(event, context, occurrences, percentages);
    });
});

function drawChart(ctx, occurrences, percentages) {
    const logLevels = Object.keys(occurrences);
    const barWidth = context.canvas.width / logLevels.length;
    const maxPercentage = Math.max(...Object.values(percentages));

    logLevels.forEach((logLevel, index) => {
        const barHeight = (percentages[logLevel] / maxPercentage) * context.canvas.height;
        context.fillStyle = getLogLevelColor(logLevel);
        context.fillRect(index * barWidth, context.canvas.height - barHeight, barWidth, barHeight);
    });
}

function handleHover(event, context, occurrences, percentages) {
    // Implement hover logic and tooltip display
}

function getLogLevelColor(logLevel) {
    // Return color based on log level, should match the tags
}
