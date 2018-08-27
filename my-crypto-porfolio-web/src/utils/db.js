import openSocket from "socket.io-client";
import crypt from "./crypt";
import default_credentials from "./credentials";

// Initialize

function get(credentials = default_credentials.get()) {
  let id = credentials.id;
  // socket.emit("get", id);
}

function put(data, credentials = default_credentials.get()) {
  let id = credentials.id;
  let key = credentials.key;
  let val = crypt.encrypt(data, key);
  // socket.emit("put", id, val);
}

function sub(callback) {
  // socket.on("getRes", (err, res) => {
  //   if (err) {
  //     console.log("err", err, "val", res);
  //     if (err.includes("not found")) put("");
  //   } else {
  //     const key = default_credentials.get().key;
  //     const data = crypt.decrypt(res, key);
  //     const parsedData = JSON.parse(data);
  //     // Forward data to redux state
  //     console.log("SERVER DATA", parsedData);
  //     callback(parsedData.accounts);
  //   }
  // });
}

export default {
  get,
  put,
  sub
};
