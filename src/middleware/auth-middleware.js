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

    const ref = db.database().ref("roles");
    const role = ref.orderByChild("userId").equalTo(authId);
    role.once("value", function (snap) {
        const data = snap.val();

        for (const key in data) {
            const el = data[key]["role"];

            if (el === "admin") return next();

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
