const adminHelper = require("./adminHelpers");
const collection = require("../config/collection");
const db = require("../config/connection");

module.exports = {
  arrSorting: (arr, coll) => {
    console.log('arr')
    return new Promise(async (resolve, reject) => {
      await db
        .get()
        .collection(coll)
        .find()
        .toArray()
        .then((dbArr) => {
          if (dbArr.length === 0) {
            const sortedArr = arr.filter(
              (key, index, array) =>
                array.findIndex(
                  (obj) => obj.keyword_name == key.keyword_name
                ) == index
            );
            resolve(sortedArr);
          } else {
            const joinWithoutDupes = (A, B) => {
              const a = new Set(A.map((x) => x.keyword_name));
              const b = new Set(B.map((x) => x.keyword_name));
              return [
                ...A.filter((x) => !b.has(x.keyword_name)),
                ...B.filter((x) => !a.has(x.keyword_name)),
              ];
            };

            let sortArray = joinWithoutDupes(arr, dbArr);
            let result = sortArray.filter(
              (key, index, array) =>
                array.findIndex(
                  (obj) => obj.keyword_name == key.keyword_name
                ) == index
            );

            if (result.length === 0) resolve(false);
            else resolve(result);
          }
        });
    });
  },
};
