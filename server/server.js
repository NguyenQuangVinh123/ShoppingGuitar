const express = require("express");
const bodyParser = require("body-parser");
const cookiesParser = require("cookie-parser");
const formidable = require("express-formidable");
const cloudinary = require("cloudinary");
const app = express();
const port = process.env.PORT || 3003;
require("dotenv").config();
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookiesParser());
cloudinary.config({
  cloud_name: process.env.CLOUDNAME,
  api_key: process.env.APIKEY,
  api_secret: process.env.APISECRET,
});
///// Middelwares //////
const { auth } = require("./middleware/auth");
const { admin } = require("./middleware/admin");

///// Models //////

const { User } = require("./models/User");
const { Brand } = require("./models/Brand");
const { Wood } = require("./models/Wood");
const { Product } = require("./models/Product");
///// PRODUCT /////
app.post("/api/product/article", auth, admin, (req, res) => {
  const product = new Product(req.body);
  product.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      articles: doc,
    });
  });
});
////// BY SELL ///////
app.get("/api/product/articles", (req, res) => {
  let order = req.query.order ? req.query.order : "asc";
  let sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  let limit = req.query.limit ? parseInt(req.query.limit) : 100;
  Product.find()
    .populate("brand")
    .populate("wood")
    .sort([[sortBy, order]])
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.send(articles);
    });
});

app.get("/api/product/article_by_id", (req, res) => {
  let type = req.query.type;
  let items = req.query.id;
  if (type === "array") {
    let ids = req.query.id.split(",");
    items = [];
    items = ids.map((item) => {
      return mongoose.Types.ObjectId(item);
    });
  }

  Product.find({ _id: { $in: items } })
    .populate("brand")
    .populate("wood")
    .exec((err, docs) => {
      if (err) return res.json({ success: false, err });
      return res.status(200).send(docs);
    });
});
////// SHOP ////////
app.post("/api/product/shop", (req, res) => {
  let order = req.body.order ? req.body.order : "desc";
  let sortBy = req.body.sortBy ? req.body.sortBy : "_id";
  let limit = req.body.limit ? parseInt(req.body.limit) : 100;
  let skip = parseInt(req.body.skip);
  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],
          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }

  findArgs["publish"] = true;

  Product.find(findArgs)
    .populate("brand")
    .populate("wood")
    .sort([[sortBy, order]])
    .skip(skip)
    .limit(limit)
    .exec((err, articles) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({
        size: articles.length,
        articles: articles,
      });
    });
});
///// WOODS //////

app.post("/api/product/wood", auth, admin, (req, res) => {
  const wood = new Wood(req.body);
  wood.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      wood: doc,
    });
  });
});

app.get("/api/product/woods", (req, res) => {
  Wood.find({}, (err, woods) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(woods);
  });
});

////BRANDS //////
app.get("/api/product/brands", (req, res) => {
  Brand.find({}, (err, brands) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(brands);
  });
});

app.post("/api/product/brand", auth, admin, (req, res) => {
  const brand = new Brand(req.body);
  brand.save((err, doc) => {
    if (err) return res.json({ success: false, err });
    res.status(200).json({
      success: true,
      brand: doc,
    });
  });
});

//// USERS //////
app.get("/api/users/auth", auth, (req, res) => {
  res.status(200).json({
    isAdmin: req.user.role === 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    lastname: req.user.lastname,
    role: req.user.role,
    cart: req.user.cart,
    history: req.user.history,
  });
});
app.post("/api/users/register", (req, res) => {
  const user = new User(req.body);
  User.findOne({ email: req.body.email})
  .then(email => {
    if(email){
      res.status(400).json({success: false, message : "email duplicate"})
    }else{
      user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
          success: true,
          userdata: doc,
        });
      });
    }
  })

});

app.post("/api/users/login", (req, res) => {
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user)
      return res.json({
        loginSuccess: false,
        message: "Auth failed,email not found",
      });
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({ loginSuccess: false, message: "Wrong password" });

      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        res.cookie("w_auth", user.token).status(200).json({
          loginSuccess: true,
        });
      });
    });
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, doc) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.post("/api/users/uploadimage", auth, admin, formidable(), (req, res) => {
  cloudinary.uploader.upload(
    req.files.file.path,
    (result) => {
      res.status(200).send({
        public_id: result.public_id,
        url: result.url,
      });
    },
    {
      public_id: `${Date.now()}`,
      resource_type: "auto",
    }
  );
});

app.get("/api/users/removeimage", auth, admin, (req, res) => {
  let image_id = req.query.public_id;
  cloudinary.uploader.destroy(image_id, (error, result) => {
    if (error) return res.json({ success: false, error });
    res.status(200).send("OK");
  });
});
app.post("/api/users/addToCart",(req,res) => {
  User.find({},(err,result)=>{
      // var test = result.map(item => {return item.token})
      // var testA = test.filter(item => {return !item });
      // if(testA.length > 0){
      //   console.log('aa')
      // }else{
      //   console.log('bbb')
      // }
  })
  var quantity = req.query.quantity;
  var castQuantity = parseInt(quantity);
  User.findOne({_id: req.user._id},(err,doc) =>{
    var duplicate = false;
   
    doc.cart.forEach(item => {
      if(item.id == req.query.productId){
          duplicate = true;
      }
    })
    if(duplicate){
      User.findOneAndUpdate(
        {_id: req.user._id, "cart.id":mongoose.Types.ObjectId(req.query.productId)},
        { $inc: { "cart.$.quantity": castQuantity } },
        {new:true},
        (err,doc) => {
          if(err) return res.json({success: false,err});
          res.status(200).json(doc.cart)
        }
      )
    }else{
      User.findOneAndUpdate(
        {_id : req.user._id},
        {$push : {cart : {
          id : mongoose.Types.ObjectId(req.query.productId),
          quantity : castQuantity,
          date : Date.now()
        }}},
        {new : true},
        (err,doc) => {
          if(err) return res.json({success: false,err});
          res.status(200).json(doc.cart)
        }
      )
    }
  })
});
app.listen(port, () => {
  console.log(`Server Running at port ${port}`);
});
