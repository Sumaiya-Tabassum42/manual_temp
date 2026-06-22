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
        "n8n response:",
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
        tag.startsWith("#") ? tag : `#${tag}`
      )
      .join(", ")
  : prev.hashtags,


background:
data.image_url || prev.background,


source:
data.source || prev.source,


date:
data.date || prev.date

}));


    }

    catch(err) {

      console.error(
        "Generation error:",
        err
      );

      alert(
        "Generation failed"
      );

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