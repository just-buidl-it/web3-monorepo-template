// SPDX-License-Identifier: BSD-3-Clause
pragma solidity ^0.8.9;
import { console } from "hardhat/console.sol";

contract GravatarRegistry {
  event NewGravatar(uint id, address owner, string displayName, string imageUrl);
  event UpdatedGravatar(uint id, address owner, string displayName, string imageUrl);

  struct Gravatar {
    address owner;
    string displayName;
    string imageUrl;
  }

  Gravatar[] public gravatars;

  mapping (uint => address) public gravatarToOwner;
  mapping (address => uint) public ownerToGravatar;

  /**
   * @notice Registers a new gravatar to an address
   * @param _displayName Display name of the gravatar
   * @param _imageUrl Gravatar imge link
  */
  function createGravatar(string calldata _displayName, string calldata _imageUrl) public {
    require(ownerToGravatar[msg.sender] == 0, "One Gravatar per address allowed");
    gravatars.push(Gravatar(msg.sender, _displayName, _imageUrl));
    uint id = gravatars.length;
    gravatarToOwner[id] = msg.sender;
    ownerToGravatar[msg.sender] = id;

    emit NewGravatar(id, msg.sender, _displayName, _imageUrl);
  }

  /**
   * @notice Get gravatar info for an address
   * @param owner Address of the gravatar owner
   * @return Display name and imagel ink of the gravatar
  */
  function getGravatar(address owner) public view returns (string memory, string memory) {
    uint id = ownerToGravatar[owner] - 1;
    return (gravatars[id].displayName, gravatars[id].imageUrl);
  }

  /**
   *
  */
  function updateGravatarName(string calldata _displayName) public {
    require(ownerToGravatar[msg.sender] != 0, "No gravatar registered for this address");
    uint id = ownerToGravatar[msg.sender] - 1;
    console.log(gravatars[id].displayName);
    gravatars[id].displayName = _displayName;
    emit UpdatedGravatar(id, msg.sender, _displayName, gravatars[id].imageUrl);
  }

  /**
  */
  function updateGravatarImage(string calldata _imageUrl) public {
    require(ownerToGravatar[msg.sender] != 0, "No gravatar registered for this address");

    uint id = ownerToGravatar[msg.sender] - 1;

    gravatars[id].imageUrl =  _imageUrl;
    emit UpdatedGravatar(id, msg.sender, gravatars[id].displayName, _imageUrl);
  }
}
