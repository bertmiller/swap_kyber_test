require("dotenv").config()
const Web3 = require('web3');
const SwapKyber = require('./build/contracts/SwapKyber.json');

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8545")
  // new Web3.providers.HttpProvider("http://localhost:8545")
);

const { address: admin } = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

console.log(`Current account: ${admin}`);

// const AMOUNT_DAI = (100).toString();

const init = async() => {
  const networkId = await web3.eth.net.getId();
  // console.log(networkId)
  const smart_contract_address = await SwapKyber.networks[networkId].address;
  const swapkyber = new web3.eth.Contract(
    SwapKyber.abi,
    smart_contract_address
  )

  console.log(`Smart contract address: ${smart_contract_address}`);

  // const tx1 = await
  swapkyber.methods.callfunc().call({from: admin}, function (error, result){
    console.log(error);
    console.log(result);
  });
}

init();
