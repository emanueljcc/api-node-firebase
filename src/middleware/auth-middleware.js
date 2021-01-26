const { db } = require("../database");

const getAuthToken = (req, res, next) => {
    if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
    ) {
        req.authToken = req.headers.authorization.split(" ")[1];
    } else {
        req.authToken = null;
    }
    next();
};

const isAuthenticated = (req, res, next) => {
    // console.log(req.headers.authorization);
    getAuthToken(req, res, async () => {
        try {
            const { authToken } = req;
            const userInfo = await db.auth().verifyIdToken(authToken);
            req.authId = userInfo.uid;
            return next();
        } catch (e) {
            return res
                .status(401)
                .send({ error: "You are not authorized to make this request" });
        }
    });
};

const AdminAuth = (req, res, next) => {
    const { authId } = req;

    const users = db.database().ref("roles");
    const user = users.orderByChild("user_uid").equalTo(authId);
    user.once("value", function (snap) {
        const data = snap.val();

        for (const key in data) {
            role = data[key]["role"];

            if (role === "admin") return next();

            res.status(403).json({
                message: "You do not have permission for this request.",
            });
        }
    });
};

module.exports = {
    isAuthenticated,
    AdminAuth,
};
