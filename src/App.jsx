import { useCallback, useEffect, useRef, useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [specialCharacter, setSpecialCharacter] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) str += "0123456789";
    if (specialCharacter) str += "@#$%^&*()_+{}[];:,./<>?'`~";

    for (let i = 1; i <= length; i++) {
      const charIndex = Math.floor(Math.random() * str.length + 1); // 1 to avoid getting 0
      pass += str.charAt(charIndex);
    }

    setPassword(pass);
  }, [length, number, specialCharacter, setPassword]);
  // setPassword is added in dependency array for optimisation purposes. And the above dependency array isnt to be compared to the dependency array of useEffect as they serve different purposes

  useEffect(
    () => passwordGenerator(),
    [length, number, specialCharacter, passwordGenerator]
  );

  const copyToClipbooard = () => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 20);
    window.navigator.clipboard.writeText(password);
  };

  return (
    <>
      <h1 className="text-3xl text-center text-white">Password Generator</h1>
      <div className="bg-gray-400 rounded-2xl m-10">
        <div className="pt-5">
          <input
            type="text"
            readOnly
            value={password}
            ref={passwordRef}
            placeholder="password"
          />
          <button
            onClick={copyToClipbooard}
            className="bg-blue-400 hover:bg-blue-300 p-1"
          >
            copy
          </button>
        </div>
        <div className="flex justify-center">
          <div className="text-black m-2">
            <input
              type="range"
              id="length"
              min={6}
              max={100}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
            <label htmlFor="length" className="px-1">
              Length: {length}
            </label>
          </div>
          <div className="text-black m-2">
            <input
              type="checkbox"
              id="number"
              defaultChecked={number}
              onChange={() => setNumber((prev) => !prev)}
            />
            <label htmlFor="number" className="px-1">
              Numbers
            </label>
          </div>
          <div className="text-black m-2">
            <input
              type="checkbox"
              id="specialChar"
              defaultChecked={specialCharacter}
              onChange={() => setSpecialCharacter((prev) => !prev)}
            />
            <label htmlFor="specialChar" className="px-1">
              specialCharacter
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
