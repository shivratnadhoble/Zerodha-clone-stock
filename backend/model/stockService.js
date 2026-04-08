const yahooFinance = require("yahoo-finance2").default;

/*
 Fetches real-time stock data and returns a simplified format.
 */
const getStockData = async (symbol) => {
    try {
        const result = await yahooFinance.chart(symbol, {
            period1: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
            interval: "1d",
        });

        // Map timestamps and closing prices into a clean list
        const quotes = result.timestamp.map((time, index) => ({
            date: new Date(time * 1000),
            close: result.indicators.quote[0].close[index]
        })).filter(q => q.close !== null); // Remove any null data points

        return { symbol, quotes };
    } catch (error) {
        console.error("YAHOO FINANCE SERVICE ERROR:", error.message);
        throw error;
    }
};

module.exports = { getStockData };
