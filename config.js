const config = {
    dbURL: process.env.DB_URL || "mongodb+srv://andrescasas1995:andrescasas1995@cluster0-098rp.mongodb.net/BackendNode",
    port: process.env.PORT || 3001,
    host: process.env.HOST || "http://localhost",
    publicRoute: process.env.PUBLIC_ROUTE || "/app",
    fileRoute: process.env.FILE_ROUTE || "/files"
};

module.exports = config;