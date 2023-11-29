// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

import '@chainlink/contracts/src/v0.8/interfaces/VRFCoordinatorV2Interface.sol';
import '@chainlink/contracts/src/v0.8/VRFConsumerBaseV2.sol';

contract Loterry is VRFConsumerBaseV2 {
  VRFCoordinatorV2Interface COORDINATOR;

  struct Bet {
    address payable playerAddress;
    string betNumbers;
    uint256 betNumber1;
    uint256 betNumber2;
    uint256 betNumber3;
    uint256 betNumber4;
    uint256 betNumber5;
    uint256 betNumber6;
  }

  address payable public adminAddress;
  Bet[] public lotteryBets;
  Bet[] public emptyBets;
  string public lastNumbers;
  address payable[] public lastWinner;
  uint256 public totalInContract;
  uint256 public inRange;
  uint256 public lotteryBetsLen;
  address payable[] _empty;
  address payable[] _hit1;
  address payable[] _hit2;
  address payable[] _hit3;
  address payable[] _hit4;
  address payable[] _hit5;
  address payable[] _hit6;

  uint64 s_subscriptionId;
  address vrfCoordinator = 0x6168499c0cFfCaCD319c818142124B7A15E857ab;
  bytes32 keyHash = 0xd89b2bf150e3b9e13446986e571fb9cab24b13cea0a43ea20a6049a85cc807cc;
  uint32 callbackGasLimit = 300000;
  uint16 requestConfirmations = 3;
  uint32 numWords = 6;
  uint256 public s_empty_one;
  uint256[] public s_empty;
  uint256[] public s_randomWords;
  uint256 public s_requestId;
  address s_owner;

  uint256 public lastTimeStamp;
  uint256 public interval;
  uint256 public counter;
  bool public hasNumbers;

  uint256 public drawNumber;
  uint256 public tax;

  bool public drawOn;

  modifier restricted() {
    require(msg.sender == adminAddress);
    _;
  }

  constructor() VRFConsumerBaseV2(vrfCoordinator) {
    adminAddress = payable(msg.sender);

    lastTimeStamp = block.timestamp;
    interval = 300;

    COORDINATOR = VRFCoordinatorV2Interface(vrfCoordinator);
    s_owner = msg.sender;
    s_subscriptionId = 16071;
    counter = 0;
    drawNumber = 2;
    tax = 5;
    hasNumbers = false;
    drawOn = false;
  }

  function clearContract() public restricted {
    (bool sent, ) = adminAddress.call{value: address(this).balance}('');
    require(sent, "Failed to send Ether");
  }

  function changeStatus() public restricted {
    bool prev = drawOn;
    drawOn = !prev;
  }

  function changeTax(uint256 number) public restricted {
    tax = number;
  }

  function performUpkeep() external {
    counter = counter + 1;
    if (((block.timestamp - lastTimeStamp) > interval) || hasNumbers) {
      if (hasNumbers) {
        hasNumbers = false;
        pickWinner();
      } else {
        lastTimeStamp = block.timestamp;
        requestRandomWords();
      }
    }
  }

  function requestRandomWords() internal {
    s_requestId = COORDINATOR.requestRandomWords(
      keyHash,
      s_subscriptionId,
      requestConfirmations,
      callbackGasLimit,
      numWords
    );
  }

  function fulfillRandomWords(uint256, uint256[] memory randomWords) internal override {
    uint256 n1 = (randomWords[0] % 60) + 1;
    uint256 n2 = (randomWords[1] % 60) + 1;
    uint256 n3 = (randomWords[2] % 60) + 1;
    uint256 n4 = (randomWords[3] % 60) + 1;
    uint256 n5 = (randomWords[4] % 60) + 1;
    uint256 n6 = (randomWords[5] % 60) + 1;
    if (
      n1 == n2 ||
      n1 == n3 ||
      n1 == n4 ||
      n1 == n5 ||
      n1 == n6 ||
      n2 == n3 ||
      n2 == n4 ||
      n2 == n5 ||
      n2 == n6 ||
      n3 == n4 ||
      n3 == n5 ||
      n3 == n6 ||
      n4 == n5 ||
      n4 == n6 ||
      n5 == n6
    ) {
      requestRandomWords();
    } else {
      s_randomWords = randomWords;
      hasNumbers = true;
    }
  }

  function enterLottery(uint256[] memory _numbers) public payable {
    uint256 nOfBets = _numbers.length / 6;

    require(msg.value > nOfBets * 0.001 ether);

    for (uint256 j = 0; j < nOfBets; j++) {
      uint256 factor = j * 6;

      string memory _n0 = uint2str(_numbers[factor]);
      string memory _n1 = uint2str(_numbers[factor + 1]);
      string memory _n2 = uint2str(_numbers[factor + 2]);
      string memory _n3 = uint2str(_numbers[factor + 3]);
      string memory _n4 = uint2str(_numbers[factor + 4]);
      string memory _n5 = uint2str(_numbers[factor + 5]);

      Bet memory newBet;

      newBet.playerAddress = payable(msg.sender);
      newBet.betNumbers = append(_n0, _n1, _n2, _n3, _n4, _n5);
      newBet.betNumber1 = _numbers[factor];
      newBet.betNumber2 = _numbers[factor + 1];
      newBet.betNumber3 = _numbers[factor + 2];
      newBet.betNumber4 = _numbers[factor + 3];
      newBet.betNumber5 = _numbers[factor + 4];
      newBet.betNumber6 = _numbers[factor + 5];

      lotteryBets.push(newBet);

      lotteryBetsLen++;
    }

    totalInContract = address(this).balance;
  }

  function uint2str(uint256 _i) internal pure returns (string memory _uintAsString) {
    if (_i == 0) {
      return '0';
    }
    uint256 j = _i;
    uint256 len;
    while (j != 0) {
      len++;
      j /= 10;
    }
    bytes memory bstr = new bytes(len);
    uint256 k = len;
    while (_i != 0) {
      k = k - 1;
      uint8 temp = (48 + uint8(_i - (_i / 10) * 10));
      bytes1 b1 = bytes1(temp);
      bstr[k] = b1;
      _i /= 10;
    }
    return string(bstr);
  }

  function append(
    string memory a,
    string memory b,
    string memory c,
    string memory d,
    string memory e,
    string memory f
  ) internal pure returns (string memory) {
    string memory comma = ',';
    return string(abi.encodePacked(a, comma, b, comma, c, comma, d, comma, e, comma, f));
  }

  // function pickWinner() public{
  function pickWinner() internal {
    Bet memory selectedNumbers;

    string memory b0 = uint2str((s_randomWords[0] % 60) + 1);
    string memory b1 = uint2str((s_randomWords[1] % 60) + 1);
    string memory b2 = uint2str((s_randomWords[2] % 60) + 1);
    string memory b3 = uint2str((s_randomWords[3] % 60) + 1);
    string memory b4 = uint2str((s_randomWords[4] % 60) + 1);
    string memory b5 = uint2str((s_randomWords[5] % 60) + 1);

    selectedNumbers.betNumbers = append(b0, b1, b2, b3, b4, b5);
    selectedNumbers.betNumber1 = (s_randomWords[0] % 60) + 1;
    selectedNumbers.betNumber2 = (s_randomWords[1] % 60) + 1;
    selectedNumbers.betNumber3 = (s_randomWords[2] % 60) + 1;
    selectedNumbers.betNumber4 = (s_randomWords[3] % 60) + 1;
    selectedNumbers.betNumber5 = (s_randomWords[4] % 60) + 1;
    selectedNumbers.betNumber6 = (s_randomWords[5] % 60) + 1;

    address payable[] storage hit1 = _hit1;
    address payable[] storage hit2 = _hit2;
    address payable[] storage hit3 = _hit3;
    address payable[] storage hit4 = _hit4;
    address payable[] storage hit5 = _hit5;
    address payable[] storage hit6 = _hit6;

    uint256 balance = address(this).balance;

    for (uint256 j = 0; j < lotteryBetsLen; j++) {
      uint256 numberOfHits;
      if (lotteryBets[j].betNumber1 == selectedNumbers.betNumber1) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber1 == selectedNumbers.betNumber2) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber1 == selectedNumbers.betNumber3) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber1 == selectedNumbers.betNumber4) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber1 == selectedNumbers.betNumber5) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber1 == selectedNumbers.betNumber6) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber2 == selectedNumbers.betNumber1) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber2 == selectedNumbers.betNumber2) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber2 == selectedNumbers.betNumber3) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber2 == selectedNumbers.betNumber4) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber2 == selectedNumbers.betNumber5) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber2 == selectedNumbers.betNumber6) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber3 == selectedNumbers.betNumber1) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber3 == selectedNumbers.betNumber2) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber3 == selectedNumbers.betNumber3) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber3 == selectedNumbers.betNumber4) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber3 == selectedNumbers.betNumber5) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber3 == selectedNumbers.betNumber6) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber4 == selectedNumbers.betNumber1) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber4 == selectedNumbers.betNumber2) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber4 == selectedNumbers.betNumber3) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber4 == selectedNumbers.betNumber4) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber4 == selectedNumbers.betNumber5) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber4 == selectedNumbers.betNumber6) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber5 == selectedNumbers.betNumber1) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber5 == selectedNumbers.betNumber2) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber5 == selectedNumbers.betNumber3) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber5 == selectedNumbers.betNumber4) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber5 == selectedNumbers.betNumber5) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber5 == selectedNumbers.betNumber6) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber6 == selectedNumbers.betNumber1) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber6 == selectedNumbers.betNumber2) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber6 == selectedNumbers.betNumber3) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber6 == selectedNumbers.betNumber4) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber6 == selectedNumbers.betNumber5) {
        numberOfHits++;
      }
      if (lotteryBets[j].betNumber6 == selectedNumbers.betNumber6) {
        numberOfHits++;
      }
      if (numberOfHits == 1) {
        hit1.push(lotteryBets[j].playerAddress);
      }
      if (numberOfHits == 2) {
        hit2.push(lotteryBets[j].playerAddress);
      }
      if (numberOfHits == 3) {
        hit3.push(lotteryBets[j].playerAddress);
      }
      if (numberOfHits == 4) {
        hit4.push(lotteryBets[j].playerAddress);
      }
      if (numberOfHits == 5) {
        hit5.push(lotteryBets[j].playerAddress);
      }
      if (numberOfHits == 6) {
        hit6.push(lotteryBets[j].playerAddress);
      }
    }

    adminAddress.transfer(balance / tax);

    if (hit6.length > 0) {
      for (uint256 i = 0; i < hit6.length; i++) {
        hit6[i].transfer((balance * (tax - 1)) / (hit6.length * tax));
      }
      cleanUp(selectedNumbers.betNumbers, hit6);
    } else {
      if (hit5.length > 0) {
        for (uint256 i = 0; i < hit5.length; i++) {
          hit5[i].transfer((balance * (tax - 1)) / (hit5.length * tax));
        }
        cleanUp(selectedNumbers.betNumbers, hit5);
      } else {
        if (hit4.length > 0) {
          for (uint256 i = 0; i < hit4.length; i++) {
            hit4[i].transfer((balance * (tax - 1)) / (hit4.length * tax));
          }
          cleanUp(selectedNumbers.betNumbers, hit4);
        } else {
          if (hit3.length > 0) {
            for (uint256 i = 0; i < hit3.length; i++) {
              hit3[i].transfer((balance * (tax - 1)) / (hit3.length * tax));
            }
            cleanUp(selectedNumbers.betNumbers, hit3);
          } else {
            if (hit2.length > 0) {
              for (uint256 i = 0; i < hit2.length; i++) {
                hit2[i].transfer((balance * (tax - 1)) / (hit2.length * tax));
              }
              cleanUp(selectedNumbers.betNumbers, hit2);
            } else {
              if (hit1.length > 0) {
                for (uint256 i = 0; i < hit1.length; i++) {
                  hit1[i].transfer((balance * (tax - 1)) / (hit1.length * tax));
                }
                cleanUp(selectedNumbers.betNumbers, hit1);
              } else {
                cleanUp(selectedNumbers.betNumbers, hit1);
              }
            }
          }
        }
      }
    }
  }

  function cleanUp(string memory lastN, address payable[] memory lastW) private {
    lastWinner = lastW;
    lastNumbers = lastN;
    totalInContract = address(this).balance;
    lotteryBets = emptyBets;
    lotteryBetsLen = 0;
    uint256 oldDraw = drawNumber;
    drawNumber = oldDraw + 1;
    _hit1 = _empty;
    _hit2 = _empty;
    _hit3 = _empty;
    _hit4 = _empty;
    _hit5 = _empty;
    _hit6 = _empty;
    s_randomWords = s_empty;
  }

  function getloterryBets() public view returns (Bet[] memory) {
    return lotteryBets;
  }

  function getLastWinners() public view returns (address payable[] memory) {
    return lastWinner;
  }
}