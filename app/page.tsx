'use client';

import React, { useState, useEffect } from 'react';
import { Package, Wallet, ExternalLink, ChevronDown, Zap, TrendingUp, Award, Copy, Check, Menu, X, Sparkles } from 'lucide-react';

const BangerCaseDApp = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState(1000);
  const [inventory, setInventory] = useState([]);
  const [isOpening, setIsOpening] = useState(false);
  const [openingPhase, setOpeningPhase] = useState(0); // 0: idle, 1: rolling, 2: revealing
  const [lastDrop, setLastDrop] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reelItems, setReelItems] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);

  // Auto-connect Base wallet on mount
  useEffect(() => {
    const autoConnectWallet = () => {
      const address = '0x' + Math.random().toString(16).substr(2, 40);
      setWalletAddress(address);
      setIsConnected(true);
    };
    
    setTimeout(autoConnectWallet, 500);
  }, []);

  const cases = [
    {
      id: 1,
      name: "Starter Case",
      price: 100,
      priceUsd: "~$10",
      icon: "📦",
      gradient: "from-slate-600 to-slate-800",
      description: "Common & Rare tokens",
      rarityWeights: { common: 70, rare: 25, epic: 5, legendary: 0 }
    },
    {
      id: 2,
      name: "Premium Case",
      price: 250,
      priceUsd: "~$25",
      icon: "💎",
      gradient: "from-blue-600 to-cyan-600",
      description: "Rare & Epic tokens",
      rarityWeights: { common: 40, rare: 40, epic: 15, legendary: 5 }
    },
    {
      id: 3,
      name: "Elite Case",
      price: 500,
      priceUsd: "~$50",
      icon: "👑",
      gradient: "from-purple-600 to-pink-600",
      description: "Epic & Legendary guaranteed",
      rarityWeights: { common: 0, rare: 30, epic: 50, legendary: 20 }
    }
  ];

  const tokens = {
    common: [
      { name: "DEGEN", symbol: "DEGEN", amount: [10, 50], icon: "🎭", address: "0x4ed4..." },
      { name: "BALD", symbol: "BALD", amount: [15, 45], icon: "👨‍🦲", address: "0x27D2..." },
      { name: "TOSHI", symbol: "TOSHI", amount: [20, 60], icon: "🐱", address: "0xAC1b..." },
      { name: "BRETT", symbol: "BRETT", amount: [12, 40], icon: "🎨", address: "0x532f..." }
    ],
    rare: [
      { name: "HIGHER", symbol: "HIGHER", amount: [50, 150], icon: "🚀", address: "0x0578..." },
      { name: "MOCHI", symbol: "MOCHI", amount: [60, 140], icon: "🍡", address: "0x2c0b..." },
      { name: "NORMIE", symbol: "NORMIE", amount: [55, 130], icon: "😎", address: "0x7F12..." },
      { name: "KEYCAT", symbol: "KEYCAT", amount: [65, 145], icon: "🔑", address: "0x9a26..." }
    ],
    epic: [
      { name: "AERO", symbol: "AERO", amount: [100, 300], icon: "💨", address: "0x940..." },
      { name: "WELL", symbol: "WELL", amount: [120, 280], icon: "💧", address: "0xFF8..." },
      { name: "SEAMLESS", symbol: "SEAM", amount: [110, 290], icon: "🌊", address: "0x1C7..." },
      { name: "BASESWAP", symbol: "BSWAP", amount: [130, 310], icon: "🔄", address: "0x78a..." }
    ],
    legendary: [
      { name: "Ethereum", symbol: "ETH", amount: [0.01, 0.05], icon: "💎", address: "0x000..." },
      { name: "USD Coin", symbol: "USDC", amount: [500, 1000], icon: "💰", address: "0x833..." },
      { name: "Coinbase BTC", symbol: "cbBTC", amount: [0.001, 0.005], icon: "₿", address: "0xcbB..." }
    ]
  };

  const rarityConfig = {
    common: { 
      name: "Common", 
      color: "text-gray-400", 
      bg: "bg-gray-900/80", 
      border: "border-gray-700",
      glow: "shadow-gray-500/50",
      gradient: "from-gray-700 to-gray-900"
    },
    rare: { 
      name: "Rare", 
      color: "text-blue-400", 
      bg: "bg-blue-900/50", 
      border: "border-blue-600",
      glow: "shadow-blue-500/50",
      gradient: "from-blue-700 to-blue-900"
    },
    epic: { 
      name: "Epic", 
      color: "text-purple-400", 
      bg: "bg-purple-900/50", 
      border: "border-purple-600",
      glow: "shadow-purple-500/50",
      gradient: "from-purple-700 to-purple-900"
    },
    legendary: { 
      name: "Legendary", 
      color: "text-yellow-400", 
      bg: "bg-yellow-900/50", 
      border: "border-yellow-500",
      glow: "shadow-yellow-500/80",
      gradient: "from-yellow-600 to-orange-700"
    }
  };

  const disconnectWallet = () => {
    setIsConnected(false);
    setWalletAddress('');
  };

const getRandomToken = (rarity: string) => {
  const rarityTokens = tokens[rarity];
  const token =
    rarityTokens[Math.floor(Math.random() * rarityTokens.length)];

  const amount =
    Math.random() * (token.amount[1] - token.amount[0]) +
    token.amount[0];

  return {
    ...token,
    rarity,
    amount: amount < 1 ? amount.toFixed(4) : Math.floor(amount),
    id: Date.now() + Math.random(),
  };
};


  const generateReelItems = (caseItem, winningToken) => {
    const items = [];
    const allTokens = [...tokens.common, ...tokens.rare, ...tokens.epic, ...tokens.legendary];
    
    // Generate 50 random items for the reel
    for (let i = 0; i < 50; i++) {
      const rarity = getRandomRarity(caseItem.rarityWeights);
      const token = getRandomToken(rarity);
      items.push(token);
    }
    
    // Insert the winning item at position 45 (near the end)
    items[45] = winningToken;
    
    return items;
  };

  const openCase = (caseItem) => {
    if (!isConnected) {
      return;
    }

    if (balance < caseItem.price) {
      alert("Insufficient balance!");
      return;
    }

    setBalance(prev => prev - caseItem.price);
    setIsOpening(true);
    setOpeningPhase(1);
    setShowResult(false);
    setScrollPosition(0);

    // Generate winning token
    const rarity = getRandomRarity(caseItem.rarityWeights);
    const winningToken = getRandomToken(rarity);
    setLastDrop(winningToken);

    // Generate reel items
    const items = generateReelItems(caseItem, winningToken);
    setReelItems(items);

    // Animate scroll position
    let currentScroll = 0;
    const targetScroll = 45 * 180 + 50; // Position to center the winning item (item width 180px)
    const duration = 4000; // 4 seconds
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function (ease-out-cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      currentScroll = targetScroll * easeOut;
      
      setScrollPosition(currentScroll);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Animation complete
        setTimeout(() => {
          setOpeningPhase(2);
          setTimeout(() => {
            setIsOpening(false);
            setShowResult(true);
            setInventory(prev => [winningToken, ...prev]);
          }, 800);
        }, 500);
      }
    };

    animate();
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatAddress = (address) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-orange-500/50">
                B
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-red-500 text-transparent bg-clip-text">
                  BangerCase
                </h1>
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  Base Network
                </div>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Cases</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Inventory</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">Docs</a>
              
              {isConnected ? (
                <div className="flex items-center gap-3">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-mono">{formatAddress(walletAddress)}</span>
                    <button onClick={copyAddress} className="text-gray-400 hover:text-white">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                  <button
                    onClick={disconnectWallet}
                    className="text-sm text-gray-400 hover:text-white"
                  >
                    Disconnect
                  </button>
                </div>
              ) : (
                <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-yellow-500 animate-pulse"></div>
                  <span className="text-sm text-gray-400">Connecting...</span>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-black/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-3">
              <a href="#" className="block text-gray-300 hover:text-white">Cases</a>
              <a href="#" className="block text-gray-300 hover:text-white">Inventory</a>
              <a href="#" className="block text-gray-300 hover:text-white">Docs</a>
            </div>
          </div>
        )}
      </nav>

      {/* Rolling Reel Animation */}
      {isOpening && openingPhase === 1 && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 overflow-hidden">
          <div className="w-full max-w-6xl px-4">
            {/* Indicator Arrow */}
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-12 bg-gradient-to-b from-orange-500 to-transparent"></div>
            </div>

            {/* Reel Container */}
            <div className="relative h-64 overflow-hidden rounded-2xl border-4 border-orange-500/50 shadow-2xl shadow-orange-500/30">
              {/* Gradient overlays for fade effect */}
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
              
              {/* Center indicator line */}
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-orange-500 z-20 transform -translate-x-1/2 shadow-lg shadow-orange-500/50"></div>

              {/* Scrolling Items */}
              <div 
                className="flex gap-4 py-8 absolute"
                style={{ 
                  transform: `translateX(calc(50% - ${scrollPosition}px))`,
                  transition: 'none'
                }}
              >
                {reelItems.map((item, index) => (
                  <div
                    key={index}
                    className={`flex-shrink-0 w-40 h-48 rounded-xl border-2 ${rarityConfig[item.rarity].border} bg-gradient-to-br ${rarityConfig[item.rarity].gradient} p-4 flex flex-col items-center justify-center ${rarityConfig[item.rarity].glow} shadow-xl`}
                  >
                    <div className="text-5xl mb-2">{item.icon}</div>
                    <p className="font-bold text-sm text-center mb-1">{item.symbol}</p>
                    <p className="text-xs text-gray-300">{item.amount}</p>
                    <div className={`text-xs ${rarityConfig[item.rarity].color} font-semibold mt-2 px-2 py-1 rounded-full ${rarityConfig[item.rarity].bg}`}>
                      {rarityConfig[item.rarity].name}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Status Text */}
            <div className="text-center mt-8">
              <p className="text-2xl font-bold text-white mb-2 animate-pulse">Opening Case...</p>
              <p className="text-sm text-gray-400">Rolling for your prize 🎲</p>
            </div>
          </div>
        </div>
      )}

      {/* Reveal Phase */}
      {isOpening && openingPhase === 2 && lastDrop && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50">
          <div className="text-center relative">
            <div className="relative mb-8">
              <div className={`text-9xl animate-bounce ${lastDrop.rarity === 'legendary' ? 'animate-pulse' : ''}`}>
                {lastDrop.icon}
              </div>
              
              {/* Glow effect */}
              <div className={`absolute inset-0 flex items-center justify-center`}>
                <div className={`w-64 h-64 rounded-full blur-3xl ${
                  lastDrop.rarity === 'legendary' ? 'bg-yellow-500/40 animate-pulse' :
                  lastDrop.rarity === 'epic' ? 'bg-purple-500/40' :
                  lastDrop.rarity === 'rare' ? 'bg-blue-500/40' :
                  'bg-gray-500/40'
                }`}></div>
              </div>
              
              {/* Legendary sparkles */}
              {lastDrop.rarity === 'legendary' && (
                <>
                  <Sparkles className="w-12 h-12 text-yellow-400 absolute top-0 left-1/2 -translate-x-1/2 animate-ping" />
                  <Sparkles className="w-10 h-10 text-orange-400 absolute top-1/4 right-0 animate-pulse" />
                  <Sparkles className="w-10 h-10 text-orange-400 absolute top-1/4 left-0 animate-pulse" />
                </>
              )}
            </div>
            
            <div className={`inline-block px-4 py-2 rounded-full ${rarityConfig[lastDrop.rarity].bg} ${rarityConfig[lastDrop.rarity].color} text-lg font-bold mb-2 border-2 ${rarityConfig[lastDrop.rarity].border} animate-pulse`}>
              {rarityConfig[lastDrop.rarity].name}
            </div>
            <p className="text-3xl font-bold text-white mb-1">{lastDrop.name}</p>
            <p className="text-xl text-gray-400">{lastDrop.amount} {lastDrop.symbol}</p>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {showResult && lastDrop && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`bg-gradient-to-br from-gray-900 to-black border-2 ${rarityConfig[lastDrop.rarity].border} rounded-3xl p-8 max-w-md w-full shadow-2xl ${rarityConfig[lastDrop.rarity].glow}`}>
            <div className="text-center">
              <div className={`inline-block px-3 py-1 rounded-full ${rarityConfig[lastDrop.rarity].bg} ${rarityConfig[lastDrop.rarity].color} text-sm font-bold mb-4 border ${rarityConfig[lastDrop.rarity].border}`}>
                {rarityConfig[lastDrop.rarity].name}
              </div>
              <div className={`text-7xl mb-4 ${lastDrop.rarity === 'legendary' ? 'animate-bounce' : ''}`}>
                {lastDrop.icon}
              </div>
              <h2 className="text-3xl font-bold mb-2">{lastDrop.name}</h2>
              <p className="text-gray-400 text-sm mb-4">{lastDrop.symbol}</p>
              <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 mb-6">
                <p className="text-gray-400 text-sm mb-1">Amount</p>
                <p className="text-3xl font-bold">{lastDrop.amount}</p>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-6">
                <span>Contract:</span>
                <span className="font-mono">{lastDrop.address}</span>
              </div>
              <button
                onClick={() => setShowResult(false)}
                className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 font-semibold py-3 px-6 rounded-xl transition-all shadow-lg"
              >
                Claim to Wallet 🎉
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
            Open Cases. Win Big.
          </h1>
          <p className="text-xl text-gray-400 mb-8">
            The hottest case opening protocol on Base 🔥
          </p>
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <p className="text-2xl font-bold text-orange-400">{balance}</p>
              <p className="text-sm text-gray-400">Your Balance</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <p className="text-2xl font-bold text-purple-400">{inventory.length}</p>
              <p className="text-sm text-gray-400">Items Owned</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <p className="text-2xl font-bold text-blue-400">12.4K</p>
              <p className="text-sm text-gray-400">Cases Opened</p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
              <p className="text-2xl font-bold text-green-400">$1.2M</p>
              <p className="text-sm text-gray-400">Total Volume</p>
            </div>
          </div>
        </div>

        {/* Cases Grid */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">Available Cases</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {cases.map((caseItem) => (
              <div
                key={caseItem.id}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 hover:border-gray-700 transition-all group hover:scale-105"
              >
                <div className="text-5xl mb-4">{caseItem.icon}</div>
                <h3 className="text-2xl font-bold mb-2">{caseItem.name}</h3>
                <p className="text-gray-400 text-sm mb-4">{caseItem.description}</p>
                
                <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4 mb-4">
                  <div className="flex items-baseline gap-2 mb-1">
                    <span className="text-3xl font-bold">{caseItem.price}</span>
                    <span className="text-gray-400">tokens</span>
                  </div>
                  <p className="text-sm text-gray-500">{caseItem.priceUsd}</p>
                </div>

                <button
                  onClick={() => openCase(caseItem)}
                  disabled={!isConnected || balance < caseItem.price}
                  className={`w-full ${
                    !isConnected || balance < caseItem.price
                      ? 'bg-gray-800 text-gray-500 cursor-not-allowed'
                      : `bg-gradient-to-r ${caseItem.gradient} hover:opacity-90`
                  } font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2 group-hover:shadow-lg`}
                >
                  {!isConnected ? 'Connecting...' : balance < caseItem.price ? 'Insufficient Balance' : 'Open Case'}
                  {isConnected && balance >= caseItem.price && <Zap className="w-4 h-4" />}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Inventory */}
        <div>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold">Your Inventory</h2>
            {inventory.length > 0 && (
              <button className="text-orange-400 hover:text-orange-300 text-sm flex items-center gap-1">
                View All <ExternalLink className="w-4 h-4" />
              </button>
            )}
          </div>

          {inventory.length === 0 ? (
            <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-12 text-center">
              <Package className="w-16 h-16 text-gray-700 mx-auto mb-4" />
              <p className="text-gray-400 mb-4">No items yet</p>
              <p className="text-sm text-gray-500">Open your first case to get started!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {inventory.map((item) => (
                <div
                  key={item.id}
                  className={`${rarityConfig[item.rarity].bg} border ${rarityConfig[item.rarity].border} rounded-xl p-4 hover:scale-105 transition-all cursor-pointer`}
                >
                  <div className="text-4xl mb-3">{item.icon}</div>
                  <p className="font-bold text-sm mb-1">{item.symbol}</p>
                  <p className="text-xs text-gray-400 mb-2">{item.amount}</p>
                  <div className={`text-xs ${rarityConfig[item.rarity].color} font-semibold`}>
                    {rarityConfig[item.rarity].name}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <button
            onClick={() => setBalance(prev => prev + 500)}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
          >
            Get Free Tokens 🎁
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2026 BangerCase. All rights reserved.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BangerCaseDApp;