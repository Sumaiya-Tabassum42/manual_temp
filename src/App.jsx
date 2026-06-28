import { useState } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

import "./index.css";

export default function App() {
  const [state, setState] = useState({
    // Template
    template: "contemporary",

    // Article
    articleUrl: "",

    // AI Content
    headline: "আপনার শিরোনাম এখানে আসবে",
    summary: "",
    hashtags: "",

    // Highlight
    highlightWord: "",
    highlightColor: "#E63946",

    // Card Info
    subcategory: "ফিফা বিশ্বকাপ",
    source: "The Contemporary",

    date: new Date().toLocaleDateString("bn-BD"),

    // Background Images
    background: null,          // Currently displayed image
    articleBackground: null,   // Original AI/article image

    // Background Controls
    backgroundOpacity: 0.95,
    backgroundBrightness: 1.15,
    backgroundBlur: 0,
    backgroundPosition: "center",
  });

  return (
    <div className="app-container">
      <Editor
        state={state}
        setState={setState}
      />

      <Preview
        state={state}
      />
    </div>
  );
}
