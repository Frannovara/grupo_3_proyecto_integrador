const { name } = require('ejs');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { Sequelize } = require('../database/models');
const db = require('../database/models');
const Op = Sequelize.Op

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// requireing .env
require('dotenv').config()

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

async function main(req) {

    let testAcount = await nodemailer.createTestAccount();

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_MBZ,
            pass: process.env.PASSWORD_EMAIL,
        },
        tls: {
            rejectUnauthorized: false
        }
    });


    let info = await transporter.sendMail({
        from: req.body.email,
        to: "motorbikezone007@gmail.com",
        subject: 'Consulta Motor Bike Zone de ' + req.body.name ,
        text: req.body.message,
    });

    console.log('Message sent: %s', info.messageId);

    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}

const controller = {
    home: function(req, res) {
        db.Products.findAll({
            where: {
                discount: { [Op.ne]: 0}
            },
            limit: 10,
            include: [{association: 'brand'}, {association: 'images'}, {association: 'products_categories'}, {association: 'colors'}],
            raw: true,
            nest: true,
        })
        .then ( productsInSale => {
           // res.send(productsInSale)
           res.render('index', {productsInSale, toThousand});
        }) 
        .catch ( err => {
            console.log(err);
        })
      },
    
    nosotros: function (req,res) {
        res.render('nosotros')
    },
    contact: (req,res) => {
        res.render('contact')
    },
    help: (req,res) => {
        res.render ('help')
    },
    form: function (req, res) {
        res.redirect('/')
    },
    contactSend: (req,res) => {
        main(req).catch(console.error);
        let mensaje = "Su consulta fue enviada exitosamente"
        res.render('contact', {mensaje})
    }
    
}

 module.exports = controller;