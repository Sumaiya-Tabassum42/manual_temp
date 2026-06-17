import { generateArticleCard } from "../services/api";
import { useState } from "react";


export default function Editor({
  state,
  setState
}) {


const [loading,setLoading] =
useState(false);



const update=(key,value)=>{

setState(prev=>({
...prev,
[key]:value
}));

};



async function handleGenerate(){

try{


setLoading(true);


const data =
await generateArticleCard(
state.articleUrl
);



setState(prev=>({

...prev,


headline:
data.headline ||
prev.headline,


background:
data.image_url ||
prev.background,


source:
data.source ||
prev.source,


subcategory:
data.subcategory ||
prev.subcategory


}));



}
catch(err){

console.error(err);

alert(
"Generation failed"
);

}
finally{

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

value={state.articleUrl}

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

value={state.headline}

onChange={(e)=>
update(
"headline",
e.target.value
)}

 />

</div>





<div className="group">

<label>
Highlighted Word
</label>


<input

value={state.highlightWord}

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

value={state.highlightColor}

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

value={state.subcategory}

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

value={state.source}

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