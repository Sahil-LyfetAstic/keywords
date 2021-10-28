const collection = require("../config/collection");
const db = require("../config/connection");
const objId = require("mongodb").ObjectId;

module.exports = {
  doLogin: (userData) => {
    let response = {};
    return new Promise(async (resolve, reject) => {
      db.get()
        .collection(collection.USER_COLLECTION)
        .findOne({ username: userData.username })
        .then((user) => {
          if (user) {
            if (user.password === userData.password) {
              console.log("login success");
              response.login = true;
              resolve(response);
            } else {
              console.log("incorrect password");
              response.password = false;
              resolve(response);
            }
          } else {
            console.log("user not found");
            response.user = false;
            resolve(response);
          }
        });
    });
  },
  findColl: (collId) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.SERVICE_COLLECTION)
        .findOne({ _id: objId(collId) })
        .then((coll) => {
          resolve(coll);
        });
    });
  },
  addCsv: (coll, csv) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(coll)
        .insertMany(csv)
        .then((data) => {
          if (data) resolve(true);
          else resolve(false);
        });
    });
  },
  getAprovedColl: () => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.SERVICE_COLLECTION)
        .find({
          status: "approved",
        })
        .toArray()
        .then((data) => {
          resolve(data);
        });
    });
  },
  getCsv: (coll) => {
    console.log(coll)
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(coll)
        .find()
        .toArray()
        .then((data) => {
          resolve(data);
        });
    });
  },
  insertKeyword: (keyData) => {
    return new Promise(async (resolve, reject) => {
      console.log(keyData)
      await db
        .get()
        .collection(collection.KEYWORD_COLLECTION)
        .insertMany(keyData)
        .then((response) => {
          response ? resolve(true) : reject(false)
        });
    });
  },
  getEditedKeyword:()=>{
    console.log('keyword')
    return new Promise(async(resolve,reject)=>{
      await db.get().collection(collection.KEYWORD_COLLECTION).find().toArray().then((keyword)=>{
        if(keyword) resolve(keyword)
        else console.log('error')
      })
    })
  },
  insertSingleKey:(keyword)=>{
    return new Promise(async(resolve,reject)=>{
      await db.get().collection(collection.KEYWORD_COLLECTION).insertOne(keyword).then((res)=>{
        res ? resolve(true) : reject(false)
      })
    })
  },
  flush:(keyword,collection)=>{
    return new Promise(async(resolve,reject)=>{
      await db.get().collection(collection).deleteOne({keyword : keyword}).then((status)=>{
        status ? resolve(status) : reject(status)
      })
    })
  }
};
