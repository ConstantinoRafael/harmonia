import { Prisma, Workshop } from "@prisma/client";
import prisma from "../config/db";

export const workshopRepository = {
  async create(workshopData: Prisma.WorkshopCreateInput): Promise<Workshop> {
    return prisma.workshop.create({ data: workshopData });
  },

  async findById(id: string): Promise<Workshop | null> {
    return prisma.workshop.findUnique({
      where: { id },
      include: { registrations: true },
    });
  },

  async findAll(): Promise<Workshop[]> {
    return prisma.workshop.findMany({ include: { registrations: true } });
  },

  async update(
    id: string,
    workshopData: Prisma.WorkshopUpdateInput
  ): Promise<Workshop> {
    return prisma.workshop.update({ where: { id }, data: workshopData });
  },

  async delete(id: string): Promise<void> {
    await prisma.workshop.delete({ where: { id } });
  },
};
