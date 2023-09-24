const Auth = require('../Models/auth');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// Register İşlemi 
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body
        const user = await Auth.findOne({ email })

        if (user) {
            return res.status(404).json({ message: 'Bu Email Hesabı Kayıtlıdır !!' })
        }
        if (password.length < 6) {
            return res.status(404).json({ message: 'Parolanız 6 Karakterden Oluşmalı..' })
        }
        const passwordHash = await bcrypt.hash(password, 12)

        const newUser = await Auth.create({ username, email, password: passwordHash })

        const userToken = jwt.sign({ id: newUser.id }, process.env.SECRET_TOKEN, { expiresIn: '1h' });

        res.status(201).json({
            status: 'OK',
            newUser,
            userToken
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}

// Login İşlemi 
const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await Auth.findOne({ email })
        if (!user) {
            return res.status(404).json({ message: 'Böyle Bir Kullanıcı Bulunmadı !!!' })
        }
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(404).json({ message: 'Parola Yanış Doğru Giriniz !!! ' })
        }
        const token = jwt.sign({id: user.id}, process.env.SECRET_TOKEN, { expiresIn: '1h' })
        res.status(200).json({
            status: 'OK',
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({ message: error.message })

    }
}
module.exports = { register, login }