"use client";
import React, { useState, useEffect } from "react";
import { FaWallet, FaBomb, FaCoins, FaCashRegister } from "react-icons/fa";
import { SiCrystal } from "react-icons/si";

const MinesGame = () => {
  const mineCounts = {
    Easy: 3,
    Medium: 5,
    Hard: 8,
    Extreme: 12,
  };
  const [walletBalance, setWalletBalance] = useState(100); // Initial wallet balance
  const [highestBalance, setHighestBalance] = useState(100); // Highest balance achieved
  const [betAmount, setBetAmount] = useState(10); // Bet amount
  const [difficulty, setDifficulty] = useState("Medium"); // Default difficulty
  const [grid, setGrid] = useState(generateGrid("Medium")); // Mines grid
  const [gameMessage, setGameMessage] = useState(""); // Win/Loss message
  const [revealedCells, setRevealedCells] = useState([]); // Revealed cells
  const [gameOver, setGameOver] = useState(false); // Game state
  const [cashOutAvailable, setCashOutAvailable] = useState(false); // Cash-out state

  const payoutMultipliers = {
    Easy: 1.5,
    Medium: 2,
    Hard: 3,
    Extreme: 5,
  };

  function generateGrid(difficulty) {
    const size = 5;
    const mines = mineCounts[difficulty];
    const grid = Array(size)
      .fill(null)
      .map(() => Array(size).fill(false));

    let mineCount = 0;
    while (mineCount < mines) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (!grid[row][col]) {
        grid[row][col] = true; // Place mine
        mineCount++;
      }
    }
    return grid;
  }

  const handleCellClick = (row, col) => {
    if (
      gameOver ||
      revealedCells.some((cell) => cell.row === row && cell.col === col)
    ) {
      return;
    }

    if (grid[row][col]) {
      // Hit a mine
      setGameMessage("💥 You hit a mine! Game Over.");
      setWalletBalance((prev) => prev - betAmount);
      setGameOver(true);
      setCashOutAvailable(false);
    } else {
      // Safe cell
      setRevealedCells((prev) => [...prev, { row, col }]);
      setGameMessage("✅ Safe! Keep going.");
      setCashOutAvailable(true);
    }
  };

  const handleCashOut = () => {
    const winnings =
      revealedCells.length * (betAmount * (payoutMultipliers[difficulty] / 10));
    setWalletBalance((prev) => prev + winnings);
    setHighestBalance((prev) => Math.max(prev, walletBalance + winnings));
    setGameMessage("🎉 You cashed out! Collect your winnings.");
    setCashOutAvailable(false);
    setGameOver(true);
  };

  const handleDifficultyChange = (level) => {
    setDifficulty(level);
  };

  const handleBetChange = (amount) => {
    if (amount < 1 || amount > walletBalance) return;
    setBetAmount(amount);
  };

  useEffect(() => {
    setGrid(generateGrid(difficulty));
    setRevealedCells([]);
    setGameMessage("");
    setGameOver(false);
    setCashOutAvailable(false);
  }, [walletBalance, difficulty]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white flex flex-col items-center py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Stake Mines Game</h1>

      {/* Wallet Balance */}
      <div className="flex items-center gap-2 mb-6 bg-gray-800 py-2 px-4 rounded-lg">
        <FaWallet className="text-green-400 text-xl" />
        <span className="text-lg font-semibold">
          Wallet: ${walletBalance.toFixed(2)}
        </span>
      </div>

      {/* Highest Balance */}
      <div className="flex items-center gap-2 mb-6 bg-gray-800 py-2 px-4 rounded-lg">
        <FaCoins className="text-yellow-400 text-xl" />
        <span className="text-lg font-semibold">
          Highest Balance: ${highestBalance.toFixed(2)}
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
          onChange={(e) => handleBetChange(Number(e.target.value))}
          className="w-full p-2 bg-gray-700 rounded-lg text-center text-white focus:outline-none"
        />
      </div>

      {/* Difficulty Dropdown */}
      <div className="mb-6 w-full max-w-lg">
        <h2 className="text-lg font-semibold">Select Difficulty</h2>
        <select
          value={difficulty}
          onChange={(e) => handleDifficultyChange(e.target.value)}
          className="w-full p-2 bg-gray-700 rounded-lg text-white focus:outline-none"
        >
          <option value="Easy">Easy (1.5x)</option>
          <option value="Medium">Medium (2x)</option>
          <option value="Hard">Hard (3x)</option>
          <option value="Extreme">Extreme (5x)</option>
        </select>
      </div>

      {/* Payout */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Payout</h2>
        <div className="text-xl font-bold">
          Remaining Mines: {mineCounts[difficulty] - revealedCells.length} |{" "}
          Potential Payout: $
          {(betAmount * payoutMultipliers[difficulty]).toFixed(2)}
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-5 gap-2">
        {grid.map((row, rowIndex) =>
          row.map((cell, colIndex) => {
            const isRevealed = revealedCells.some(
              (cell) => cell.row === rowIndex && cell.col === colIndex
            );

            return (
              <button
                key={`${rowIndex}-${colIndex}`}
                onClick={() => handleCellClick(rowIndex, colIndex)}
                className={`w-16 h-16 flex items-center justify-center rounded-lg font-bold transition ${
                  isRevealed
                    ? "bg-green-500"
                    : gameOver && cell
                    ? "bg-red-500"
                    : "bg-gray-700 hover:bg-gray-600"
                }`}
              >
                {isRevealed && <SiCrystal />}
                {gameOver && cell && <FaBomb />}
              </button>
            );
          })
        )}
      </div>

      {/* Game Result */}
      {gameMessage && (
        <div className="mt-6 w-full max-w-lg bg-gray-700 rounded-lg shadow-md p-4 text-center">
          <h2 className="text-xl font-bold">Result</h2>
          <p className="mt-2 text-lg">{gameMessage}</p>
        </div>
      )}

      {/* Cash Out Button */}
      {cashOutAvailable && !gameOver && (
        <button
          onClick={handleCashOut}
          className="mt-6 bg-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-green-500 transition"
        >
          Cash Out
        </button>
      )}

      {/* Instructions */}
      <div className="mt-10 text-center text-gray-400">
        <p>This is a spoof game made just for development purpose</p>
      </div>
    </div>
  );
};

export default MinesGame;
