exports.getToken = (req) => {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
        return req.query.token;
    } else if (req.cookies && req.cookies.token) {
        return req.cookies.token;
    }

    return null
}

exports.getClientId = (req) => {
    if (req.headers.client_id) {
        return req.headers.client_id;
    }

    return null
}

exports.getRefreshToken = (req) => {
    if (req.cookies && req.cookies.refresh_token) {
        return req.cookies.refresh_token;
    }

    return null
}