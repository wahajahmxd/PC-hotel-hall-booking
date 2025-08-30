import { Link } from "react-router-dom";
import { Button } from "../components/UI/Button.jsx";
import { Label } from "../components/UI/Label.jsx";

const Home = () => {
  return (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center bg-white" style={{background: 'repeating-linear-gradient(135deg, #f3f3f3 0 20px, #e9e7e1 20px 40px)'}}>
      {/* Main Heading */}
      <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight text-gray-900">
        Welcome to <span className="text-black">Realm of Premium Banquets</span>
      </h1>

      {/* Subheading */}
      <p className="text-lg md:text-xl font-light mb-12 text-gray-700">
        Your premier destination for Weddings, Seminars, Meetings, and more.
      </p>

      {/* Call to Action Buttons */}
      <div className="flex gap-8 mb-12">
        <Link to="/register">
          <Button variant="black" size="large" className="px-8 py-4">
            Register
          </Button>
        </Link>
        <Link to="/login">
          <Button variant="white" size="large" className="px-8 py-4">
            Login
          </Button>
        </Link>
      </div>

      {/* Description or Features Section */}
      <section className="max-w-4xl mx-auto mb-16 text-gray-600">
        <h2 className="text-3xl font-semibold mb-4">Why Choose Realm of Premium Banquets?</h2>
        <ul className="space-y-4 text-lg font-light list-inside">
          <li className="flex items-center">
            <span className="text-black mr-3">✔️</span> Elegant, spacious venues for all events.
          </li>
          <li className="flex items-center">
            <span className="text-black mr-3">✔️</span> State-of-the-art facilities and technology.
          </li>
          <li className="flex items-center">
            <span className="text-black mr-3">✔️</span> Premium services tailored to your needs.
          </li>
        </ul>
      </section>

      {/* Footer */}
      <footer className="mt-16 text-sm text-gray-400">
        Made by Wahaj for Ping-Up &copy; 2025 Realm of Premium Banquets
      </footer>
    </div>
  );
};

export default Home;
