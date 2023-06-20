const Tought = require("../models/Toughts");
const User = require("../models/User");
const bcrypt = require('bcrypt');

module.exports = class AuthController {

    static login(req, res)
    {
        res.render('auth/login')
     }
    static async userAuth(req, res){
        const {login, password} = req.body;
        const user = await User.findOne(
            {
                raw:true,
                 where:
                 {login}})
        const comparePassword = await bcrypt.compareSync(password, user? user.password : '' )   
         if(!user || !comparePassword){
            req.flash('message','Dados incorretos.')
            res.render('auth/login')
            return;
         }
         req.session.userid = user.id
         req.session.save(() => {
            res.redirect('/')
         })       

     }

    static register(req, res)
    {
        res.render('auth/register')
     }

    static async  createUser(req, res) {
        let error = false
        const {name,login,password,confirmPassword} = req.body;
        const exists = await User.findOne({where:{
            login
        }})
        if(password!= confirmPassword) {
            req.flash('message','confirme a senha corretamente')
            res.render('auth/register')
            return;
        }
        if(exists) {
            req.flash('message','Usuário ja existente')
            res.render('auth/register')
            return;
        }
        if(login.length < 6 ){
            req.flash('message', 'seu login deve conter no minimo 6 caracteres')
            res.render('auth/register')
            return;
        }
        if(name.length < 3){
            req.flash('message', 'seu nome deve conter no minimo 3 caracteres')
            res.render('auth/register')
            return;
        }
        const salt = bcrypt.genSaltSync(10)
        const hashPassword = bcrypt.hashSync(password,salt)
        const userData = {
            name,
            login,
            password:hashPassword
        }
        const user = await User.create(userData)
        req.session.userid = user.id
        req.session.save(() => {
            res.redirect('/')
        })   
    }

    static async logout(req,res) {
        await req.session.destroy()
        res.redirect('/')
    }

    static async dashboard(req,res) {
        const toughtList = await Tought.findAll({raw:true})
        res.render('auth/dashboard',{toughtList})
    }
}
