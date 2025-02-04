import prisma from "../config/db";

export const registrationRepository = {
  async createRegistration(userId: number, workshopIds: number[]) {
    return prisma.registration.create({
      data: {
        userId,
        workshops: {
          create: workshopIds.map((workshopId) => ({
            workshopId,
          })),
        },
      },
      include: {
        workshops: { include: { workshop: true } },
      },
    });
  },

  async findByUserId(userId: number) {
    return prisma.registration.findUnique({
      where: { userId },
      include: { workshops: { include: { workshop: true } } },
    });
  },
};
