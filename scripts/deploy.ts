import { ethers } from 'hardhat';

async function main() {
  const ppd = await ethers.deployContract('ProdigyPianoDiary');
  await ppd.waitForDeployment();

  console.log(`Prodigy Piano Diary deployed to ${ppd.target}`);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
