import { TEMPLATE_CONFIG } from "../config/templates";

export default function Contemporary({ state }) {
  const config = TEMPLATE_CONFIG.contemporary;

  // Safe values (prevents crash if undefined)
  const headline = state.headline || "";
  const highlightWord = state.highlightWord || "";
  const highlightColor = state.highlightColor || "#ffcc00";

  // Split safely (escape regex issues)
  const parts =
    highlightWord.length > 0
      ? headline.split(new RegExp(`(${highlightWord})`, "g"))
      : [headline];

  return (
    <div
      id="card"
      style={{
        width: "1080px",
        height: "1350px",
        position: "relative",
        overflow: "hidden",

        fontFamily:
    "'Hind Siliguri', 'Noto Sans Bengali', sans-serif",

        backgroundImage: state.background
          ? `url(${state.background})`
          : "none",
        backgroundSize: "cover",
        backgroundPosition: "center",

        color: "white",
      }}
    >
      {/* DARK OVERLAY */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,.7), rgba(0,0,0,.95))",
        }}
      />

      {/* SUBCATEGORY */}
      <div
  style={{
    position: "absolute",
    top: 64,
    left: 72,
    zIndex: 2,

    display: "inline-flex",
    alignItems: "center",

    borderLeft: "5px solid #ffcc00",
    background: "rgba(255,255,255,0.12)",
    backdropFilter: "blur(8px)",

    padding: "10px 22px 10px 18px",
    borderRadius: "0 40px 40px 0",

    fontSize: 30,
    fontWeight: 600,
    color: "white",
    maxWidth: 480,
  }}
>
  {state.subcategory}
</div>

      {/* LOGO */}
      <img
        src={config.logo}
        alt="logo"
        crossOrigin="anonymous"
        style={{
          position: "absolute",
          top: 60,
          right: 30,
          height: 70,
          zIndex: 2,
        }}
      />

      {/* HEADLINE (SMART HIGHLIGHT SYSTEM) */}
<div
  style={{
    position: "absolute",
    top: 800,
    left: 72,
    right: 72,
    zIndex: 2,
  }}
>
  {/* ACCENT RULE (same as HTML) */}
  <div
    style={{
      width: 600,
      height: 4,
      background: "#ffcc00",
      borderRadius: 2,
      marginBottom: 36,
    }}
  />

  {/* HEADLINE */}
  <h1
    style={{
      fontSize: 58,
      fontWeight: 700,
      lineHeight: 1.20,
      color: "white",
      textShadow: "0 2px 24px rgba(0,0,0,0.55)",
    }}
  >
    {state.highlightWord
      ? state.headline
          .split(new RegExp(`(${state.highlightWord})`, "g"))
          .map((part, i) => {
            const isHighlight = part === state.highlightWord;

            return (
              <span
                key={i}
                style={{
                  color: isHighlight
                    ? state.highlightColor
                    : "white",
                }}
              >
                {part}
              </span>
            );
          })
      : state.headline}
  </h1>

  {/* DIVIDER */}
  <div
    style={{
      width: 48,
      height: 2,
      background: "rgba(255,255,255,0.35)",
      marginTop: 28,
    }}
  />
</div>

      {/* DATE */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          left: 30,
          zIndex: 2,
          fontSize: 26,
          opacity: 0.85,
        }}
      >
        {state.date}
      </div>

      {/* SOURCE */}
      <div
        style={{
          position: "absolute",
          bottom: 60,
          right: 30,
          zIndex: 2,
          fontSize: 26,
          opacity: 0.85,
        }}
      >
        সূত্র: {state.source}
      </div>

      {/* COPYRIGHT */}
      <div
        style={{
          position: "absolute",
          bottom: 10,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          fontSize: 30,
          opacity: 0.7,
        }}
      >
        {config.copyright}
      </div>
    </div>
  );
}