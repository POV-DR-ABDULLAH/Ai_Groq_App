import { requestToGroqAI } from "./utils/Groq";
import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "./App.css";

function App() {
  const [data, setData] = useState("");
  const content = document.getElementById("content"); // Akses ID content dengan benar

  const handleSubmit = async () => {
    const ai = await requestToGroqAI(content.value);
    setData(ai);
  };

  const handleKeyDown = (event) => {
    // Cegah form refresh dan panggil handleSubmit jika Enter ditekan
    if (event.key === "Enter") {
      event.preventDefault();  // Mencegah form di-submit
      handleSubmit();
    }
  };

  return (
    <main className="flex min-h-[92vh] flex-col items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-8 px-4 overflow-hidden rounded-xl">
      <h1 className="text-5xl font-bold mb-8">AI Groq App</h1>
      <form className="flex flex-col py-6 gap-6 w-full max-w-md bg-white bg-opacity-70 rounded-xl shadow-xl p-5 backdrop-blur-md">
        <input
          type="text"
          placeholder="Ketik Pertanyaan Disini"
          className="py-3 px-5 text-lg rounded-xl bg-white text-gray-800 border-2 border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50 transition-all duration-300"
          id="content"
          onKeyDown={handleKeyDown}  // Menambahkan event untuk keydown
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="py-3 px-6 text-white bg-indigo-600 font-semibold rounded-xl hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all duration-300"
        >
          Kirim
        </button>
      </form>

      <div className="max-w-md w-full mx-auto mt-8 overflow-auto flex-1 rounded-xl">
        {data && (
          <SyntaxHighlighter
            language="swift"
            style={darcula}
            showLineNumbers={false}
          >
            {data}
          </SyntaxHighlighter>
        )}
      </div>
    </main>
  );
}

export default App;
