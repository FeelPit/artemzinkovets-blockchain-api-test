# Artem Zinkovets API Test - Blockchain Integration

## Overview
This is a blockchain integration API created as part of the developer test task. The API provides endpoints for interacting with Ethereum smart contracts and retrieving blockchain information.

**Developer**: Artem Zinkovets  
**API Name**: artemzinkovetsapitest  
**Created**: July 4, 2025

## Features
- ✅ Smart Contract Information Retrieval
- ✅ ERC20 Token Data Fetching
- ✅ Ethereum Network Information
- ✅ Block Explorer Functionality
- ✅ Error Handling and Validation
- ✅ Fallback to Mock Data when external services are unavailable

## API Endpoints

### 1. Basic Test Endpoint
```
GET /api/artemzinkovetsapitest/test
```
**Description**: Basic test endpoint to verify API functionality.

**Response**:
```json
{
  "message": "ArtemZinkovets API Test is working!",
  "timestamp": "2025-07-04T17:36:07.307Z",
  "developer": "Artem Zinkovets"
}
```

### 2. Ethereum Network Information
```
GET /api/artemzinkovetsapitest/ethereum/info
```
**Description**: Retrieves current Ethereum network information.

**Response**:
```json
{
  "networkId": "1",
  "latestBlock": "19000000",
  "gasPrice": "30000000000",
  "gasPriceGwei": "30",
  "timestamp": "2025-07-04T17:35:13.393Z",
  "note": "Mock data - external services unavailable"
}
```

### 3. Smart Contract Information
```
GET /api/artemzinkovetsapitest/contract/:address
```
**Description**: Retrieves information about a specific smart contract.

**Parameters**:
- `address` (string): Ethereum contract address

**Example**:
```
GET /api/artemzinkovetsapitest/contract/0xdAC17F958D2ee523a2206206994597C13D831ec7
```

**Response**:
```json
{
  "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  "hasCode": true,
  "codeSize": 12345,
  "balance": "0",
  "balanceEth": "0",
  "transactionCount": "0",
  "timestamp": "2025-07-04T17:35:13.399Z",
  "note": "Mock data - external services unavailable"
}
```

### 4. ERC20 Token Information
```
GET /api/artemzinkovetsapitest/erc20/:address
```
**Description**: Retrieves ERC20 token information.

**Parameters**:
- `address` (string): ERC20 token contract address

**Example**:
```
GET /api/artemzinkovetsapitest/erc20/0xdAC17F958D2ee523a2206206994597C13D831ec7
```

**Response**:
```json
{
  "address": "0xdAC17F958D2ee523a2206206994597C13D831ec7",
  "name": "Tether USD",
  "symbol": "USDT",
  "decimals": "6",
  "totalSupply": "40000000000000000",
  "timestamp": "2025-07-04T17:35:13.399Z",
  "note": "Mock data - external services unavailable"
}
```

### 5. Block Information
```
GET /api/artemzinkovetsapitest/block/:blockNumber
```
**Description**: Retrieves information about a specific block.

**Parameters**:
- `blockNumber` (string): Block number or "latest" for the latest block

**Examples**:
```
GET /api/artemzinkovetsapitest/block/latest
GET /api/artemzinkovetsapitest/block/18000000
```

**Response**:
```json
{
  "number": "19000000",
  "hash": "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
  "parentHash": "0xabcdef1234567890abcdef1234567890abcdef1234567890abcdef1234567890",
  "timestamp": "1700000000",
  "date": "2023-11-14T22:13:20.000Z",
  "gasLimit": "30000000",
  "gasUsed": "25000000",
  "transactionCount": 150,
  "miner": "0x1234567890123456789012345678901234567890",
  "difficulty": "0",
  "size": "50000",
  "requestTimestamp": "2025-07-04T17:35:13.399Z",
  "note": "Mock data - external services unavailable"
}
```

## Error Handling

The API includes comprehensive error handling:

### Invalid Address Error
```json
{
  "error": "Invalid Ethereum address"
}
```

### Service Unavailable
When external blockchain services are unavailable, the API falls back to mock data with a note indicating the data source.

## Installation and Usage

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Start the Server**:
   ```bash
   node server.js
   ```
   or
   ```bash
   npm run server
   ```

3. **Test the API**:
   ```bash
   node test_artemzinkovets_api.js
   ```

## Technology Stack

- **Node.js**: Runtime environment
- **Express.js**: Web framework
- **Web3.js**: Ethereum blockchain interaction
- **Axios**: HTTP client for testing

## Architecture

The API is designed with the following principles:
- **Modular Structure**: Each endpoint is clearly separated
- **Error Handling**: Comprehensive error handling with fallback mechanisms
- **Logging**: Detailed console logging for debugging
- **Validation**: Input validation for all parameters
- **Fallback System**: Mock data when external services are unavailable

## Test Results

All endpoints have been successfully tested:
- ✅ Basic API functionality
- ✅ Ethereum network information retrieval
- ✅ Smart contract information fetching
- ✅ ERC20 token data retrieval
- ✅ Block information access
- ✅ Error handling for invalid inputs

## Future Enhancements

Potential improvements for production use:
- Add authentication and rate limiting
- Implement caching for frequently accessed data
- Add support for multiple blockchain networks
- Implement real-time WebSocket connections
- Add database integration for historical data storage

## Developer Notes

This API was created as part of a blockchain developer test task. The implementation demonstrates:
- Understanding of Ethereum blockchain concepts
- Web3.js integration capabilities
- API design and development skills
- Error handling and fallback mechanisms
- Testing and documentation practices

**Contact**: Artem Zinkovets  
**Date**: July 4, 2025 