import "./App.css";
import Search from "./components/Search";
import emojiList from "./assets/data/emojiList.json";
import Line from "./components/Line";

import { useState } from "react";

function App() {
  const [result, setResult] = useState(emojiList.slice(0, 20));

  // const result = emojiList.slice(0, 20);
  // console.log(result);

  const handleSearch = (event) => {
    // console.log(event.target.value);
    // event.target.value;
    const text = event.target.value;

    const newTab = [];

    for (let i = 0; i < emojiList.length; i++) {
      // console.log(emojiList[i].keywords.indexOf(text));
      if (emojiList[i].keywords.indexOf(text) > -1) {
        // console.log(emojiList[i]);

        newTab.push(emojiList[i]);
      }
      if (newTab.length === 20) {
        // console.log("break");

        break;
      }
    }
    // console.log(newTab.length);
    setResult(newTab);
  };

  return (
    <div className="container">
      <Search handleSearch={handleSearch} />
      {result.map((emoji) => {
        return <Line emoji={emoji} />;
      })}
    </div>
  );
}

export default App;
