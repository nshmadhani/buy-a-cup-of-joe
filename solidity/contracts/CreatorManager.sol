//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// We import this library to be able to use console.log
import "hardhat/console.sol";


// This is the main building block for smart contracts.
contract CreatorManager {
    
    

    struct Donation {
        address _donator;
        address _creator;
        string txHash;
        uint256 amountInWei;
        string message;
        uint256 _ts;
    }

    struct CreatorMetadata{
        string _image;
        string _name;
        address _creatorAddress;
    }

    uint256 _totalCreators;

    mapping(address => CreatorMetadata) public creators;
    mapping(address => Donation[]) public donationsByUser;
    mapping(address => Donation[]) public donationsToUser;



    constructor() {
        _totalCreators = 0;
    }

    function addCreator(
        string memory _name,
        string memory _img
    ) public {
        
        require(bytes(_name).length > 0); //Checks length of name
        require(bytes(_img).length  > 0); //Checks if img is a link

        CreatorMetadata  storage creator = creators[msg.sender];
        creator._name = _name;
        creator._image = _img;
        creator._creatorAddress = msg.sender;

        _totalCreators++;
    }

    function makeDonation(address  _creator, string memory _msg, uint _amt, string memory _txHash) public  {
        require(bytes(creators[_creator]._name).length != 0,"Creator Does not exist");
        require(_amt > 0, "Amount is Zero");
        require(bytes(_msg).length > 0, "No Message Given");


        console.log(_txHash);

        Donation memory don = Donation(msg.sender, _creator,_txHash, _amt, _msg, block.timestamp);
        
        donationsToUser[_creator].push(don);
        donationsByUser[msg.sender].push(don);

    }




    
}