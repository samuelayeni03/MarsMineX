const Moralis = require('moralis/node');  // Import Moralis v2
const express = require('express');
const app = express();

// Initialize Moralis
const MORALIS_SERVER_URL = 'https://your-moralis-server-url';
const MORALIS_APP_ID = 'your-moralis-app-id';

Moralis.start({
  serverUrl: MORALIS_SERVER_URL,
  appId: MORALIS_APP_ID
});

// Endpoint to get Solana balances
app.post('/getSolanaBalance', async (req, res) => {
  const { address } = req.body;
  
  try {
    // Get SOL balance using Moralis v2.0
    const solBalance = await Moralis.Web3API.account.getNativeBalance({ chain: 'solana', address });
    
    // Get SPL token balances using Moralis v2.0
    const splTokens = await Moralis.Web3API.account.getTokenBalances({ chain: 'solana', address });
    
    res.json({
      solBalance: solBalance.balance / 1e9,  // Convert lamports to SOL
      tokens: splTokens
    });
  } catch (error) {
    console.error('Error fetching balances:', error);
    res.status(500).json({ error: 'Failed to fetch balances' });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
