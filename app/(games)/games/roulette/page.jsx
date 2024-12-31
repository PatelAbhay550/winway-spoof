"use client";

import React, { useState } from "react";
import { FaWallet, FaPlayCircle } from "react-icons/fa";

const RouletteGame = () => {
  const [walletBalance, setWalletBalance] = useState(100); // Initial wallet balance
  const [betAmount, setBetAmount] = useState(10); // Bet amount
  const [selectedBet, setSelectedBet] = useState("Red"); // Default bet type
  const [result, setResult] = useState(null); // Roulette spin result
  const [gameMessage, setGameMessage] = useState(""); // Win/Loss message

  const colors = ["Red", "Black", "Green"];
  const payouts = { Red: 2, Black: 2, Green: 14 }; // Payout multipliers

  const handleSpin = () => {
    if (betAmount > walletBalance) {
      setGameMessage("Insufficient funds to place this bet.");
      return;
    }

    const outcome =
      Math.random() < 0.025 ? "Green" : Math.random() < 0.5 ? "Red" : "Black"; // Simulates wheel spin
    setResult(outcome);

    if (selectedBet === outcome) {
      const winnings = betAmount * payouts[outcome];
      setWalletBalance(walletBalance + winnings);
      setGameMessage(
        `🎉 You won! Outcome: ${outcome}. Payout: $${winnings.toFixed(2)}`
      );
    } else {
      setWalletBalance(walletBalance - betAmount);
      setGameMessage(`💔 You lost! Outcome: ${outcome}.`);
    }
  };

  const handleReset = () => {
    setWalletBalance(100);
    setBetAmount(10);
    setSelectedBet("Red");
    setResult(null);
    setGameMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Roulette Game</h1>

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

      {/* Bet Selection */}
      <div className="mb-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold">Select Bet</h2>
        <select
          value={selectedBet}
          onChange={(e) => setSelectedBet(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded-lg text-white focus:outline-none"
        >
          {colors.map((color) => (
            <option key={color} value={color}>
              {color} ({payouts[color]}x)
            </option>
          ))}
        </select>
      </div>

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        className="mt-4 bg-blue-600 py-3 px-6 rounded-lg font-semibold hover:bg-blue-500 transition"
      >
        Spin the Wheel
      </button>

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

export default RouletteGame;
