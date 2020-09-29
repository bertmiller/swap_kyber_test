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

    kyberProxy = IKyberNetworkProxy(0x818E6FECD516Ecc3849DAf6845e3EC868087B755);
  }

  function callfunc() public view returns (uint256) {
    /* uint256 expectedRate = kyberProxy.getExpectedRateAfterFee(yfi_token, dai_token, 10000, 25, ''); */
    uint256 expectedRate = kyberProxy.getExpectedRateAfterFee(0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e, 0x6B175474E89094C44Da98b954EedeAC495271d0F, 10000, 25, '');
    /* (uint256 expectedRate, ) = kyberProxy.getExpectedRate(yfi_token, dai_token, 1000000); */
    return expectedRate;
  }
}
