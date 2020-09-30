require("dotenv").config()
const Web3 = require('web3');
const SwapKyber = require('./build/contracts/SwapKyber.json');

const web3 = new Web3(
  new Web3.providers.WebsocketProvider("ws://localhost:8545")
  // new Web3.providers.HttpProvider("http://localhost:8545")
);

const AMOUNT_ETH = 1;
const AMOUNT_ETH_WEI = web3.utils.toWei(AMOUNT_ETH + '', 'ether');

console.log(`Attempting a transaction worth ${AMOUNT_ETH} ETH`);

const { address: admin } = web3.eth.accounts.wallet.add(process.env.PRIVATE_KEY);

const init = async() => {
  const bal_wei =  await web3.eth.getBalance(admin);
  const bal = web3.utils.fromWei(bal_wei)
  console.log(`Transacting account: ${admin}`);
  console.log(`Account balance: ${bal}`);

  const networkId = await web3.eth.net.getId();
  // console.log(networkId)

  const smart_contract_address = await SwapKyber.networks[networkId].address;
  const swapkyber = new web3.eth.Contract(
    SwapKyber.abi,
    smart_contract_address
  )
  console.log(`Smart contract address: ${smart_contract_address}`);

  const tx1 = await swapkyber.methods.tradetest(AMOUNT_ETH_WEI);

  const gasCost_tx1 = await tx1.estimateGas({from: admin});
  const gasPrice = await web3.eth.getGasPrice();

  const data = tx1.encodeABI()

  const txData = {
    from: admin,
    to: swaptokens.options.address,
    data: data,
    gas: gasCost_tx1,
    gasPrice: gasPrice,
    value: AMOUNT_ETH_WEI
}

  const receipt = await web3.eth.sendTransaction(txData);

  console.log(`Transaction hash: ${receipt.transactionHash}`);

}

init();
