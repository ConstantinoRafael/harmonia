import { Prisma, Workshop } from "@prisma/client";
import { workshopRepository } from "../repositories/workshopRepository";

export const workshopService = {
  async create(workshopData: Prisma.WorkshopCreateInput): Promise<Workshop> {
    return workshopRepository.create(workshopData);
  },

  async getById(id: number) {
    const workshop = await workshopRepository.findById(id);
    if (!workshop) {
      throw new Error("Workshop não encontrado!");
    }

    return {
      id: workshop.id,
      title: workshop.title,
      professorName: workshop.professorName,
      description: workshop.description,
      date: workshop.date,
      duration: workshop.duration,
      capacity: workshop.capacity,
      address: workshop.address,
      isInfantojuvenil: workshop.isInfantojuvenil,
      registrations: workshop.registrations.map((reg) => ({
        name: reg.registration.user.name, // 🔹 Agora acessando corretamente o usuário
        email: reg.registration.user.email,
        phone: reg.registration.user.phone,
      })),
    };
  },

  async getAll(isInfantojuvenil?: boolean): Promise<Workshop[]> {
    return workshopRepository.findAll(isInfantojuvenil);
  },

  async getAllAdmin() {
    const workshops = await workshopRepository.findAllAdmin();
    console.log("🚀 Workshops retornados do banco:", workshops); // 🔹 Veja o que está vindo do Prisma
    return workshops;
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
