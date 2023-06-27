const Tought = require("../models/Toughts");
const User = require("../models/User");
const { Op } = require('sequelize')
module.exports = class ToughtController {
    static async showAll (req,res) {
        let search = ''
        if(req.query.search){
            search = req.query.search
           
        }
        
        let order = 'DESC'
        if(req.query.order === 'new'){
            order = 'ASC'
        }
        else{
            order = 'DESC'
        }

        const toughtList = await Tought.findAll({
            raw:true,
            where:{title:{ [Op.like]: `%${search}%`}},
            order: [['createdAt',order]]})
        res.render('toughts/all',{toughtList,search})
    }

    static async createTought(req, res) {
        const userId = req.session.userid;
     
        const user = await User.findOne({raw:true,where:{id:userId}})
        
        res.render('toughts/create',{user})
    }

    static async createToughtPost(req, res) {
        const {title,author} = req.body;
        const UserId = await req.session.userid;
    
        await Tought.create({title,author,UserId})
        res.redirect('/')
    }

    static async deleteTought(req, res) {
        const userId = req.session.userid;
        const {id} = req.body;
        const toughtData = await Tought.findOne({raw:true,where:{id}});
        if(toughtData.UserId == userId) {
            await Tought.destroy({where:{id}})
        }
        else{
            req.flash('message','este post nao é seu')
        }
        res.redirect('/')
    }

    static async updateTougth(req, res) {
        const {id} = req.params;
        const tought = await Tought.findOne({raw:true,where:{id}})
        res.render('toughts/update',{tought})
    }
    static async updateToughtPost(req, res) {
        const {id,title} = req.body;
      
        await Tought.update({title},{where:{id}})
        res.redirect('/')
    }
}