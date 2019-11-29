const statusMessages = {
    "200": "Done",
    "201": "Created",
    "400": "Invalid format",
    "500": "Internal error"
}

exports.success = function (req, res, message, status) {
    let statusCode = status;
    let statusMessage = message;
    if (!statusCode) {
        statusCode = 200
    }
    if (!message) {
        statusMessage = statusMessages[statusCode];
    }

    res.status(statusCode).send({
        error: "",
        data: statusMessage
    });
}

exports.error = function (req, res, message, status, details) {
    console.error("[Response error] " + details);
    let statusCode = status;
    let statusMessage = message;
    if (!statusCode) {
        statusCode = 500
    }
    if (!message) {
        statusMessage = statusMessages[statusCode];
    }
    res.status(statusCode).send({
        error: statusMessage,
        data: ""
    });
}