import { FC, useState, useEffect, useRef } from "react";
import axios from "axios";

// Define TypeScript interfaces for form state
interface FruitOrder {
  fruit: string;
  amount: number;
}

// Define TypeScript interface for API response
interface ApiResponse {
  message?: string;
  error?: string;
}

const App: FC = () => {
  const [name, setName] = useState<string>("");
  const [fruit, setFruit] = useState<string>("");
  const [amount, setAmount] = useState<number | "">("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Auto-focus on the name field when the component loads
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    nameInputRef.current?.focus();
  }, []);

  const resetForm = () => {
    setName("");
    setFruit("");
    setAmount("");
    nameInputRef.current?.focus(); // Refocus on name input
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate inputs
    if (!name || !fruit || !amount || amount <= 0) {
      setError("Please enter a valid name, fruit, and a positive quantity.");
      setMessage(null);
      return;
    }

    setError(null);
    setLoading(true); // Show loading state

    // Prepare data for API request
    const payload: FruitOrder = {
      fruit,
      amount: Number(amount),
    };

    try {
      const response = await axios.post<ApiResponse>(
        `http://localhost:5000/${name}/fruits`, // Dynamic URL with {name}
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      // Handle success response
      if (response.data.message) {
        setMessage(response.data.message);
        setError(null);
        resetForm(); // Reset form after success
      } else {
        throw new Error(response.data.error || "Unknown error");
      }
    } catch (err: any) {
      setError(err.response?.data?.error || "Failed to submit order. Please try again.");
      setMessage(null);
    } finally {
      setLoading(false); // Ensure button resets to "Order Now"
    }
  };


  const handleCloseMessage = () => {
    setMessage(null);
    setError(null);
    setLoading(false); // Ensure button is reset when message is closed
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-lg shadow-md max-w-md w-full"
      >
        <h2 className="text-lg font-semibold text-white mb-4">
          Order Your Favorite Fruit
        </h2>

        {/* Name Input */}
        <label className="block text-sm font-medium text-white mb-1">
          Name
        </label>
        <input
          ref={nameInputRef}
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="block w-full rounded-md bg-gray-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
        />

        {/* Fruit Input */}
        <label className="block text-sm font-medium text-white mb-1">
          Fruit
        </label>
        <input
          type="text"
          placeholder="Enter fruit name"
          value={fruit}
          onChange={(e) => setFruit(e.target.value)}
          className="block w-full rounded-md bg-gray-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500 mb-3"
        />

        {/* Quantity Input */}
        <label className="block text-sm font-medium text-white mb-1">
          Quantity
        </label>
        <input
          type="number"
          placeholder="Enter quantity"
          value={amount}
          onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
          className="block w-full rounded-md bg-gray-700 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded-md font-semibold text-white ${
            loading ? "bg-gray-500 cursor-not-allowed" : "bg-indigo-500 hover:bg-indigo-600"
          }`}
        >
          {loading ? "Submitting..." : "Order Now"}
        </button>

        {/* Success Message */}
        {message && (
          <div className="mt-4 p-3 bg-green-100 text-green-700 rounded-md relative">
            {message}
            <button
              onClick={handleCloseMessage}
              className="absolute top-2 right-2 text-green-900 hover:text-green-600"
            >
              ❌
            </button>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md relative">
            {error}
            <button
              onClick={handleCloseMessage}
              className="absolute top-2 right-2 text-red-900 hover:text-red-600"
            >
              ❌
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
