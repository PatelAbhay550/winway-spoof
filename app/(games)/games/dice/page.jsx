"use client";
import React, { useState } from "react";
import { FaWallet } from "react-icons/fa";

const Dicegame = () => {
  const [sliderValue, setSliderValue] = useState(50); // Target percentage
  const [betAmount, setBetAmount] = useState(10); // Bet amount
  const [walletBalance, setWalletBalance] = useState(100); // Initial wallet balance
  const [payout, setPayout] = useState(2); // Payout multiplier
  const [rollResult, setRollResult] = useState(null); // Dice roll result
  const [gameMessage, setGameMessage] = useState(""); // Win/Loss message

  const handleSliderChange = (value) => {
    setSliderValue(value);
    setPayout((100 / value).toFixed(2)); // Calculate payout multiplier
  };

  const handleBet = () => {
    if (betAmount <= 0) {
      setGameMessage("Please place a valid bet!");
      return;
    }
    if (betAmount > walletBalance) {
      setGameMessage("Insufficient funds in wallet!");
      return;
    }

    const roll = Math.floor(Math.random() * 100) + 1; // Random number between 1 and 100
    setRollResult(roll);

    if (roll <= sliderValue) {
      const winnings = (betAmount * payout).toFixed(2);
      setWalletBalance((prev) => prev + parseFloat(winnings) - betAmount); // Add winnings
      setGameMessage(`🎉 You Won!  Roll: ${roll}, Payout: $${winnings}`);
    } else {
      setWalletBalance((prev) => prev - betAmount); // Deduct bet amount
      setGameMessage(`💔 You Lost! Roll: ${roll}, Try Again!`);
    }
  };

  const handleReset = () => {
    setWalletBalance(100);
    setBetAmount(10);
    setSliderValue(50);
    setPayout(2);
    setRollResult(null);
    setGameMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Stake Dice Game</h1>

      {/* Wallet Balance */}
      <div className="flex items-center gap-2 mb-6 bg-gray-800 py-2 px-4 rounded-lg">
        <FaWallet className="text-green-400 text-xl" />
        <span className="text-lg font-semibold">
          Wallet: ₹{walletBalance.toFixed(2)}
        </span>
      </div>

      {/* Game Container */}
      <div className="w-full max-w-lg bg-gray-800 rounded-lg shadow-md p-6">
        {/* Slider */}

        <div className="mb-6">
          <h2 className="text-lg font-semibold">Set Your Target</h2>
          <div className="flex items-center justify-between mt-2">
            <span className="text-sm">0%</span>
            <span className="text-sm">{sliderValue}%</span>
            <span className="text-sm">100%</span>
          </div>
          <input
            type="range"
            min="1"
            max="100"
            value={sliderValue}
            onChange={(e) => handleSliderChange(e.target.value)}
            className="w-full mt-2 appearance-none bg-gray-700 h-2 rounded-lg focus:outline-none"
          />
        </div>

        {/* Bet Amount */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Bet Amount</h2>
          <div className="flex items-center justify-between mt-2">
            <input
              type="number"
              min="1"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
              className="w-1/2 p-2 bg-gray-700 rounded-lg text-center text-white focus:outline-none"
            />
            <button
              className="bg-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-500 ml-2"
              onClick={() => setBetAmount(betAmount + 10)}
            >
              +10
            </button>
          </div>
        </div>

        {/* Payout */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold">Payout Multiplier</h2>
          <div className="mt-2 text-xl font-bold">{payout}x</div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={handleBet}
            className="w-full bg-green-600 py-3 rounded-lg font-semibold hover:bg-green-500 transition"
          >
            Bet
          </button>
          <button
            onClick={handleReset}
            className="w-full bg-red-600 py-3 rounded-lg font-semibold hover:bg-red-500 transition"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Game Result */}
      {rollResult !== null && (
        <div className="mt-6 w-full max-w-lg bg-gray-700 rounded-lg shadow-md p-4 text-center">
          <h2 className="text-xl font-bold">Result</h2>
          <p className="mt-2 text-lg">{gameMessage}</p>
          <p className="mt-1 text-sm text-gray-300">Dice Roll: {rollResult}</p>
        </div>
      )}

      {/* Bottom Section */}
      <div className="mt-10 text-center text-gray-400">
        <p>This is a spoof game made just for development purpose</p>
      </div>
    </div>
  );
};

export default Dicegame;
