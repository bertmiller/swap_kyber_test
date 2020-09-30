pragma solidity 0.6.6;

import "./IERC20.sol";
import "./IKyberNetworkProxy.sol";
/* import "@openzeppelin/contracts/token/ERC20/IERC20.sol"; */

contract SwapKyber {

  IERC20 internal eth_token;
  IERC20 internal dai_token;
  IERC20 internal yfi_token;

  IKyberNetworkProxy kyberProxy;

  constructor() public {
    eth_token = IERC20(0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE);
    dai_token = IERC20(0x6B175474E89094C44Da98b954EedeAC495271d0F);
    yfi_token = IERC20(0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e);

    kyberProxy = IKyberNetworkProxy(0x9AAb3f75489902f3a48495025729a0AF77d4b11e);
  }

  function getexpectedrate(uint ethAmount) public view returns (uint256) {
    uint256 expectedRate = kyberProxy.getExpectedRateAfterFee(eth_token, dai_token, ethAmount, 25, '');

    return expectedRate;
  }

  function tradetest(uint ethAmount) public payable returns (uint256) {
    uint256 expectedRate = getexpectedrate(ethAmount);

    uint256 actualDestAmount = kyberProxy.tradeWithHintAndFee{value: msg.value}(
      eth_token, // ETH address
      msg.value, // 1 ETH -- SRCAMOUNT
      dai_token, // KNC address
      msg.sender, // destAddress
      9999999999999999999999999999999, // maxDestAmount: arbitarily large to swap full amount
      expectedRate, // minConversionRate: value from getExpectedRate call
      msg.sender, // platform wallet
      25, // 0.25%
      '' // empty hint
      );
    return actualDestAmount;
  }

  receive() payable external {}

}
