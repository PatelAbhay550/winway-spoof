"use client";

import React, { useState, useEffect } from "react";
import { FaWallet } from "react-icons/fa";
import { MdAirplanemodeActive } from "react-icons/md";

const CrashGame = () => {
  const [walletBalance, setWalletBalance] = useState(100); // Initial wallet balance
  const [betAmount, setBetAmount] = useState(10); // Bet amount
  const [multiplier, setMultiplier] = useState(1.0); // Current multiplier
  const [gameState, setGameState] = useState("waiting"); // "waiting", "crashing", "stopped"
  const [cashOutMultiplier, setCashOutMultiplier] = useState(null); // Player's cash-out multiplier
  const [autoCashOut, setAutoCashOut] = useState(null); // Auto cash-out multiplier
  const [gameMessage, setGameMessage] = useState(""); // Game result message

  useEffect(() => {
    let interval;
    if (gameState === "crashing") {
      interval = setInterval(() => {
        setMultiplier((prev) => {
          const next = prev + 0.1;
          if (Math.random() < 0.01 * next) {
            // Random crash logic
            setGameState("stopped");
            setGameMessage("💥 The plane crashed!");
            if (!cashOutMultiplier && (!autoCashOut || next < autoCashOut)) {
              setWalletBalance((prevBalance) => prevBalance - betAmount);
            }
            clearInterval(interval);
          } else if (autoCashOut && next >= autoCashOut) {
            handleAutoCashOut(next);
            clearInterval(interval);
          }
          return next;
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [gameState, cashOutMultiplier, betAmount, autoCashOut]);

  const handleStart = () => {
    if (betAmount > walletBalance) {
      setGameMessage("Insufficient funds to place this bet.");
      return;
    }
    setGameState("crashing");
    setMultiplier(1.0);
    setCashOutMultiplier(null);
    setGameMessage("");
  };

  const handleCashOut = () => {
    if (gameState === "crashing") {
      setGameState("stopped");
      const winnings = betAmount * multiplier;
      setWalletBalance((prevBalance) => prevBalance + winnings - betAmount);
      setCashOutMultiplier(multiplier);
      setGameMessage(
        `🎉 You cashed out at ${multiplier.toFixed(
          2
        )}x. Winnings: $${winnings.toFixed(2)}`
      );
    }
  };

  const handleAutoCashOut = (currentMultiplier) => {
    setGameState("stopped");
    const winnings = betAmount * currentMultiplier;
    setWalletBalance((prevBalance) => prevBalance + winnings - betAmount);
    setCashOutMultiplier(currentMultiplier);
    setGameMessage(
      `🎉 Auto cashed out at ${currentMultiplier.toFixed(
        2
      )}x. Winnings: $${winnings.toFixed(2)}`
    );
  };

  const handleReset = () => {
    setWalletBalance(100);
    setBetAmount(10);
    setMultiplier(1.0);
    setGameState("waiting");
    setCashOutMultiplier(null);
    setAutoCashOut(null);
    setGameMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Crash Game</h1>

      {/* Wallet Balance */}
      <div className="flex items-center gap-2 mb-6 bg-gray-800 py-2 px-4 rounded-lg">
        <FaWallet className="text-green-400 text-xl" />
        <span className="text-lg font-semibold">
          Wallet: ${walletBalance.toFixed(2)}
        </span>
      </div>

      {/* Bet Amount */}
      <div className="mb-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold">Bet Amount</h2>
        <input
          type="number"
          min="1"
          max={walletBalance}
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
          className="w-full p-2 bg-gray-700 rounded-lg text-center text-white focus:outline-none"
        />
      </div>

      {/* Auto Cash-Out */}
      <div className="mb-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold">Set Auto Cash-Out Multiplier</h2>
        <input
          type="number"
          min="1"
          step="0.1"
          value={autoCashOut || ""}
          onChange={(e) => setAutoCashOut(Number(e.target.value))}
          placeholder="Enter multiplier (e.g., 2.5)"
          className="w-full p-2 bg-gray-700 rounded-lg text-center text-white focus:outline-none"
        />
      </div>

      {/* Multiplier Display */}
      <div className="mb-6 w-full max-w-lg flex items-center justify-between">
        <h2 className="text-lg font-semibold">Multiplier</h2>
        <div className="text-2xl font-bold flex items-center gap-2">
          <MdAirplanemodeActive className="text-blue-400" />
          {multiplier.toFixed(2)}x
        </div>
      </div>

      {/* Game Controls */}
      <div className="mb-6 w-full max-w-lg flex gap-4">
        <button
          onClick={handleStart}
          disabled={gameState === "crashing"}
          className="bg-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-500 transition disabled:opacity-50"
        >
          Start
        </button>
        <button
          onClick={handleCashOut}
          disabled={gameState !== "crashing" || cashOutMultiplier !== null}
          className="bg-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-green-500 transition disabled:opacity-50"
        >
          Cash Out
        </button>
      </div>

      {/* Game Result */}
      {gameMessage && (
        <div className="mt-6 w-full max-w-lg bg-gray-700 rounded-lg shadow-md p-4 text-center">
          <h2 className="text-xl font-bold">Result</h2>
          <p className="mt-2 text-lg">{gameMessage}</p>
        </div>
      )}

      {/* Reset Button */}
      <button
        onClick={handleReset}
        className="mt-6 bg-red-600 py-3 px-6 rounded-lg font-semibold hover:bg-red-500 transition"
      >
        Reset Game
      </button>

      {/* Instructions */}
      <div className="mt-10 text-center text-gray-400">
        <p>This is a spoof game made just for development purpose</p>
      </div>
    </div>
  );
};

export default CrashGame;
