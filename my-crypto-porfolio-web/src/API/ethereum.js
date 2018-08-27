import Web3 from "web3";

var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

function balance() {
  web3.eth
    .getBalance("0xCA7A1A193a02e0520B6b745cD2eb24967c27cA00")
    .then(balance => web3.utils.fromWei(balance, "ether"));
}

export default {
  balance
};
