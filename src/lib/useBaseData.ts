'use client';

import { useState, useEffect, useRef } from 'react';

interface BlockData {
  number: string;
  hash: string;
  timestamp: string;
  transactions: any[];
  gasUsed: string;
  miner: string;
}

export function useBaseData() {
  const [latestBlockData, setLatestBlockData] = useState<BlockData | null>(null);
  const [transactionHashes, setTransactionHashes] = useState<string[]>([]);
  const [recentAddresses, setRecentAddresses] = useState<string[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    console.log('📡 Beginning to fetch Base chain data...');

    const fetchFlashblockData = async () => {
      try {
        // Use Base Mainnet Flashblocks endpoint for 200ms updates
        const response = await fetch('https://mainnet-preconf.base.org', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            jsonrpc: '2.0',
            method: 'eth_getBlockByNumber',
            params: ['pending', true], // Get latest Flashblock with transactions
            id: 1,
          }),
        });

        const data = await response.json();
        
        if (data.result) {
          const block = data.result;
          
          setLatestBlockData({
            number: block.number,
            hash: block.hash,
            timestamp: block.timestamp,
            transactions: block.transactions || [],
            gasUsed: block.gasUsed,
            miner: block.miner,
          });

          // Extract transaction hashes and addresses for Matrix chars
          const txs = block.transactions || [];
          const txHashes = txs.slice(0, 15).map((tx: any) => tx.hash || tx).filter(Boolean);
          const addresses = txs.slice(0, 10).map((tx: any) => tx.to || tx.from).filter(Boolean);
          
          setTransactionHashes(txHashes);
          setRecentAddresses(addresses);
          setIsConnected(true);
          
          console.log('📦 Fetched Base chain data:', {
            number: parseInt(block.number, 16),
            txCount: txs.length,
            hash: block.hash?.slice(0, 10) + '...',
            gasUsed: parseInt(block.gasUsed, 16).toLocaleString()
          });
          
        } else {
          console.warn('⚠️ No block data in response:', data);
          if (!isConnected) {
            // Fallback to mock data for visual testing
            generateMockData();
          }
        }
      } catch (error) {
        console.error('❌ Flashblocks API error:', error);
        setIsConnected(false);
        
        // Use mock data as fallback
        generateMockData();
      }
    };

    // Initial fetch
    fetchFlashblockData();

    // Poll every 10 seconds for fresh data without performance impact
    intervalRef.current = setInterval(fetchFlashblockData, 10000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const generateMockData = () => {
    const blockNum = Math.floor(Math.random() * 1000000);
    const mockBlock: BlockData = {
      number: `0x${blockNum.toString(16)}`,
      hash: `0x${Array.from({ length: 64 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('')}`,
      timestamp: `0x${Math.floor(Date.now() / 1000).toString(16)}`,
      transactions: Array.from({ length: Math.floor(Math.random() * 50) + 10 }, (_, i) => ({
        hash: `0x${Array.from({ length: 64 }, () => 
          Math.floor(Math.random() * 16).toString(16)
        ).join('')}`,
        to: `0x${Array.from({ length: 40 }, () => 
          Math.floor(Math.random() * 16).toString(16)
        ).join('')}`,
        from: `0x${Array.from({ length: 40 }, () => 
          Math.floor(Math.random() * 16).toString(16)
        ).join('')}`,
      })),
      gasUsed: `0x${Math.floor(Math.random() * 1000000).toString(16)}`,
      miner: `0x${Array.from({ length: 40 }, () => 
        Math.floor(Math.random() * 16).toString(16)
      ).join('')}`,
    };

    setLatestBlockData(mockBlock);
    setTransactionHashes(mockBlock.transactions.map(tx => tx.hash).slice(0, 15));
    setRecentAddresses(mockBlock.transactions.map(tx => tx.to).slice(0, 10));
    
    console.log('🎭 Using mock Base data for demo - trying real API...');
  };

  return {
    latestBlockData,
    transactionHashes,
    recentAddresses,
    isConnected,
  };
}