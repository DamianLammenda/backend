import fs from "fs";
import { getDirName } from "../../utils.js";


class ContainerFs {
  constructor(fileName) {
    this.path = getDirName() + `/src/services/${fileName}/${fileName}.json`;
  }

  async getAll() {
    const fileData = await fs.promises.readFile(this.path, "utf-8");
    return JSON.parse(fileData);
  }

  async create(data) {
    const items = await this.getAll()
    items.push(data);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(items),
      null,
      2
    );
    return data;
  }

  async getById(uuid) {
    const items = await this.getAll()
    let found = items.find((p) => p.uuid == uuid);
    return found;
  }

  async updateById(uuid, data) {
    const items = await this.getAll();
    let itemUpdated;
    const itemsUpdated = items.map((p) => {
      if (p.uuid === uuid) {
        itemUpdated = { ...p, ...data };
        return itemUpdated;
      }
      return p;
    });
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(itemsUpdated, null, 2)
    );
    return itemUpdated;
  }

  async deleteById(uuid) {
    const items = await this.getAll()
    const itemsFiltered = items.filter((p) => p.uuid !== uuid);
    await fs.promises.writeFile(
      this.path,
      JSON.stringify(itemsFiltered, null, "\t")
    );
  }
}
export default ContainerFs;