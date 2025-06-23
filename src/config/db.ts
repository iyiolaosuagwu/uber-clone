const mongoose = require('mongoose');

main().then(res => console.log("db connected successfully..!!"))
main().catch(err => console.log("db not connected...!!!", err));


async function main() {
  await mongoose.connect("mongodb://localhost:27017/uber-clone");
  console.log("db connected successfully..!!");
}