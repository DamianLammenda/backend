import mongoose from "mongoose";
import _ from "lodash";

class ContainerMongo {
  contructor(model) {
    this.model = model;
  }
  async create(data) {
    const objet = await this.model.create(data);
    return objet;
  }
  async getAll() {
    const data = await this.model.find({});
    return data;
  }
  async getById(id) {
    const data = await this.model.findById(id);
    if (_.isNil(data) || _.isNull(data)) throw new Error("item not found");
    return data;
  }

  async updateById(id, data) {
    try {
      const dataUpdated = await model.findByIdAndUpdate(id, data, {
        new: true,
      });
      return dataUpdated;
    } catch (err) {
      throw new Error("item not found");
    }
  }
  async deleteById(id) {
    try {
      await this.model.findByIdAndDelete(id);
    } catch (err) {
      console.error(err.message)
    }
  }
}

export default ContainerMongo;