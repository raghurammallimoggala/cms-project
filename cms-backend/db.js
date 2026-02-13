const path=require("path");
const {open}=require("sqlite");
const sqlite3=require("sqlite3")

const dbPath=path.join(__dirname, "cmsData.db");

const dbPromise= open({
    filename:dbPath,
    driver:sqlite3.Database,
});
module.exports= dbPromise;