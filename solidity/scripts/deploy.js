const abi = require('../artifacts/contracts/CreatorManager.sol/CreatorManager.json')

const main = async () => {

    const [deployer] = await hre.ethers.getSigners();
    const bal = await deployer.getBalance();

    console.log("Deploying with address: ", deployer.address);
    console.log("Account Balance: ", bal.toString())

    const Token = await hre.ethers.getContractFactory("CreatorManager");
    
    const portal = await Token.deploy();
    await portal.deployed();

    console.log("Contract Manager @", portal.address);

    await addCreator(deployer, portal);

}

const addCreator = async (creatorSigner, contract) => {
    let addTxn = await contract.connect(creatorSigner).addCreator( "Nishay Madhani","nshmadhani.crypto");
    let recpt = await addTxn.wait();
    let creator = await contract.connect(creatorSigner).creators(creatorSigner.address);
    console.log("Creator created", creator._name);

}

const runMain = async () => {

    try {
        await main();
        process.exit(0);
    } catch(error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();