const bcrypt = require('bcrypt');
const saltRounds = 10;
const userUID = require('./userUID');

const User = require('./models/User');
const AuthSession = require('./models/AuthSession');

const register = async (req, res) => {
    const { user_name, password, password_confirm } = req.body;

    if (!user_name || !password || !password_confirm) {
        return res
            .status(400)
            .json({ message: 'No user name or password or password confirm provided' });
    }

    try {
        const existingUser = await User.findOne({ where: { user_name: user_name } });

        if (existingUser) {
            return res
                .status(400)
                .json({ type: 'userExists', message: 'User name already exists' });
        }

        if (password.length < 8) {
            return res.status(400).json({
                type: 'passwordStrength',
                message: 'Password must be at least 8 characters long',
            });
        }

        const strengthTest = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;

        if (!strengthTest.test(password)) {
            return res.status(400).json({
                type: 'passwordStrength',
                message: 'Password must contain at least one special character',
            });
        }

        if (password !== password_confirm) {
            return res
                .status(400)
                .json({ type: 'passwordMatch', message: 'Passwords do not match' });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const uid = userUID();

        const user = await User.create({
            user_name: user_name,
            password: hashedPassword,
            uid: uid,
        });

        res.status(201).json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error registering user' });
    }
};

const login = async (req, res) => {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
        return res.status(400).json({ message: 'No user name or password provided' });
    }

    try {
        const user = await User.findOne({
            where: {
                user_name: user_name,
            },
        });

        if (!user) {
            return res.status(404).json({ message: 'User name or password is wrong' });
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return res.status(401).json({ message: 'User name or password is wrong' });
        }

        await AuthSession.destroy({ where: { user_id: user.id } });

        const date_expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 1); // +1 days

        const generatedToken = bcrypt.hashSync(user.id + date_expires, saltRounds);

        const session = await AuthSession.create({
            user_id: user.id,
            token: generatedToken,
            date_expires: date_expires,
        });

        res.status(200).json(session);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error logging in' });
    }
};

const logout = async (req, res) => {
    const session = req.session;
    try {
        await session.destroy();
        res.status(200).json({ message: 'Logged out' });
    } catch (error) {
        res.status(500).json({ message: 'Error logging out', error: error });
    }
};

const userAuth = {
    register: register,
    login: login,
    logout: logout,
};

module.exports = userAuth;
