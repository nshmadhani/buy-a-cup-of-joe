// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  const [owner, creatorAccount, donatorAccount] = await hre.ethers.getSigners();

  // We get the contract to deploy
  const CretatorContract = await hre.ethers.getContractFactory("CreatorManager");
  const manager = await CretatorContract.deploy();


  await manager.deployed();

  console.log("Greeter deployed to:", manager.address);


  let addTxn = await manager.connect(creatorAccount).addCreator("img", "John Smith");
  let recpt = await addTxn.wait();

  let creator = await manager.creators(creatorAccount.address);
  console.log("Creator created", creator._name);

  const tx = await donatorAccount.sendTransaction({
    to: creatorAccount.address,
    value: ethers.utils.parseEther("0.1")
  });

  console.log("Eth Sent", tx.hash);

  let donation = await manager.connect(donatorAccount).makeDonation(creatorAccount.address, "I likes the view", 0.1,tx.hash);
  console.log("Donation made by ", donatorAccount.address);

  let donationsToCreator = await manager.donationsToUser(creatorAccount.address, 0);
  console.log(donationsToCreator);

  let donationsByUser = await manager.donationsByUser(donatorAccount.address, 0);
  console.log(donationsByUser);
  



}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
