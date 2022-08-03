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
      r = await new Reader(fInput.files[0]);
      console.log("r", r);
      console.log("layers", r.entities);
      r.on("dxfloaded", async () => {
        console.log("dxfloaded");
        console.log("GetAllLayers", await r.getAllLayers());
        console.log(
          "GetEntitiesByLayer",
          await r.getEntitiesByLayer("BlueLayer")
        );
      });
      (window as any).dxfreader = r;
    }
  },
  false
);
