import html2canvas from "html2canvas";

export async function downloadCard(id = "export-card") {
  const element = document.getElementById(id);

  await document.fonts.ready;

  const canvas = await html2canvas(element, {
    scale: 3,
    useCORS: true,
    backgroundColor: null,
  });

  const link = document.createElement("a");
  link.download = "card.png";
  link.href = canvas.toDataURL("image/png");
  link.click();
}