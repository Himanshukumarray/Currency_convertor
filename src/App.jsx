import { useState } from "react";
import { InputBox } from "./components";
import useCurrencyInfo from "./hooks/useCurrencyinfo";

import "./App.css";

function App() {
  const [amount, setAmount] = useState(0);
  const [from, setFrom] = useState("usd");
  const [to, setTo] = useState("inr");
  const [convertedamount, setConvertedamount] = useState(0);
  const currencyInfo = useCurrencyInfo(from);
  const options = Object.keys(currencyInfo);

  const swap = () => {
    setFrom(to);
    setTo(from);
    setAmount(convertedamount);
  };

  const convert = () => {
    if (currencyInfo[to]) {
      setConvertedamount(amount * currencyInfo[to]);
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: `url('https://cdn.zeebiz.com/sites/default/files/styles/zeebiz_850x478/public/2023/09/04/259013-share-market.jpg?itok=RQRZeL8q')`,
      }}
    >
      {/* Animated Blurry Circles */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>

      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative w-full max-w-lg p-8 bg-white/20 backdrop-blur-2xl shadow-2xl rounded-2xl border border-white/40 transition-all duration-300 hover:shadow-blue-400 hover:shadow-lg">
        <h1 className="text-3xl font-extrabold text-white text-center mb-6 tracking-wide">
          Currency Converter 💰
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            convert();
          }}
        >
          <div className="mb-6">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setFrom(currency)}
              selectCurrency={from}
              onAmountChange={(amount) => setAmount(amount)}
            />
          </div>

          {/* Swap Button with Animation */}
          <div className="relative flex justify-center my-6">
            <button
              type="button"
              className="flex items-center justify-center p-3 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-full shadow-xl hover:shadow-blue-400 hover:scale-110 transition-all duration-300 rotate-0 hover:rotate-180"
              onClick={swap}
            >
              🔄
            </button>
          </div>

          <div className="mb-6">
            <InputBox
              label="To"
              amount={convertedamount}
              currencyOptions={options}
              onCurrencyChange={(currency) => setTo(currency)}
              selectCurrency={to}
              amountDisable
            />
          </div>
          
          <button
            type="submit"
            className="w-full py-3 text-lg font-bold text-white bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-purple-500 hover:shadow-md active:scale-95"
          >
            Convert {from.toUpperCase()} to {to.toUpperCase()} 🚀
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
