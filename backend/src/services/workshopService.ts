import { Prisma, Workshop } from "@prisma/client";
import { workshopRepository } from "../repositories/workshopRepository";

export const workshopService = {
  async create(workshopData: Prisma.WorkshopCreateInput): Promise<Workshop> {
    return workshopRepository.create(workshopData);
  },

  async getById(id: number): Promise<Workshop | null> {
    return workshopRepository.findById(id);
  },

  async getAll(isInfantojuvenil?: boolean): Promise<Workshop[]> {
    return workshopRepository.findAll(isInfantojuvenil);
  },

  async update(
    id: number,
    workshopData: Prisma.WorkshopUpdateInput
  ): Promise<Workshop> {
    const existingWorkshop = await workshopRepository.findById(id);
    if (!existingWorkshop) {
      throw new Error("Workshop não encontrado!");
    }

    return workshopRepository.update(id, workshopData);
  },

  async delete(id: number): Promise<void> {
    const existingWorkshop = await workshopRepository.findById(id);
    if (!existingWorkshop) {
      throw new Error("Workshop não encontrado!");
    }

    return workshopRepository.delete(id);
  },
};
