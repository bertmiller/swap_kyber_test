require("dotenv").config()
const Web3 = require('web3');
const SwapKyber = require('./build/contracts/SwapKyber.json');

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8545")
  // new Web3.providers.HttpProvider("http://localhost:8545")
);

const { address: admin } = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

console.log(`Current account: ${admin}`);

const AMOUNT_ETH = (1000000000000000000).toString();

const init = async() => {
  const networkId = await web3.eth.net.getId();
  // console.log(networkId)
  const smart_contract_address = await SwapKyber.networks[networkId].address;
  const swapkyber = new web3.eth.Contract(
    SwapKyber.abi,
    smart_contract_address
  )

  console.log(`Smart contract address: ${smart_contract_address}`);

  const tx1 = await swapkyber.methods.tradetest(AMOUNT_ETH);

  const gasCost_tx1 = await tx1.estimateGas({from: admin});
  const gasPrice = await web3.eth.getGasPrice();

  const data = tx1.encodeABI()

  const txData = {
    from: admin,
    to: swaptokens.options.address,
    data: data,
    gas: gasCost_tx1,
    gasPrice: gasPrice,
    value: AMOUNT_ETH
  }

  const receipt = await web3.eth.sendTransaction(txData);

  console.log(`Transaction hash: ${receipt.transactionHash}`);
  
}

init();
