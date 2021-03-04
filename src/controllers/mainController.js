const { name } = require('ejs');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');
const { Sequelize } = require('../database/models');
const db = require('../database/models');
const Views = require('../database/models/Views');
const Op = Sequelize.Op

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// requireing .env
require('dotenv').config()


async function main(req) {

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
        let lastViewsRequest
        if(req.session.user) {
            lastViewsRequest = db.sequelize.query(`select * from products
            inner join views on products.id = views.product_id
            inner join images on products.id = images.product_id 
            where views.user_id = ${req.session.user.id}
            group by images.product_id
            limit 5`)
        }
        
        
        let inSaleRequest = db.Products.findAll({
            where: {
                discount: { [Op.gt]: 0}
            },
            limit: 10,
            include: [{association: 'brand'}, {association: 'categories'}, {association: 'colors'}],
           
        })
        Promise.all([inSaleRequest, lastViewsRequest])
        .then ( ([productsInSale, lastViews]) => {            
            res.render('index', {productsInSale, lastViews, toThousand, title: ''}); 
        }) 
        .catch(err => {
            console.log(err);
            res.render('dbError', {title:''})
        })
      },
    
    nosotros:  (req,res) => {
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