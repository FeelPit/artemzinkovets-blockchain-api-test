const express = require('express');
const router = express.Router();
const { Web3 } = require('web3');

// Initialize Web3 with Ethereum mainnet
const web3 = new Web3('https://mainnet.infura.io/v3/YOUR_INFURA_PROJECT_ID');

// Fallback to local node or public endpoint
const web3Fallback = new Web3('https://cloudflare-eth.com');

// Mock data for demonstration when external services are unavailable
const mockData = {
  networkInfo: {
    networkId: "1",
    latestBlock: "19000000",
    gasPrice: "30000000000",
    gasPriceGwei: "30",
    timestamp: new Date().toISOString(),
    note: "Mock data - external services unavailable"
  },
  contractInfo: {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    hasCode: true,
    codeSize: 12345,
    balance: "0",
    balanceEth: "0",
    transactionCount: "0",
    timestamp: new Date().toISOString(),
    note: "Mock data - external services unavailable"
  },
  erc20Info: {
    address: "0xdAC17F958D2ee523a2206206994597C13D831ec7",
    name: "Tether USD",
    symbol: "USDT",
    decimals: "6",
    totalSupply: "40000000000000000",
    timestamp: new Date().toISOString(),
    note: "Mock data - external services unavailable"
  },
  blockInfo: {
    number: "19000000",
    hash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    parentHash: "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
    timestamp: "1700000000",
    date: new Date(1700000000 * 1000).toISOString(),
    gasLimit: "30000000",
    gasUsed: "25000000",
    transactionCount: 150,
    miner: "0x1234567890123456789012345678901234567890",
    difficulty: "0",
    size: "50000",
    requestTimestamp: new Date().toISOString(),
    note: "Mock data - external services unavailable"
  }
};

// @route    GET api/artemzinkovetsapitest/test
// @desc     Test API endpoint
// @access   Public
router.get('/test', async (req, res) => {
  try {
    console.log('=== Artem Zinkovets API Test Started ===');
    
    res.json({ 
      message: 'ArtemZinkovets API Test is working!',
      timestamp: new Date().toISOString(),
      developer: 'Artem Zinkovets'
    });
    
    console.log('=== Artem Zinkovets API Test Completed ===');
  } catch (err) {
    console.error('Error in test endpoint:', err.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// @route    GET api/artemzinkovetsapitest/ethereum/info
// @desc     Get Ethereum network info
// @access   Public
router.get('/ethereum/info', async (req, res) => {
  try {
    console.log('=== Fetching Ethereum Network Info ===');
    
    try {
      const networkId = await web3Fallback.eth.net.getId();
      const blockNumber = await web3Fallback.eth.getBlockNumber();
      const gasPrice = await web3Fallback.eth.getGasPrice();
      
      const networkInfo = {
        networkId: networkId.toString(),
        latestBlock: blockNumber.toString(),
        gasPrice: gasPrice.toString(),
        gasPriceGwei: web3Fallback.utils.fromWei(gasPrice, 'gwei'),
        timestamp: new Date().toISOString(),
        source: "live_data"
      };
      
      console.log('Network Info (Live):', networkInfo);
      res.json(networkInfo);
    } catch (externalError) {
      console.log('External service failed, using mock data:', externalError.message);
      console.log('Network Info (Mock):', mockData.networkInfo);
      res.json(mockData.networkInfo);
    }
    
    console.log('=== Ethereum Network Info Fetched Successfully ===');
  } catch (err) {
    console.error('Error fetching network info:', err.message);
    res.status(500).json({ error: 'Failed to fetch network info' });
  }
});

// @route    GET api/artemzinkovetsapitest/contract/:address
// @desc     Get smart contract basic info
// @access   Public
router.get('/contract/:address', async (req, res) => {
  try {
    const { address } = req.params;
    
    console.log(`=== Fetching Smart Contract Info for ${address} ===`);
    
    if (!web3Fallback.utils.isAddress(address)) {
      return res.status(400).json({ error: 'Invalid Ethereum address' });
    }
    
    try {
      const code = await web3Fallback.eth.getCode(address);
      const balance = await web3Fallback.eth.getBalance(address);
      const transactionCount = await web3Fallback.eth.getTransactionCount(address);
      
      const contractInfo = {
        address: address,
        hasCode: code !== '0x',
        codeSize: code.length,
        balance: balance.toString(),
        balanceEth: web3Fallback.utils.fromWei(balance, 'ether'),
        transactionCount: transactionCount.toString(),
        timestamp: new Date().toISOString(),
        source: "live_data"
      };
      
      console.log('Contract Info (Live):', contractInfo);
      res.json(contractInfo);
    } catch (externalError) {
      console.log('External service failed, using mock data:', externalError.message);
      const mockContractInfo = {
        ...mockData.contractInfo,
        address: address
      };
      console.log('Contract Info (Mock):', mockContractInfo);
      res.json(mockContractInfo);
    }
    
    console.log('=== Smart Contract Info Fetched Successfully ===');
  } catch (err) {
    console.error('Error fetching contract info:', err.message);
    res.status(500).json({ error: 'Failed to fetch contract info' });
  }
});

// @route    GET api/artemzinkovetsapitest/erc20/:address
// @desc     Get ERC20 token info
// @access   Public
router.get('/erc20/:address', async (req, res) => {
  try {
    const { address } = req.params;
    
    console.log(`=== Fetching ERC20 Token Info for ${address} ===`);
    
    if (!web3Fallback.utils.isAddress(address)) {
      return res.status(400).json({ error: 'Invalid Ethereum address' });
    }
    
    try {
      // Basic ERC20 ABI for common functions
      const erc20ABI = [
        {
          "constant": true,
          "inputs": [],
          "name": "name",
          "outputs": [{"name": "", "type": "string"}],
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "symbol",
          "outputs": [{"name": "", "type": "string"}],
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "decimals",
          "outputs": [{"name": "", "type": "uint8"}],
          "type": "function"
        },
        {
          "constant": true,
          "inputs": [],
          "name": "totalSupply",
          "outputs": [{"name": "", "type": "uint256"}],
          "type": "function"
        }
      ];
      
      const contract = new web3Fallback.eth.Contract(erc20ABI, address);
      
      const tokenInfo = {
        address: address,
        timestamp: new Date().toISOString(),
        source: "live_data"
      };
      
      tokenInfo.name = await contract.methods.name().call();
      tokenInfo.symbol = await contract.methods.symbol().call();
      tokenInfo.decimals = await contract.methods.decimals().call();
      const totalSupply = await contract.methods.totalSupply().call();
      tokenInfo.totalSupply = totalSupply.toString();
      
      console.log('ERC20 Token Info (Live):', tokenInfo);
      res.json(tokenInfo);
    } catch (externalError) {
      console.log('External service failed, using mock data:', externalError.message);
      const mockTokenInfo = {
        ...mockData.erc20Info,
        address: address
      };
      console.log('ERC20 Token Info (Mock):', mockTokenInfo);
      res.json(mockTokenInfo);
    }
    
    console.log('=== ERC20 Token Info Fetched Successfully ===');
  } catch (err) {
    console.error('Error fetching ERC20 info:', err.message);
    res.status(500).json({ error: 'Failed to fetch ERC20 info' });
  }
});

// @route    GET api/artemzinkovetsapitest/block/:blockNumber
// @desc     Get block info
// @access   Public
router.get('/block/:blockNumber', async (req, res) => {
  try {
    const { blockNumber } = req.params;
    
    console.log(`=== Fetching Block Info for ${blockNumber} ===`);
    
    try {
      let blockNum;
      if (blockNumber === 'latest') {
        blockNum = 'latest';
      } else {
        blockNum = parseInt(blockNumber);
        if (isNaN(blockNum)) {
          return res.status(400).json({ error: 'Invalid block number' });
        }
      }
      
      const block = await web3Fallback.eth.getBlock(blockNum);
      
      if (!block) {
        return res.status(404).json({ error: 'Block not found' });
      }
      
      const blockInfo = {
        number: block.number.toString(),
        hash: block.hash,
        parentHash: block.parentHash,
        timestamp: block.timestamp.toString(),
        date: new Date(Number(block.timestamp) * 1000).toISOString(),
        gasLimit: block.gasLimit.toString(),
        gasUsed: block.gasUsed.toString(),
        transactionCount: block.transactions.length,
        miner: block.miner,
        difficulty: block.difficulty.toString(),
        size: block.size.toString(),
        requestTimestamp: new Date().toISOString(),
        source: "live_data"
      };
      
      console.log('Block Info (Live):', blockInfo);
      res.json(blockInfo);
    } catch (externalError) {
      console.log('External service failed, using mock data:', externalError.message);
      const mockBlockInfo = {
        ...mockData.blockInfo,
        number: blockNumber === 'latest' ? mockData.blockInfo.number : blockNumber
      };
      console.log('Block Info (Mock):', mockBlockInfo);
      res.json(mockBlockInfo);
    }
    
    console.log('=== Block Info Fetched Successfully ===');
  } catch (err) {
    console.error('Error fetching block info:', err.message);
    res.status(500).json({ error: 'Failed to fetch block info' });
  }
});

module.exports = router; 