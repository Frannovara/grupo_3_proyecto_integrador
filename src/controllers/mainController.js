const { name } = require('ejs');
const fs = require('fs');
const path = require('path');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    home: function(req, res) {
        res.render('index', {products, toThousand});
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
    
    }

 module.exports = controller;