//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.4;

// We import this library to be able to use console.log
import "hardhat/console.sol";


// This is the main building block for smart contracts.
contract CreatorManager {
    
    

    struct Donation {
        address _donator;
        CreatorMetadata _creator;
        string _undAddress;
        string txHash;
        uint256 amountInWei;
        string message;
        uint256 _ts;
    }

    struct CreatorMetadata{
        string _name;
        string _undAddress;
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
        string memory _domain
    ) public {
        
        require(bytes(_name).length > 0); //Checks length of name
        require(bytes(_domain).length  > 0); //Checks if img is a link

        CreatorMetadata  storage creator = creators[msg.sender];
        creator._name = _name;
        creator._undAddress = _domain;
        creator._creatorAddress = msg.sender;

        _totalCreators++;
    }

    function makeDonation(address  _creator, string memory _undAddress,string memory _msg, uint _amt, string memory _txHash) public  {
        require(bytes(creators[_creator]._name).length != 0,"Creator Does not exist");
        require(_amt > 0, "Amount is Zero");
        require(bytes(_msg).length > 0, "No Message Given");
        CreatorMetadata storage creator  = creators[_creator]; 
        Donation memory don = Donation(msg.sender, creator, _undAddress,_txHash, _amt, _msg, block.timestamp);
        donationsToUser[_creator].push(don);
        donationsByUser[msg.sender].push(don);
    }


    function totalCreatorDonations(address creator) public view returns(uint256) {
        return donationsToUser[creator].length;
    }
    function totalDonationsMade(address donator) public view returns(uint256) {
        return donationsByUser[donator].length;
    }

    




    
}