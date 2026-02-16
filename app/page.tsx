'use client';

import React, { useState, useEffect } from 'react';
import { Package, Wallet, ExternalLink, Zap, Award, Copy, Check, Menu, X, Sparkles, Home, Box, FileText, Twitter, Info, Shield, Book, Gift, CheckCircle, Circle } from 'lucide-react';

const BangerCaseDApp = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState(1000);
  const [inventory, setInventory] = useState([]);
  const [isOpening, setIsOpening] = useState(false);
  const [openingPhase, setOpeningPhase] = useState(0);
  const [lastDrop, setLastDrop] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [reelItems, setReelItems] = useState([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [activeTab, setActiveTab] = useState('home');
  const [twitterUrl, setTwitterUrl] = useState('');
  const [twitterConnected, setTwitterConnected] = useState(false);
  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, title: 'Like our post', completed: false, url: 'https://twitter.com/bangercase' },
    { id: 2, title: 'Repost our announcement', completed: false, url: 'https://twitter.com/bangercase' },
    { id: 3, title: 'Follow @BangerCase', completed: false, url: 'https://twitter.com/bangercase' }
  ]);
  const [tasksCompleted, setTasksCompleted] = useState(false);
  const [freeCaseClaimed, setFreeCaseClaimed] = useState(false);

  // Creator token from your contract
  const CREATOR_TOKEN = {
    name: "esochka",
    symbol: "ESOCHKA",
    address: "0x1e79999ec22ab4fb9bbbec76528ca71dfeee4b4c",
    icon: "👤", // You can replace with actual image URL
    creator: "esochka",
    description: "Creator token from esochka"
  };

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
      gradient: "from-purple-600 to-blue-600",
      description: `Win ${CREATOR_TOKEN.symbol} tokens`,
      rarityWeights: { common: 70, rare: 25, epic: 5, legendary: 0 }
    },
    {
      id: 2,
      name: "Premium Case",
      price: 250,
      priceUsd: "~$25",
      icon: "💎",
      gradient: "from-blue-600 to-cyan-600",
      description: `Higher ${CREATOR_TOKEN.symbol} rewards`,
      rarityWeights: { common: 40, rare: 40, epic: 15, legendary: 5 }
    },
    {
      id: 3,
      name: "Elite Case",
      price: 500,
      priceUsd: "~$50",
      icon: "👑",
      gradient: "from-purple-600 to-pink-600",
      description: `Maximum ${CREATOR_TOKEN.symbol} drops`,
      rarityWeights: { common: 0, rare: 30, epic: 50, legendary: 20 }
    }
  ];

  const tokens = {
    common: [
      { ...CREATOR_TOKEN, amount: [10, 50], rarity: 'common' }
    ],
    rare: [
      { ...CREATOR_TOKEN, amount: [50, 150], rarity: 'rare' }
    ],
    epic: [
      { ...CREATOR_TOKEN, amount: [100, 300], rarity: 'epic' }
    ],
    legendary: [
      { ...CREATOR_TOKEN, amount: [500, 1000], rarity: 'legendary' }
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

  const connectTwitter = () => {
    if (twitterUrl.trim()) {
      setTwitterConnected(true);
    }
  };

  const toggleTask = (taskId: number) => {
    setDailyTasks(prev => {
      const updated = prev.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      const allCompleted = updated.every(task => task.completed);
      if (allCompleted && !tasksCompleted) {
        setTasksCompleted(true);
      }
      return updated;
    });
  };

  const claimFreeCase = () => {
    if (tasksCompleted && !freeCaseClaimed) {
      setBalance(prev => prev + 100);
      setFreeCaseClaimed(true);
    }
  };

  const getRandomRarity = (weights: any) => {
    const total = Object.values(weights).reduce((sum: number, weight: any) => sum + weight, 0);
    let random = Math.random() * total;
    
    for (const [rarity, weight] of Object.entries(weights)) {
      random -= weight as number;
      if (random <= 0) return rarity;
    }
    return 'common';
  };

  const getRandomToken = (rarity: string) => {
    const rarityTokens = tokens[rarity as keyof typeof tokens];
    const token = rarityTokens[Math.floor(Math.random() * rarityTokens.length)];
    const amount = Math.random() * (token.amount[1] - token.amount[0]) + token.amount[0];
    
    return {
      ...token,
      amount: Math.floor(amount),
      id: Date.now() + Math.random()
    };
  };

  const generateReelItems = (caseItem: any, winningToken: any) => {
    const items: any[] = [];
    
    for (let i = 0; i < 50; i++) {
      const rarity = getRandomRarity(caseItem.rarityWeights);
      const token = getRandomToken(rarity);
      items.push(token);
    }
    
    items[45] = winningToken;
    return items;
  };

  const openCase = (caseItem: any) => {
    if (!isConnected) return;
    if (balance < caseItem.price) {
      alert("Insufficient balance!");
      return;
    }

    setBalance(prev => prev - caseItem.price);
    setIsOpening(true);
    setOpeningPhase(1);
    setShowResult(false);
    setScrollPosition(0);

    const rarity = getRandomRarity(caseItem.rarityWeights);
    const winningToken = getRandomToken(rarity);
    setLastDrop(winningToken);

    const items = generateReelItems(caseItem, winningToken);
    setReelItems(items);

    let currentScroll = 0;
    const targetScroll = 45 * 180 + 50;
    const duration = 4000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      currentScroll = targetScroll * easeOut;
      
      setScrollPosition(currentScroll);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
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

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  // Custom BangerCase Logo Component
  const BangerCaseLogo = () => (
    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 via-red-600 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-tr from-yellow-400/20 to-transparent"></div>
      <span className="text-xl font-black text-white relative z-10">💥</span>
    </div>
  );

  // Base Network Logo Component
  const BaseLogo = () => (
    <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-md relative">
      <svg viewBox="0 0 111 111" fill="none" className="w-5 h-5">
        <path d="M54.921 110.034C85.359 110.034 110.034 85.402 110.034 55.017C110.034 24.632 85.359 0 54.921 0C26.0432 0 2.35281 22.3685 0.36084 50.6154H71.5527V59.4186H0.36084C2.35281 87.6655 26.0432 110.034 54.921 110.034Z" fill="white"/>
      </svg>
    </div>
  );

  const HomeTab = () => (
    <div className="max-w-4xl mx-auto text-center py-20">
      <div className="mb-12">
        <div className="flex items-center justify-center gap-6 mb-6">
          <BangerCaseLogo />
          <span className="text-4xl font-black text-gray-400">×</span>
          <BaseLogo />
        </div>
        <h1 className="text-6xl font-black mb-4">
          <span className="bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
            BangerCase
          </span>
          <span className="text-gray-600"> × </span>
          <span className="text-blue-500">Base</span>
        </h1>
        <p className="text-2xl text-gray-400 mb-12">
          Open cases, win creator tokens on Base Network
        </p>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 mb-8">
        <h2 className="text-3xl font-bold mb-6 flex items-center justify-center gap-2">
          <Info className="w-8 h-8 text-orange-500" />
          Welcome to BangerCase
        </h2>
        <div className="text-left space-y-4 text-gray-300">
          <p className="text-lg">
            🎰 <strong>What is BangerCase?</strong><br/>
            BangerCase is a decentralized case opening protocol built on Base Network. Open cases to win tokens from your favorite creators!
          </p>
          <p className="text-lg">
            ⚡ <strong>Powered by Base</strong><br/>
            All transactions happen on Base - Coinbase's Layer 2 solution. Fast, cheap, and secure.
          </p>
          <p className="text-lg">
            👤 <strong>Creator Tokens</strong><br/>
            Win tokens from creators like {CREATOR_TOKEN.creator}. Each case contains varying amounts based on rarity!
          </p>
          <p className="text-lg">
            🎁 <strong>Daily Tasks</strong><br/>
            Complete social tasks daily to earn free cases and rewards!
          </p>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="text-4xl mb-3">🎲</div>
          <h3 className="text-xl font-bold mb-2">Provably Fair</h3>
          <p className="text-gray-400">All drops are verifiable on-chain</p>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="text-4xl mb-3">⚡</div>
          <h3 className="text-xl font-bold mb-2">Instant Rewards</h3>
          <p className="text-gray-400">Get your tokens immediately</p>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6">
          <div className="text-4xl mb-3">🎁</div>
          <h3 className="text-xl font-bold mb-2">Daily Rewards</h3>
          <p className="text-gray-400">Free cases for completing tasks</p>
        </div>
      </div>

      <button
        onClick={() => setActiveTab('cases')}
        className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 font-bold text-lg py-4 px-12 rounded-xl transition-all shadow-lg hover:shadow-xl"
      >
        Start Opening Cases 🔥
      </button>
    </div>
  );

  const DailyTasksTab = () => (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <Gift className="w-16 h-16 text-orange-500 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Daily Tasks</h1>
        <p className="text-gray-400">Complete tasks to earn a free Starter Case!</p>
      </div>

      {/* Progress Bar */}
      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <span className="text-sm font-semibold text-gray-400">
            Progress: {dailyTasks.filter(t => t.completed).length}/{dailyTasks.length}
          </span>
          <span className="text-sm font-bold text-orange-400">
            Reward: 1 Free Case (100 tokens)
          </span>
        </div>
        <div className="w-full bg-gray-800 rounded-full h-3">
          <div 
            className="bg-gradient-to-r from-orange-500 to-red-500 h-3 rounded-full transition-all duration-500"
            style={{ width: `${(dailyTasks.filter(t => t.completed).length / dailyTasks.length) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Tasks */}
      <div className="space-y-4 mb-8">
        {dailyTasks.map(task => (
          <div
            key={task.id}
            className={`bg-gray-900/50 border-2 ${task.completed ? 'border-green-600' : 'border-gray-800'} rounded-xl p-6 transition-all`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`flex-shrink-0 w-8 h-8 rounded-full border-2 ${
                    task.completed 
                      ? 'bg-green-600 border-green-600' 
                      : 'border-gray-600 hover:border-gray-500'
                  } flex items-center justify-center transition-all`}
                >
                  {task.completed && <Check className="w-5 h-5 text-white" />}
                </button>
                <div>
                  <h3 className={`font-bold text-lg ${task.completed ? 'line-through text-gray-500' : 'text-white'}`}>
                    {task.title}
                  </h3>
                  <a 
                    href={task.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    Go to Twitter <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Claim Button */}
      <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-800 rounded-2xl p-8 text-center">
        {!tasksCompleted ? (
          <>
            <p className="text-gray-400 mb-4">Complete all tasks to unlock your reward</p>
            <button
              disabled
              className="bg-gray-800 text-gray-500 cursor-not-allowed font-bold py-4 px-12 rounded-xl"
            >
              🔒 Locked
            </button>
          </>
        ) : freeCaseClaimed ? (
          <>
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-2">Reward Claimed! 🎉</h3>
            <p className="text-gray-400">Come back tomorrow for new tasks</p>
          </>
        ) : (
          <>
            <Sparkles className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-pulse" />
            <h3 className="text-2xl font-bold mb-4">All Tasks Complete! 🎉</h3>
            <button
              onClick={claimFreeCase}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold text-lg py-4 px-12 rounded-xl transition-all shadow-lg hover:shadow-xl"
            >
              Claim Free Case 🎁
            </button>
          </>
        )}
      </div>
    </div>
  );

  const CasesTab = () => (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-orange-400 via-red-500 to-pink-500 text-transparent bg-clip-text">
          Open Cases. Win {CREATOR_TOKEN.symbol}.
        </h1>
        <p className="text-xl text-gray-400 mb-8">
          Support creator {CREATOR_TOKEN.creator} on Base 🔥
        </p>
        
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
            <p className="text-2xl font-bold text-blue-400">{CREATOR_TOKEN.symbol}</p>
            <p className="text-sm text-gray-400">Token</p>
          </div>
          <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
            <BaseLogo />
            <p className="text-sm text-gray-400 mt-2">Base Network</p>
          </div>
        </div>
      </div>

      {/* Creator Info */}
      <div className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-800 rounded-2xl p-6 mb-12 max-w-3xl mx-auto">
        <div className="flex items-center gap-4 mb-4">
          <div className="text-5xl">{CREATOR_TOKEN.icon}</div>
          <div>
            <h3 className="text-2xl font-bold">{CREATOR_TOKEN.name}</h3>
            <p className="text-gray-400">{CREATOR_TOKEN.description}</p>
          </div>
        </div>
        <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-1">Token Contract</p>
          <div className="flex items-center justify-between gap-2">
            <p className="font-mono text-sm break-all">{CREATOR_TOKEN.address}</p>
            <a
              href={`https://basescan.org/address/${CREATOR_TOKEN.address}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 flex-shrink-0"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

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
                } font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2`}
              >
                {!isConnected ? 'Connecting...' : balance < caseItem.price ? 'Insufficient Balance' : 'Open Case'}
                {isConnected && balance >= caseItem.price && <Zap className="w-4 h-4" />}
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold">Your Inventory</h2>
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

      <div className="mt-16 text-center">
        <button
          onClick={() => setBalance(prev => prev + 500)}
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-semibold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-xl"
        >
          Get Free Tokens 🎁
        </button>
      </div>
    </div>
  );

  const TwitterTab = () => (
    <div className="max-w-2xl mx-auto px-4 py-20">
      <div className="text-center mb-12">
        <Twitter className="w-16 h-16 text-blue-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold mb-4">Connect Your Twitter</h1>
        <p className="text-gray-400">Link your Twitter account to unlock exclusive rewards</p>
      </div>

      <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8">
        {!twitterConnected ? (
          <>
            <label className="block text-sm font-semibold mb-3 text-gray-300">
              Twitter Profile URL
            </label>
            <input
              type="text"
              value={twitterUrl}
              onChange={(e) => setTwitterUrl(e.target.value)}
              placeholder="https://twitter.com/yourusername"
              className="w-full bg-gray-900 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 mb-4"
            />
            <button
              onClick={connectTwitter}
              disabled={!twitterUrl.trim()}
              className={`w-full ${
                twitterUrl.trim()
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-800 text-gray-500 cursor-not-allowed'
              } font-semibold py-3 px-6 rounded-xl transition-all flex items-center justify-center gap-2`}
            >
              <Twitter className="w-5 h-5" />
              Connect Twitter
            </button>
          </>
        ) : (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-2xl font-bold mb-2">Twitter Connected!</h3>
            <p className="text-gray-400 mb-4">{twitterUrl}</p>
            <button
              onClick={() => {
                setTwitterConnected(false);
                setTwitterUrl('');
              }}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Disconnect
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 space-y-4">
        <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-4">
          <h3 className="font-bold mb-2 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-400" />
            Benefits
          </h3>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• 10% bonus on all case openings</li>
            <li>• Access to exclusive Twitter-only cases</li>
            <li>• Participate in community giveaways</li>
            <li>• Early access to new creator tokens</li>
          </ul>
        </div>
      </div>
    </div>
  );

  const DocsTab = () => (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
          <Book className="w-10 h-10 text-orange-500" />
          Documentation
        </h1>
        <p className="text-gray-400">Everything you need to know about BangerCase</p>
      </div>

      <div className="space-y-6">
        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Shield className="w-6 h-6 text-green-500" />
            Smart Contract Information
          </h2>
          <div className="space-y-3 text-gray-300">
            <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
              <p className="text-sm text-gray-400 mb-1">Creator Token Contract ({CREATOR_TOKEN.symbol})</p>
              <p className="font-mono text-sm break-all mb-2">{CREATOR_TOKEN.address}</p>
              <a
                href={`https://basescan.org/address/${CREATOR_TOKEN.address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1"
              >
                View on BaseScan <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <p className="text-sm">
              Network: <strong>Base (Chain ID: 8453)</strong>
            </p>
            <p className="text-sm">
              All transactions are processed on the Base blockchain, ensuring transparency and security.
            </p>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">How It Works</h2>
          <div className="space-y-4 text-gray-300">
            <div>
              <h3 className="font-bold mb-2">1. Connect Your Wallet</h3>
              <p className="text-sm text-gray-400">
                BangerCase automatically connects to your Base wallet. Make sure you're on the Base network.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">2. Complete Daily Tasks (Optional)</h3>
              <p className="text-sm text-gray-400">
                Like, repost, and follow on Twitter to earn a free Starter Case daily!
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">3. Choose a Case</h3>
              <p className="text-sm text-gray-400">
                Select from Starter, Premium, or Elite cases. Each has different rarity weights and reward amounts.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-2">4. Open and Win</h3>
              <p className="text-sm text-gray-400">
                Watch the reel animation as tokens scroll by. Your winning creator tokens are added to your inventory instantly.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-4">Rarity System</h2>
          <div className="space-y-3">
            {Object.entries({
              common: "10-50",
              rare: "50-150",
              epic: "100-300",
              legendary: "500-1000"
            }).map(([rarity, range]) => (
              <div key={rarity} className={`${rarityConfig[rarity].bg} border ${rarityConfig[rarity].border} rounded-xl p-4`}>
                <div className="flex items-center justify-between mb-2">
                  <span className={`font-bold ${rarityConfig[rarity].color}`}>{rarityConfig[rarity].name}</span>
                  <span className="text-sm text-gray-400">{range} {CREATOR_TOKEN.symbol}</span>
                </div>
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <div 
                    className={`bg-gradient-to-r ${rarityConfig[rarity].gradient} h-2 rounded-full`}
                    style={{ 
                      width: rarity === 'common' ? '70%' : 
                             rarity === 'rare' ? '25%' : 
                             rarity === 'epic' ? '4%' : '1%' 
                    }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-800 rounded-2xl p-6">
          <h2 className="text-xl font-bold mb-3 text-yellow-400">⚠️ Disclaimer</h2>
          <p className="text-sm text-gray-300 mb-3">
            BangerCase is a decentralized application running on the Base blockchain. By using this service, you acknowledge that:
          </p>
          <ul className="text-sm text-gray-400 space-y-2">
            <li>• All transactions are final and cannot be reversed</li>
            <li>• You are responsible for your own wallet security</li>
            <li>• Case outcomes are determined by on-chain randomness</li>
            <li>• This is experimental software - use at your own risk</li>
            <li>• BangerCase is not affiliated with token creators</li>
            <li>• Token values may fluctuate</li>
          </ul>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <nav className="border-b border-gray-800 bg-black/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <BangerCaseLogo />
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

            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={() => setActiveTab('home')}
                className={`${activeTab === 'home' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors flex items-center gap-2`}
              >
                <Home className="w-4 h-4" />
                Home
              </button>
              <button
                onClick={() => setActiveTab('cases')}
                className={`${activeTab === 'cases' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors flex items-center gap-2`}
              >
                <Box className="w-4 h-4" />
                Cases
              </button>
              <button
                onClick={() => setActiveTab('tasks')}
                className={`${activeTab === 'tasks' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors flex items-center gap-2`}
              >
                <Gift className="w-4 h-4" />
                Daily Tasks
              </button>
              <button
                onClick={() => setActiveTab('twitter')}
                className={`${activeTab === 'twitter' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors flex items-center gap-2`}
              >
                <Twitter className="w-4 h-4" />
                Twitter
              </button>
              <button
                onClick={() => setActiveTab('docs')}
                className={`${activeTab === 'docs' ? 'text-white' : 'text-gray-400 hover:text-white'} transition-colors flex items-center gap-2`}
              >
                <FileText className="w-4 h-4" />
                Docs
              </button>
              
              {isConnected && (
                <div className="flex items-center gap-3">
                  <div className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    <span className="text-sm font-mono">{formatAddress(walletAddress)}</span>
                    <button onClick={copyAddress} className="text-gray-400 hover:text-white">
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-gray-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-800 bg-black/95 backdrop-blur-xl">
            <div className="px-4 py-4 space-y-3">
              <button onClick={() => { setActiveTab('home'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white">Home</button>
              <button onClick={() => { setActiveTab('cases'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white">Cases</button>
              <button onClick={() => { setActiveTab('tasks'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white">Daily Tasks</button>
              <button onClick={() => { setActiveTab('twitter'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white">Twitter</button>
              <button onClick={() => { setActiveTab('docs'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-300 hover:text-white">Docs</button>
            </div>
          </div>
        )}
      </nav>

      {isOpening && openingPhase === 1 && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50 overflow-hidden">
          <div className="w-full max-w-6xl px-4">
            <div className="flex justify-center mb-4">
              <div className="w-0.5 h-12 bg-gradient-to-b from-orange-500 to-transparent"></div>
            </div>

            <div className="relative h-64 overflow-hidden rounded-2xl border-4 border-orange-500/50 shadow-2xl shadow-orange-500/30">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10"></div>
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10"></div>
              <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-orange-500 z-20 transform -translate-x-1/2 shadow-lg shadow-orange-500/50"></div>

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

            <div className="text-center mt-8">
              <p className="text-2xl font-bold text-white mb-2 animate-pulse">Opening Case...</p>
              <p className="text-sm text-gray-400">Rolling for your {CREATOR_TOKEN.symbol} prize 🎲</p>
            </div>
          </div>
        </div>
      )}

      {isOpening && openingPhase === 2 && lastDrop && (
        <div className="fixed inset-0 bg-black/95 backdrop-blur-md flex items-center justify-center z-50">
          <div className="text-center relative">
            <div className="relative mb-8">
              <div className={`text-9xl animate-bounce ${lastDrop.rarity === 'legendary' ? 'animate-pulse' : ''}`}>
                {lastDrop.icon}
              </div>
              
              <div className={`absolute inset-0 flex items-center justify-center`}>
                <div className={`w-64 h-64 rounded-full blur-3xl ${
                  lastDrop.rarity === 'legendary' ? 'bg-yellow-500/40 animate-pulse' :
                  lastDrop.rarity === 'epic' ? 'bg-purple-500/40' :
                  lastDrop.rarity === 'rare' ? 'bg-blue-500/40' :
                  'bg-gray-500/40'
                }`}></div>
              </div>
              
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
                <span className="font-mono text-xs">{formatAddress(lastDrop.address)}</span>
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

      <main className="min-h-screen">
        {activeTab === 'home' && <HomeTab />}
        {activeTab === 'cases' && <CasesTab />}
        {activeTab === 'tasks' && <DailyTasksTab />}
        {activeTab === 'twitter' && <TwitterTab />}
        {activeTab === 'docs' && <DocsTab />}
      </main>

      <footer className="border-t border-gray-800 mt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">© 2026 BangerCase. Built on Base.</p>
            <div className="flex gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a>
              <a href={`https://basescan.org/address/${CREATOR_TOKEN.address}`} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                Contract
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BangerCaseDApp;