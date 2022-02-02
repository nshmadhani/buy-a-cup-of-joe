const abi = require('../artifacts/contracts/CreatorManager.sol/CreatorManager.json')



const addCreator = async () => {


    const ethers = hre.ethers;
    // The Contract interface
    const [creatorSigner] = await hre.ethers.getSigners();
    // Connect to the network
    let provider = ethers.getDefaultProvider();
    // The address from the above deployment example
    let contractAddress = "0x00087A92B217400416f772ab6A7e73A6Ea5eFc6b";

    // We connect to the Contract using a Provider, so we will only
    // have read-only access to the Contract
    let contract = new ethers.Contract(contractAddress, abi.abi, provider);

    // let addTxn = await contract.connect(creatorSigner).addCreator( "Nishay Madhani","nshmadhani.crypto");
    // let recpt = await addTxn.wait();
    // let creator = await contract.connect(creatorSigner).creators(creatorSigner.address);
    // console.log("Creator created", creator._name);

    console.log(await contract.getDonationsMade(creatorSigner.address));
}

const runMain = async () => {

    try {
        await addCreator();
        process.exit(0);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

runMain();