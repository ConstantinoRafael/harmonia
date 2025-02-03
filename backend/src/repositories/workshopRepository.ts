import { Prisma, Workshop } from "@prisma/client";
import prisma from "../config/db";

export const workshopRepository = {
  async create(workshopData: Prisma.WorkshopCreateInput): Promise<Workshop> {
    return prisma.workshop.create({ data: workshopData });
  },

  async findById(id: number): Promise<Workshop | null> {
    return prisma.workshop.findUnique({
      where: { id },
      include: { registrations: true },
    });
  },

  async findAll(isInfantojuvenil?: boolean): Promise<Workshop[]> {
    return prisma.workshop.findMany({
      where: isInfantojuvenil !== undefined ? { isInfantojuvenil } : {},
      include: { registrations: true },
    });
  },

  async update(
    id: number,
    workshopData: Prisma.WorkshopUpdateInput
  ): Promise<Workshop> {
    return prisma.workshop.update({ where: { id }, data: workshopData });
  },

  async delete(id: number): Promise<void> {
    await prisma.workshop.delete({ where: { id } });
  },
};
