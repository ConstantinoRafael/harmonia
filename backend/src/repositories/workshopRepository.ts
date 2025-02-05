import { Prisma, Workshop } from "@prisma/client";
import prisma from "../config/db";

export const workshopRepository = {
  async create(workshopData: Prisma.WorkshopCreateInput): Promise<Workshop> {
    return prisma.workshop.create({ data: workshopData });
  },

  async findById(id: number) {
    return prisma.workshop.findUnique({
      where: { id },
      include: {
        registrations: {
          include: {
            registration: {
              // 🔹 Acessa `registration` primeiro
              include: {
                user: {
                  // 🔹 Agora conseguimos acessar o `user`
                  select: { name: true, email: true, phone: true },
                },
              },
            },
          },
        },
      },
    });
  },

  async findAll(isInfantojuvenil?: boolean): Promise<Workshop[]> {
    return prisma.workshop.findMany({
      where: isInfantojuvenil !== undefined ? { isInfantojuvenil } : {},
      include: { registrations: true },
    });
  },

  async findAllAdmin() {
    return prisma.workshop.findMany({
      select: {
        id: true,
        title: true,
        professorName: true,
        _count: {
          select: { registrations: true }, // Conta os inscritos
        },
      },
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
