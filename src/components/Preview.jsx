import Contemporary from "../templates/Contemporary";
import { downloadCard } from "../utils/downloadCard";


export default function Preview({ state }) {


  return (

    <div className="preview">


      <div
        id="export-card"
        className="preview-frame"
      >

        <Contemporary
          state={state}
        />


      </div>


      <button
        className="download-btn"
        onClick={() =>
          downloadCard("export-card")
        }
      >

        ⬇ Download PNG

      </button>


    </div>

  );
}