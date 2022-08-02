import Reader from "./dxf/reader";

let r: Reader;
const div = document.createElement("div");
div.innerHTML = "Initial Template";
document.body.appendChild(div);

const fInput = document.getElementById("file-input") as HTMLInputElement;
fInput.addEventListener(
  "change",
  async (e) => {
    if (fInput.files) {
      r = new Reader(fInput.files[0]);
      //   await r.read();
      console.log("r", r);
      console.log("layers", r.entities);
      (window as any).dxfreader = r;
    }
  },
  false
);

async function printLayers() {
  const layers = await r.getAllLayers();
  console.log(r.entities);
}
