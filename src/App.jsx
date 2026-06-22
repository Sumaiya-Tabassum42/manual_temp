import { useState } from "react";
import Editor from "./components/Editor";
import Preview from "./components/Preview";

import "./index.css";

export default function App() {

  const [state, setState] = useState({

    // fixed template
    template: "contemporary",

    // AI / manual fields
    articleUrl: "",

    headline:
      "আপনার শিরোনাম এখানে আসবে",

    highlightWord: "",
    highlightColor: "#E63946",

    // editable fields
    subcategory: "ফিফা বিশ্বকাপ",
    source: "The Contemporary",

    date:
      new Date().toLocaleDateString("bn-BD"),

    background: null,

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