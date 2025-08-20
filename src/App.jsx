import { useState } from 'react';
const languages = [
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ru', name: 'Russian' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ko', name: 'Korean' },
  { code: 'te', name: 'Telugu' },
];

function App() {
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('hi'); 
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text to translate.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setTranslatedText('');
    const url = 'https://lingvanex-translate.p.rapidapi.com/translate';
    const options = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'efa1ba9959msh8fd2a41e252c1f2p19c689jsn250860c67a9e', 
        'X-RapidAPI-Host': 'lingvanex-translate.p.rapidapi.com'
      },
      body: JSON.stringify({
        from: 'en_US', 
        to: targetLanguage, 
        text: inputText 
      })
    };

    try {
      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      
      setTranslatedText(result.result); 
    } catch (error) {
      console.error("Translation Error:", error);
      setError("Failed to translate. Please check your connection or API key.");
    } finally {
      setIsLoading(false); 
    }
  };
  return (
    <div className="bg-gray-900 min-h-screen flex items-center justify-center font-sans">
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg max-w-2xl w-full text-white">
        
        {}
        <h1 className="text-4xl font-bold text-center mb-6 text-cyan-400">Text Translator 🌐</h1>

        {}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <textarea
            className="w-full h-40 p-4 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 resize-none"
            placeholder="Enter English text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <textarea
            className="w-full h-40 p-4 bg-gray-700 rounded-lg focus:outline-none resize-none"
            placeholder="Translation will appear here..."
            value={translatedText}
            readOnly
          />
        </div>
        {}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center space-x-2">
            <label htmlFor="language-select" className="text-gray-400">Translate to:</label>
            <select
              id="language-select"
              className="bg-gray-700 text-white p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 cursor-pointer"
              value={targetLanguage}
              onChange={(e) => setTargetLanguage(e.target.value)}
            >
              {languages.map((lang) => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleTranslate}
            disabled={isLoading}
            className="bg-cyan-600 hover:bg-cyan-700 text-white font-bold py-2 px-6 rounded-lg transition-colors duration-300 disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Translating...' : 'Translate'}
          </button>
        </div>

        {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      </div>
    </div>
  );
}

export default App;