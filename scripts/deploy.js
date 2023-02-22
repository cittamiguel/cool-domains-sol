const main = async () => {
    const domainContractFactory = await hre.ethers.getContractFactory('Domains');
    const domainContract = await domainContractFactory.deploy("miguelo");
    await domainContract.deployed();
  
    console.log("Contract deployed to:", domainContract.address);
  
    let txn = await domainContract.register("ruludo", {value: hre.ethers.utils.parseEther('0.1')});
    await txn.wait();
    console.log("Minted domain ruludo.miguelo");
  
    txn = await domainContract.setRecord("ruludo", "Am I a ruludo or a miguelo??");
    await txn.wait();
    console.log("Set record for ruludo.miguelo");
  
    const address = await domainContract.getAddress("ruludo");
    console.log("Owner of domain ruludo:", address);
  
    const balance = await hre.ethers.provider.getBalance(domainContract.address);
    console.log("Contract balance:", hre.ethers.utils.formatEther(balance));
  }
  
  const runMain = async () => {
    try {
      await main();
      process.exit(0);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  };
  
  runMain();