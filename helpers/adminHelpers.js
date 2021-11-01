const collection = require("../config/collection");
const db = require("../config/connection");
const objId = require("mongodb").ObjectId;
const sortHelper = require("./sorting");

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
    let response = {};
    return new Promise(async (resolve, reject) => {
      sortHelper
        .arrSorting(csv, collection.REALESATE_COLLECTION)
        .then(async (sortedCsv) => {
          if (!sortedCsv) resolve(true);
          else {
            await db
              .get()
              .collection(coll)
              .insertMany(sortedCsv)
              .then((data) => {
                if (data) resolve(true);
                else resolve(false);
              });
          }
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
    console.log(coll);
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
      let result = keyData.filter(
        (key, index, array) =>
          array.findIndex((obj) => obj.keyword_name == key.keyword_name) ==
          index
      );
      await db
        .get()
        .collection(collection.KEYWORD_COLLECTION)
        .insertMany(result)
        .then((response) => {
          response ? resolve(true) : reject(false);
        });
    });
  },
  getEditedKeyword: () => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.KEYWORD_COLLECTION)
        .find()
        .toArray()
        .then((keyword) => {
          if (keyword) resolve(keyword);
          else console.log("error");
        });
    });
  },
  insertSingleKey: (keyword) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.KEYWORD_COLLECTION)
        .insertOne(keyword)
        .then((res) => {
          res ? resolve(true) : reject(false);
        });
    });
  },
  flush: (keyword, collection) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection)
        .deleteOne({ keyword_name: keyword })
        .then((status) => {
          status ? resolve(status) : reject(status);
        });
    });
  },
  findKey: (keyword, coll) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(coll)
        .findOne({ keyword_name: keyword })
        .then((key) => {
          if (key) resolve(true);
          else resolve(false);
        })
        .catch((err) => {
          throw err;
        });
    });
  },
  updateUser: (userId) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { username: userId },
          {
            $set: { userLogged: true },
          }
        )
        .then((status) => {
          resolve(status);
        });
    });
  },
  findUserLoggedIn: () => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.USER_COLLECTION)
        .findOne({ userLogged: true })
        .then((user) => {
          resolve(user);
        });
    });
  },
  logoutUser: (userId) => {
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(collection.USER_COLLECTION)
        .updateOne(
          { username: userId },
          {
            $unset: {
              userLogged: true,
            },
          }
        )
        .then((response) => {
          resolve(response)
        });
    });
  },
};
