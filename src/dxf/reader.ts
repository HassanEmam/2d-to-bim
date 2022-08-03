import {
  DxfParser,
  IBlock,
  IEntity,
  IPoint,
  ITables,
  IViewPort,
} from "dxf-parser";
import { EventEmitter } from "../utils/EventEmitter";

export default class Reader extends EventEmitter {
  dxf: DxfParser = new DxfParser();
  file: Blob;
  entities: IEntity[] = [];
  header: Record<string, number | IPoint> = {};
  blocks: Record<string, IBlock> = {};
  tables: any = null;
  ready: boolean = false;
  freader: FileReader;

  constructor(file: Blob) {
    super();
    if (file) {
      this.file = file;
      this.freader = new FileReader();
      this.read();
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
          this.tables = content.tables as ITables;
        }
        console.log(content);
        console.log("Header", this.header);

        console.log("Entities", this.entities);
        console.log("Blocks", this.blocks);
        console.log("Tables", this.tables);
        this.ready = true;
        this.trigger("dxfloaded");
      };
    } else {
      throw new Error("No file specified");
    }
  }

  async read() {
    try {
      await this.freader.readAsText(this.file);
    } catch (error) {
      console.log(error);
    }
  }

  async getAllLayers() {
    if (this.ready) {
      let layers: any = null;
      let res = [];
      layers = this.tables.layer.layers;
      for (const [key, value] of Object.entries(layers)) {
        res.push(value);
      }
      return res;
    } else {
      throw new Error("File not ready");
    }
  }

  getEntitiesByLayer(layer: string) {
    if (this.ready) {
      let res = [];
      for (const entity of this.entities) {
        if (entity.layer === layer) {
          res.push(entity);
        }
      }
      return res;
    } else {
      throw new Error("File not ready");
    }
  }
}
