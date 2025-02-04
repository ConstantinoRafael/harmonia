import prisma from "../config/db";
import { registrationRepository } from "../repositories/registrationRepository";

export const registrationService = {
  async createRegistration(
    name: string,
    email: string,
    phone: string,
    birthday: string,
    workshopIds: number[]
  ) {
    try {
      // Converte a data de nascimento para o formato correto
      const parsedBirthday = new Date(
        birthday.split("/").reverse().join("-") // Transforma dd/mm/aaaa -> aaaa-mm-dd
      );

      // Verifica se o usuário já existe
      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        // Cria o usuário se não existir
        user = await prisma.user.create({
          data: { name, email, phone, birthday: parsedBirthday },
        });
      }

      // Cria a inscrição e vincula os workshops
      return registrationRepository.createRegistration(user.id, workshopIds);
    } catch (error) {
      console.error("Erro ao criar inscrição:", error);
      throw new Error("Erro ao criar inscrição.");
    }
  },

  async getRegistrationsByUser(userId: number) {
    return registrationRepository.findByUserId(userId);
  },
};
