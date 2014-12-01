
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , product = require('./routes/product')
  , offer = require('./routes/offer')
  , http = require('http')
  , path = require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);

/**
 * Handle users
 */

//create a user
app.post('/users', user.addUser);

//get user details
app.get('/users/:userId', user.userDetails);

/**
 * Handle Categories and Products.
 */

//get list of all categories in JSON form (optional pagination)
app.get('/category', product.getAllCategory);

//create new category
app.post('/category', product.addCategory);

//get specific category details
app.get('/category/:categoryId', product.getCategory);

//get all products of this category (optional pagination).
app.get('/category/:categoryId/product/', product.getAllProduct);

//create a product under specific category.
app.post('/category/:categoryId/product/', product.addProduct);

//get product details
app.get('/category/:categoryId/product/:productId', product.productDetails);

//change product details
app.post('/category/:categoryId/product/:productId', product.modifyProduct);

//un-list product given a product-id.
app.del('/category/:categoryId/product/:productId', product.deleteProduct);

/**
 * Handle Offers
 */

//create offer
app.post('/category/:categoryId/product/:productId/offer', offer.addOffer);

//get list of offers made on particular product (optional pagination)
app.get('/category/:categoryId/product/:productId/offer', offer.offerListByProduct);

//returns offer details given an offer-id
app.get('/category/:categoryId/product/:productId/offer/:offerId', offer.offerByOfferId);

//update an offer..No comments accepted. See “post/comment”
app.put('/category/:categoryId/product/:productId/offer/:offerId', offer.modifyOfferByOfferId);

//delete an offer
app.del('/category/:categoryId/product/:productId/offer/:offerId', offer.deleteOfferByOfferId);

//get comments history for given offer (optional pagination)
app.get('/category/:categoryId/product/:productId/offer/:offerId/history', offer.getHistory);

//Post a new comment
app.post('/category/:categoryId/product/:productId/offer/:offerId/comment', offer.addComment);

http.createServer(app).listen(app.get('port'), function(){
  console.log('FreeDoor server listening on port ' + app.get('port'));
});
