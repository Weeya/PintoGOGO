const express = require('express');
const router = express.Router();
const passport = require('passport');

const Package = require('../models/package');
const Menu = require('../models/menu');
const Snack = require('../models/snack');
const Order =  require('../models/order')

router.get('/:id',function(req, res) {
    const errors = {}
    const package_id = req.params.id
    Package.find({_id : package_id})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = "Cannot Fetch Package"
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.get('/user/all',passport.authenticate('jwt',{ session : false }),function(req, res) {
    const errors = {}
    Package.find({owner : req.user.user_name})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = "Cannot Fetch Package"
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.get('/system/all',function(req, res) {
    const errors = {}
    Package.find({by_admin : true})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = "Cannot Fetch Package"
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.get('/system/3days',function(req, res) {
    const errors = {}
    Package.find({type : 3, by_admin : true})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = "Cannot Fetch Package"
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.get('/system/5days',function(req, res) {
    const errors = {}
    Package.find({type : 5, by_admin : true})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = "Cannot Fetch Package"
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.get('/system/7days',function(req, res) {
    const errors = {}
    Package.find({type : 7, by_admin : true})
        .populate({path : "day_meal.meal_1", model : "Menu"})
        .populate({path : "day_meal.meal_2", model : "Menu"})
        .populate({path : "day_meal.snack", model : "Snack"})
        .exec((err, packages) => {
            if (err) {
                errors.package = "Cannot Fetch Package"
                res.status(400).json(errors)
            } else {
                res.json(packages)
            }
        })
});

router.post('/add',passport.authenticate('jwt',{ session : false }), function(req, res) {
    var package = new Package({
        name_package : req.body.name_package,
        description : req.body.description,
        type : req.body.type,
        price : req.body.price,
        day_meal : req.body.day_meal,
        by_admin :req.user.type,
        owner : req.user.user_name
    })
    package.save(function(err, savedPackage){
        if (err) {
            res.send(err);
        } else {
            res.sendStatus(200);
        }
    })
})
//add package to cart anonymous
router.post('/anonymous/addcart',passport.authenticate('jwt',{ session : false }), function(req, res){
    const name_package = req.body.name_package
    const error = {}
    var newPackage =  new Package({
        name_package : req.body.name_package,
        description : req.body.description,
        type : req.body.type,
        price : req.body.price,
        day_meal : req.body.day_meal
    })
    Package.findOne({name_package : name_package}, function(err, package){
      if(package) {
        Order.updateOne({user_id : req.user.id, isfinish : false, "package_order.package_name" : name_package},{
            $inc : {"package_order.$.amount" : 1}
        }, (err, order) => {
            if(err) {
                error.addamount = "cannot add amount anonymous package"
                res.sendStatus(500).json(error)
            } else {
                res.json(order)
            }
        })
      } else {
        newPackage.save()
            .then(package => {
                Order.findOne({user_id : req.user.id, isfinish : false}, function(err, order){
                    const newPackageOrder = {
                        package_id : package._id,
                        package_name : package.name_package,
                        price : package.price,
                        amount : 1
                    }
                    if(order) {
                        Order.updateOne({user_id : req.user.id, isfinish : false , "package_order.package_id" : newPackageOrder.package_id},{
                            $inc : { "package_order.$.amount" : 1 }
                        }, (err, order) => {
                            if(err) {
                                error.addamount = "can not add amount"
                                res.sendStatus(400).json(error);
                            } else {
                               if(order.nModified == 0) {
                                  Order.updateOne({user_id : req.user.id, isfinish : false},{
                                      $push : {package_order : newPackageOrder}
                                  }, (err, order) => {
                                      if(err) {
                                          error.addneworder = "can not add new menu to order"
                                          res.sendStatus(400).json(error)
                                      } else {
                                          res.json(order)
                                      }
                                  })
                               } else {
                                   res.json(order)
                               }
                            }
                        })
                      } else {
                          const newOrder =  new Order({
                              user_id : req.user.id,
                              package_order : newPackageOrder
                          });
                          newOrder.save()
                              .then(order => res.json(order))
                              .catch(err => console.log(err));
                      }
                })
            })
            .catch(err => console.log(err));
      }
    })

})
//delete package system
router.delete('/del/:id',passport.authenticate('jwt',{ session : false }), function(req, res) {
   const error = {};
   const query = {_id : req.params.id}
    Package.findById(req.params.id, function(err, package){
        if(err){
            res.status(500).send(err);
        } else {
            if(package.owner == req.user.user_name || req.user.type){
                Package.remove(query, function(err){
                    if(err){
                        console.log(err);
                    } else {
                        res.sendStatus(200);
                    }
                })
            } else {
                error.delete_package = " Admin or Owner"
                res.json(error)
            }
        }
    })
})

module.exports = router;