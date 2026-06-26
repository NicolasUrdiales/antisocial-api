
const requestLogger = (req, res, next) => {
    const timestamp = new Date().toISOString();
    const { method, url } = req;
    console.log(`[${timestamp}] ${method} ${url}`);
    
    res.on('finish', () => {
        console.log(`[${timestamp}] ${method} ${url} - Status: ${res.statusCode}`);
    });

    next();
};

module.exports = requestLogger;
