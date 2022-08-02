import {
  DxfParser,
  IBlock,
  IEntity,
  IPoint,
  ITables,
  IViewPort,
} from "dxf-parser";
import * as fs from "fs";

export default class Reader {
  dxf: DxfParser = new DxfParser();
  file: Blob;
  entities: IEntity[] = [];
  header: Record<string, number | IPoint> = {};
  blocks: Record<string, IBlock> = {};
  tables: ITables;
  ready: boolean = false;
  freader: FileReader;

  constructor(file: Blob) {
    if (file) {
      this.file = file;
      this.entities = [];
      this.header = {};
      this.blocks = {};
      this.tables;
      this.freader = new FileReader();
      this.read();
    } else {
      throw new Error("No file specified");
    }
  }

  read() {
    try {
      this.freader.readAsText(this.file);
      this.freader.onload = (e) => {
        const content = this.dxf.parseSync(e.target?.result as string);
        this.entities = content?.entities as IEntity[];
        if (content?.header) {
          this.header = content.header;
        }
        if (content?.blocks) {
          this.blocks = content.blocks;
        }
        if (content?.tables) {
          this.tables = content.tables;
        }
        console.log(content);
        console.log("Header", this.header);

        console.log("Entities", this.entities);
        console.log("Blocks", this.blocks);
        console.log("Tables", this.tables);
      };
    } catch (error) {
      console.log(error);
    }
  }

  async getAllLayers() {
    let layers: any = null;
    console.log(this.tables, this.entities, this.blocks, this.header);

    layers = this.tables;
    // .forEach((layer: any) => {
    //   if (layer) {
    //     console.log(layer);
    //     layers.push(layer);
    //   }
    // });
    return layers;
  }
}
