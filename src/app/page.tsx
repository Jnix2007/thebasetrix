'use client';

import { useEffect, useState } from 'react';
import { useBaseData } from '@/lib/useBaseData';

export default function Home() {
  const [streams, setStreams] = useState<any[]>([]);
  const { latestBlockData, transactionHashes, recentAddresses, isConnected } = useBaseData();
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  // Initialize streams ONCE when blockchain data first loads
  useEffect(() => {
    if (!latestBlockData || initialDataLoaded) return;
    
    console.log('🚀 Initializing with blockchain data... The Basetrix has you...');
    
    // Create extremely dense matrix streams across full width
    const columnWidth = 12; // Much denser columns
    const columns = Math.floor(window.innerWidth / columnWidth);
    
    console.log('📊 Creating', columns, 'columns with real Base data');

    const newStreams = [];
    for (let i = 0; i < columns; i++) {
      newStreams.push({
        id: i,
        x: i * columnWidth,
        delay: Math.random() * 5, // Stagger start times
        speed: 6 + Math.random() * 4, // 6-10 second fall time
        chars: generateVariedBlockchainChars(latestBlockData, transactionHashes, recentAddresses, i), // Pass column index for variety
        opacity: 0.3 + Math.random() * 0.7 // Much wider opacity range (0.3-1.0) for dramatic depth
      });
    }
    
    setStreams(newStreams);
    setInitialDataLoaded(true);
    console.log('✅ Matrix streams created with real blockchain data:', newStreams.length);
  }, [latestBlockData, transactionHashes, recentAddresses]);

  // Remove the real-time updates to keep it smooth - just use initial blockchain data

  return (
    <div 
      style={{
        width: '100vw',
        height: '100vh',
        backgroundColor: 'black',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Matrix Rain Streams */}
      {streams.map((stream) => (
        <MatrixStream
          key={stream.id}
          x={stream.x}
          delay={stream.delay}
          speed={stream.speed}
          initialChars={stream.chars}
          opacity={stream.opacity}
        />
      ))}
      
      {/* Pulsing Blue Base Square (solid, sharp corners, bigger, clickable) */}
      <div
        onClick={() => window.open('https://base.org', '_blank')}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '140px',
          height: '140px',
          backgroundColor: '#0033ff',
          zIndex: 100,
          boxShadow: '0 0 40px rgba(0, 51, 255, 0.9)',
          animation: 'pulse 2s ease-in-out infinite alternate',
          cursor: 'pointer',
          transition: 'all 0.3s ease'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#0022ff';
          e.currentTarget.style.boxShadow = '0 0 60px rgba(0, 34, 255, 1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#0033ff';
          e.currentTarget.style.boxShadow = '0 0 40px rgba(0, 51, 255, 0.9)';
        }}
      />
      
      {/* CSS Animation */}
      <style jsx>{`
        @keyframes matrix-fall {
          0% { transform: translateY(-100vh); }
          100% { transform: translateY(100vh); }
        }
        
        @keyframes pulse {
          0% { 
            box-shadow: 0 0 20px rgba(0, 51, 255, 0.6);
            transform: translate(-50%, -50%) scale(1);
          }
          100% { 
            box-shadow: 0 0 40px rgba(0, 51, 255, 1);
            transform: translate(-50%, -50%) scale(1.05);
          }
        }
      `}</style>
    </div>
  );
}

function MatrixStream({ x, delay, speed, initialChars, opacity }: { 
  x: number; 
  delay: number; 
  speed: number; 
  initialChars: string[];
  opacity: number;
}) {
  // No character updates - just use the initial chars for smooth animation
  const chars = initialChars;

  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: 0,
        width: '12px',
        fontFamily: 'Courier New, monospace',
        fontSize: '13px',
        lineHeight: '12px',
        animation: `matrix-fall ${speed}s linear infinite`,
        animationDelay: `${delay}s`,
        opacity: opacity, // Stream-level opacity for dramatic depth
      }}
    >
      {chars.slice(0, Math.ceil(window.innerHeight / 12)).map((char, index) => {
        const isGlowing = Math.random() < 0.08; // 8% chance for glow
        return (
          <div
            key={index}
            style={{
              height: '12px',
              textAlign: 'center',
              opacity: Math.max(0.4, 1 - (index * 0.008)), // Character fade within stream
              color: isGlowing ? '#66ccff' : '#7bb8ff', // Very readable bright blue
              textShadow: isGlowing ? '0 0 8px #66ccff, 0 0 12px #66ccff' : 'none'
            }}
          >
            {char}
          </div>
        );
      })}
    </div>
  );
}

function generateVariedBlockchainChars(blockData: any, txHashes: string[], addresses: string[], columnIndex: number): string[] {
  const chars: string[] = [];
  
  // Helper function to filter out excessive zeros from hex data
  const filterZeros = (str: string) => {
    return str.split('').filter((char, index) => {
      // Keep non-zero chars, and only some zeros for variety
      return char !== '0' || Math.random() > 0.7; // Keep only 30% of zeros
    }).join('');
  };
  
  // Primary content: Different transaction hash per column (filter zeros)
  const txIndex = columnIndex % Math.max(txHashes.length, 1);
  if (txHashes[txIndex]) {
    const hash = txHashes[txIndex];
    const startPos = (columnIndex * 3) % 40;
    const rawSlice = hash.slice(2 + startPos, 2 + startPos + 25);
    const filteredSlice = filterZeros(rawSlice);
    chars.push(...filteredSlice.split(''));
  }
  
  // Secondary content: Different address per column (filter zeros)
  const addrIndex = (columnIndex + 3) % Math.max(addresses.length, 1);
  if (addresses[addrIndex]) {
    const addr = addresses[addrIndex];
    const startPos = (columnIndex * 2) % 25;
    const rawSlice = addr.slice(2 + startPos, 2 + startPos + 20);
    const filteredSlice = filterZeros(rawSlice);
    chars.push(...filteredSlice.split(''));
  }
  
  // Tertiary content: Use hex values directly instead of converting to decimal
  if (blockData) {
    const rotationData = [
      filterZeros(blockData.hash.slice(15, 35)), // Hash slice with filtered zeros
      blockData.timestamp.slice(2, 12), // Keep hex timestamp, avoid conversion
      blockData.gasUsed.slice(2, 8), // Keep hex gas, avoid conversion  
      blockData.miner ? filterZeros(blockData.miner.slice(10, 25)) : '',
    ];
    
    const dataIndex = columnIndex % rotationData.length;
    const selectedData = rotationData[dataIndex];
    chars.push(...selectedData.split(''));
  }

  // Add more variety with different transaction hash slices (filtered)
  const secondaryTxIndex = (columnIndex + 7) % Math.max(txHashes.length, 1);
  if (txHashes[secondaryTxIndex]) {
    const rawSlice = txHashes[secondaryTxIndex].slice(25, 45);
    const filteredSlice = filterZeros(rawSlice);
    chars.push(...filteredSlice.split(''));
  }

  // Fill remainder with much more varied crypto symbols (less zero-heavy)
  const cryptoSets = [
    'ABCDEF123456789', // Hex without leading zeros
    'bcdefghijklmnpqr', // Letters without zeros
    'ETHBASEUSDCxWBTC',
    '{}[]()<>=+-*/',
    'DEFILENDNFTGAME',
    '789ABCDEFabcdef', // More varied hex
    'SOLMATICLINK',
    'xyz123456789abc'
  ];
  const cryptoChars = cryptoSets[columnIndex % cryptoSets.length];
  
  while (chars.length < 60) {
    chars.push(cryptoChars[Math.floor(Math.random() * cryptoChars.length)]);
  }

  return chars.slice(0, 60);
}

function getRandomChar(): string {
  const chars = '0123456789ABCDEFabcdefxETHBASESOLWBTCUSDC{}[]()+-*/=<>';
  return chars[Math.floor(Math.random() * chars.length)];
}