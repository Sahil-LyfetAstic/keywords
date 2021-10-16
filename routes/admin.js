var express = require("express");
var router = express.Router();
const adminHelper = require("../helpers/adminHelpers");
const fs = require("fs");
const csv = require("csvtojson");
const multer = require("multer");
const upload = multer({ dest: "upload/" });
var docxParser = require("docx-parser");
const verifyLogin = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

/* GET home page. */
router.get("/", (req, res) => {
  res.render("admin/login", { user: true });
});

router.get('/login',(req,res)=>{
  console.log('helloo')
  res.render('admin/login',{user:true})
})


router.post("/login", (req, res) => {
  adminHelper.doLogin(req.body).then((response) => {
    if (response.login === true) {
      req.session.loggedIn = true;
      req.session.user = req.body;
      console.log(req.session.user);
      res.send(response);
    } else {
      res.send(response);
    }
  });
});

router.get("/home", verifyLogin, (req, res) => {
  adminHelper.getAprovedColl().then((service)=>{
    let coll = "Real_Estate";
    adminHelper.getCsv(coll).then((keywords) => {
      res.render("admin/home", { admin: true,service,keywords });

     
    });

  })

});

router.post("/upload-keyword", upload.single("myfile"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  let keywordId = req.body.coll;
  let keywordArray = [];
  if (req.file.mimetype === "text/csv") {
    csv({
      output: "line",
      trim: true,
    })
      .fromFile(req.file.path)
      .then((csvData) => {
        // console.log(csvData.replace(/^"(.*)"$/, '$1'))
        let splitedKeyword = csvData.toString().split(/\s+/).sort();
        for (i in splitedKeyword) {
          let data = {
            keyword_name: splitedKeyword[i],
          };
          keywordArray.push(data);
        }
      })
      .then((err) => {
        if (err) throw err;
        else {
          adminHelper.findColl(keywordId).then((key) => {
            adminHelper
              .addCsv(key.keyword_collection, keywordArray)
              .then((status) => {
                if (status === true) {
                  fs.unlinkSync(req.file.path);
                  res.send(true);
                }
              });
          });
        }
      });
  } else if (req.file.mimetype === "application/wps-office.docx") {
    console.log(req.file);
    console.log(req.file.originalname);

    docxParser.parseDocx(req.file.path, async function (data) {
      let keywordData = data.split(/\s+/).sort();
      for (i in keywordData) {
        let data = {
          keyword_name: keywordData[i],
        };
        keywordArray.push(data);
      }
      adminHelper.findColl(keywordId).then((key) => {
        adminHelper
          .addCsv(key.keyword_collection, keywordArray)
          .then((status) => {
            if (status === true) {
              fs.unlinkSync(req.file.path);
              res.send(true);
            }
          });
      });
    });
  } else if (req.file.mimetype === "text/plain") {
    console.log("hellooo");
    fs.readFile(req.file.path, function (err, data) {
      if (err) throw err;
      // data will contain your file contents
      let textData = data.toString().split("\n").sort();
      for (i in textData) {
        let data = {
          keyword_name: textData[i],
        };
        keywordArray.push(data);
      }

      adminHelper.findColl(keywordId).then((key) => {
        adminHelper
          .addCsv(key.keyword_collection, keywordArray)
          .then((status) => {
            if (status === true) {
              fs.unlinkSync(req.file.path);
              res.send(true);
            }
          });
      });
    });
  } else {
    fs.unlink(req.file.path, function (err) {
      if (err) throw err;
      res.send(false);
    });
  }
});


router.post('/test',(req,res)=>{
  console.log(req.body)
})



module.exports = router;
