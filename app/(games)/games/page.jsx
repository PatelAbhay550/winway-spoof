import Link from "next/link";
import { FaUser, FaPlayCircle } from "react-icons/fa";
export const metadata = {
  title: "Games List || Winway: Spoof Casino Game",
  description: "Play spoof casino games for fun, developed by abhay patel",
};
const GameList = () => {
  const games = [
    {
      name: "Mines Game",
      image: "https://dummyimage.com/200x300&text=Mines+Game",
      players: 1200,
      link: "/games/mines", // URL of the specific game
    },
    {
      name: "Dice Game",
      image: "https://dummyimage.com/200x300&text=Dice+Game",
      players: 800,
      link: "/games/dice",
    },
    {
      name: "Roulette Game",
      image: "https://dummyimage.com/200x300&text=Roulette+Game",
      players: 800,
      link: "/games/roulette",
    },
    {
      name: "Crash Game",
      image: "https://dummyimage.com/200x300&text=Crash+Game",
      players: 800,
      link: "/games/crash",
    },
    // ... other games
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-10">Available Games</h1>

      {/* Games List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {games.map((game, index) => (
          <Link key={index} href={game.link}>
            <div className="relative bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300">
              <img
                src={game.image}
                alt={game.name}
                className="w-full h-48 object-cover rounded-t-lg"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{game.name}</h3>
                <div className="flex items-center text-gray-400">
                  <FaUser className="mr-2" />
                  <span className="text-sm">{game.players} Players</span>
                  <FaPlayCircle className="ml-2 text-green-400" />
                </div>
              </div>
              <div className="absolute top-2 right-2 bg-green-500 text-white py-1 px-3 rounded-full text-xs">
                Live
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default GameList;
