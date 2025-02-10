import prisma from "../config/db";
import { registrationRepository } from "../repositories/registrationRepository";

export const registrationService = {
  async createRegistration(
    name: string,
    email: string,
    phone: string,
    birthday: Date,
    workshopIds: number[]
  ) {
    // Verifica se o usuário já existe
    let user = await prisma.user.findUnique({ where: { email } });

    console.log(user);

    if (!user) {
      // Cria o usuário se não existir
      user = await prisma.user.create({
        data: {
          name,
          email,
          phone,
          birthday, // Já está no formato correto
        },
      });
    }

    // Cria a inscrição
    return prisma.registration.create({
      data: {
        userId: user.id,
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

  async getRegistrationsByUser(userId: number) {
    return registrationRepository.findByUserId(userId);
  },
};
