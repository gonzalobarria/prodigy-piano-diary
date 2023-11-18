import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import * as dotenv from "dotenv";

dotenv.config();

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  defaultNetwork: 'localhost',
  networks: {
    goerli: {
      url: process.env.ALCHEMY_GOERLI_URL,
      accounts: [process.env.PRIVATE_KEY || ''],
    },
    arbitrum: {
      url: process.env.ALCHEMY_ARBITRUM_URL,
      accounts: [process.env.PRIVATE_KEY || ''],
    },
    sepolia: {
      url: process.env.ALCHEMY_SEPOLIA_URL,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    mumbai: {
      url: process.env.ALCHEMY_MUMBAI_URL,
      accounts: [`0x${process.env.PRIVATE_KEY}`],
    },
    zkEVMTestnet: {
      url: process.env.ALCHEMY_POLYGON_ZKEVM_TESTNET_URL,
      accounts: [`${process.env.PRIVATE_KEY}`],
    },
    scrollTestnet: {
      url: process.env.SCROLL_TESTNET_URL,
      accounts: [process.env.PRIVATE_KEY || ''],
    }
  },
};

export default config;
