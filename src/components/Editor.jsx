import { generateCard } from "../services/api";
import { useState } from "react";

export default function Editor({
  state,
  setState
}) {

  const [loading, setLoading] = useState(false);

  const update = (key, value) => {

    setState(prev => ({
      ...prev,
      [key]: value
    }));

  };



  // ===========================
  // Upload Custom Background
  // ===========================

  function handleBackgroundUpload(e) {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {

      update(
        "background",
        reader.result
      );

    };

    reader.readAsDataURL(file);

  }



  // ===========================
  // Restore Original Article Image
  // ===========================

  function restoreArticleBackground() {

    if (state.articleBackground) {

      update(
        "background",
        state.articleBackground
      );

    }

  }



  // ===========================
  // Generate Card
  // ===========================

  async function handleGenerate() {

    try {

      if (!state.articleUrl) {

        alert("Please enter article URL");

        return;

      }

      setLoading(true);

      console.log(
        "Sending article URL:",
        state.articleUrl
      );

      const data = await generateCard(
        state.articleUrl
      );

      console.log(
        "Backend response:",
        data
      );

      setState(prev => ({

        ...prev,

        headline:
          data.headline || prev.headline,

        summary:
          data.summary || prev.summary,

        hashtags:
          data.hashtags
            ? data.hashtags
                .map(tag =>
                  tag.startsWith("#")
                    ? tag
                    : `#${tag}`
                )
                .join(", ")
            : prev.hashtags,

        background:
          data.image_url || prev.background,

        // Save original article image
        articleBackground:
          data.image_url || prev.articleBackground,

        source:
          data.source || prev.source,

        date:
          data.date || prev.date

      }));

    }

    catch(err) {

      console.error(err);

      alert("Generation failed");

    }

    finally {

      setLoading(false);

    }

  }


return (

<div className="editor">

<h2 className="panel-title">
Contemporary Card Generator
</h2>

<div className="group">

<label>
Article URL
</label>

<input
value={state.articleUrl || ""}
onChange={(e)=>
update(
"articleUrl",
e.target.value
)}
placeholder="Paste article link"
/>

</div>

<button
className="generate-btn"
onClick={handleGenerate}
disabled={loading}
>

{
loading
?
"Generating..."
:
"✨ Generate From Article"
}

</button>


{/* ========================= */}
{/* BACKGROUND CONTROLS */}
{/* ========================= */}

<div className="group">

<label>
Upload Background Image
</label>

<input
type="file"
accept="image/*"
onChange={handleBackgroundUpload}
/>

</div>


<button
className="generate-btn"
type="button"
onClick={restoreArticleBackground}
style={{
marginTop:-10,
marginBottom:20,
background:"#444"
}}
>

Restore Article Image

</button>


<div className="group">

<label>

Background Opacity

(
{Math.round(state.backgroundOpacity*100)}%
)

</label>

<input
type="range"
min="0.30"
max="1"
step="0.05"
value={state.backgroundOpacity}
onChange={(e)=>
update(
"backgroundOpacity",
Number(e.target.value)
)}
/>

</div>


<div className="group">

<label>

Background Brightness

(
{Math.round(state.backgroundBrightness*100)}%
)

</label>

<input
type="range"
min="0.70"
max="1.60"
step="0.05"
value={state.backgroundBrightness}
onChange={(e)=>
update(
"backgroundBrightness",
Number(e.target.value)
)}
/>

</div>


<div className="group">

<label>

Background Blur

(
{state.backgroundBlur}px
)

</label>

<input
type="range"
min="0"
max="10"
step="1"
value={state.backgroundBlur}
onChange={(e)=>
update(
"backgroundBlur",
Number(e.target.value)
)}
/>

</div>





<div className="group">

<label>
Headline
</label>

<textarea
value={state.headline || ""}
onChange={(e)=>
update(
"headline",
e.target.value
)}
/>

</div>


<div className="group">

<label>
Summary
</label>

<textarea
value={state.summary}
onChange={(e)=>
update(
"summary",
e.target.value
)}
rows="6"
/>

</div>


<div className="group">

<label>
Hashtags
</label>

<input
value={state.hashtags}
onChange={(e)=>
update(
"hashtags",
e.target.value
)}
/>

</div>


<div className="group">

<label>
Highlighted Word
</label>

<input
value={state.highlightWord || ""}
onChange={(e)=>
update(
"highlightWord",
e.target.value
)}
/>

</div>


<div className="group">

<label>
Highlight Color
</label>

<input
type="color"
value={state.highlightColor || "#ff0000"}
onChange={(e)=>
update(
"highlightColor",
e.target.value
)}
/>

</div>


<div className="group">

<label>
Subcategory
</label>

<input
value={state.subcategory || ""}
onChange={(e)=>
update(
"subcategory",
e.target.value
)}
/>

</div>


<div className="group">

<label>
Source
</label>

<input
value={state.source || ""}
onChange={(e)=>
update(
"source",
e.target.value
)}
/>

</div>

</div>

);

}
