const axios = require('axios');

const API_BASE_URL = 'http://localhost:5025/api/artemzinkovetsapitest';

async function testAPI() {
  console.log('='.repeat(60));
  console.log('🚀 ARTEM ZINKOVETS API TEST - BLOCKCHAIN INTEGRATION');
  console.log('='.repeat(60));
  
  try {
    // Test 1: Basic API Test
    console.log('\n📋 Test 1: Basic API Test');
    console.log('-'.repeat(40));
    const testResponse = await axios.get(`${API_BASE_URL}/test`);
    console.log('✅ Response:', JSON.stringify(testResponse.data, null, 2));
    
    // Test 2: Ethereum Network Info
    console.log('\n🌐 Test 2: Ethereum Network Information');
    console.log('-'.repeat(40));
    const networkResponse = await axios.get(`${API_BASE_URL}/ethereum/info`);
    console.log('✅ Network Info:', JSON.stringify(networkResponse.data, null, 2));
    
    // Test 3: Smart Contract Info (USDT)
    console.log('\n📜 Test 3: Smart Contract Information (USDT)');
    console.log('-'.repeat(40));
    const contractAddress = '0xdAC17F958D2ee523a2206206994597C13D831ec7';
    const contractResponse = await axios.get(`${API_BASE_URL}/contract/${contractAddress}`);
    console.log('✅ Contract Info:', JSON.stringify(contractResponse.data, null, 2));
    
    // Test 4: ERC20 Token Info
    console.log('\n💰 Test 4: ERC20 Token Information');
    console.log('-'.repeat(40));
    const tokenResponse = await axios.get(`${API_BASE_URL}/erc20/${contractAddress}`);
    console.log('✅ ERC20 Token Info:', JSON.stringify(tokenResponse.data, null, 2));
    
    // Test 5: Block Info
    console.log('\n🔗 Test 5: Block Information (Latest)');
    console.log('-'.repeat(40));
    const blockResponse = await axios.get(`${API_BASE_URL}/block/latest`);
    console.log('✅ Block Info:', JSON.stringify(blockResponse.data, null, 2));
    
    // Test 6: Block Info (Specific Block)
    console.log('\n🔗 Test 6: Block Information (Specific Block)');
    console.log('-'.repeat(40));
    const specificBlockResponse = await axios.get(`${API_BASE_URL}/block/18000000`);
    console.log('✅ Block Info:', JSON.stringify(specificBlockResponse.data, null, 2));
    
    // Test 7: Error Handling (Invalid Address)
    console.log('\n❌ Test 7: Error Handling (Invalid Address)');
    console.log('-'.repeat(40));
    try {
      await axios.get(`${API_BASE_URL}/contract/invalid_address`);
    } catch (error) {
      console.log('✅ Expected Error:', error.response.data);
    }
    
    console.log('\n' + '='.repeat(60));
    console.log('🎉 ALL TESTS COMPLETED SUCCESSFULLY!');
    console.log('Developer: Artem Zinkovets');
    console.log('API Name: artemzinkovetsapitest');
    console.log('Features: Smart Contract Integration, ERC20 Support, Block Explorer');
    console.log('='.repeat(60));
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response) {
      console.error('Response data:', error.response.data);
    }
  }
}

// Run the test
testAPI(); 