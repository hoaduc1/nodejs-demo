var express = require('express');
var router = express.Router();
var Product = require('../db/product-models/product.js');

/* GET index page. */
router.get('/', function(req, res, next) {
    var mascots = [
        { name: 'Sammy', organization: "DigitalOcean", birth_year: 2012},
        { name: 'Tux', organization: "Linux", birth_year: 1996},
        { name: 'Moby Dock', organization: "Docker", birth_year: 2013}
      ];
      var tagline = "No programming concept is complete without a cute animal mascot.";
    
      res.render('index', {
        mascots: mascots,
        tagline: tagline
      });
});

/* About page */
router.get('/about', function(req, res) {
    res.render('about');
  });

/* Sign in page */
router.get('/sign-in', function(req, res) {
    res.render('sign-in');
  });

/* Sign up page */
router.get('/sign-up', function(req, res) {
    res.render('sign-up');
  });

/* Products manager page: loading all product */
router.get('/product-manager', (req, res) => {
    Product.find({})
        .then(products => {
            res.render('product-manager', { products: products })
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});

/* Go to Add Product page */
router.get('/add-product', (req, res) => {
    res.render('add-product');
});

/* Add new Product */
router.post('/product-manager', (req, res) => {
    let newProduct = new Product({
        name: req.body.productName,
        type: req.body.productType,
        price: req.body.productPrice
    });

    newProduct.save()
        .then(doc => {
            res.redirect('/product-manager')
        })
        .catch(err => {
            console.log('Error: ', err);
            throw err;
        })
});

/* Go to Update Product page */
router.get('/update-product/:productId', (req, res) => {
    Product.findById(req.params.productId, (err, product) => {
        if (err) {
            console.log(err);
            throw err
        }
        res.render('update-product', { product: product });
    })
});

/* Delete product */
router.delete('/:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findByIdAndDelete(productId, (err, doc) => {
        if (err) throw err;
        res.send(doc);
    })
});

/* Update product */
router.post('/update/:productId', (req, res) => {
    let productId = req.params.productId;
    Product.findByIdAndUpdate(
        { _id: productId },
        { $set: { name: req.body.productName, type: req.body.productType, price: req.body.productPrice } },
        { useFindAndModify: false })
        .then(doc => {
            res.redirect('/product-manager')
        })
});

/* Test response */
 router.get('/test', (req, res) => {
    res.send('test ok');
});

module.exports = router;