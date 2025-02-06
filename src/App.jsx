import { requestToGroqAI } from "./utils/Groq";
import { useState } from "react";
import { Light as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import "./App.css";

function App() {
  const [data, setData] = useState("");

  const handleSubmit = async () => {
        const ai = await requestToGroqAI(document.getElementById('content').value);
        console.log({ ai });
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
    <main className="flex min-h-[80vh] flex-col items-center justify-center max-w-xl w-full mx-auto">
      <h1 className="text-4xl text-indigo-300">AI Groq App</h1>
      <form className="flex flex-col py-4 gap-4 w-full">
        <input
          type="text"
          placeholder="Ketik Pertanyaan Disini"
          className="py-2 px-4 text-md rounded-md bg-white border-3 border-indigo-400 hover:border-indigo-300"
          id="content"
          onKeyDown={handleKeyDown} 
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="py-2 px-4 text-white bg-indigo-400 font-bold rounded-md hover:bg-indigo-300"
        >
          Kirim
        </button>
      </form>
      <div className="max-w-xl w-full mx-auto">
          {data && (
            <SyntaxHighlighter language='swift' style={darcula} wrapLongLines={true} className='rounded-lg shadow-lg p-4'>
              {data}
            </SyntaxHighlighter>
          )}
      </div>
    </main>
  );
}

export default App;
