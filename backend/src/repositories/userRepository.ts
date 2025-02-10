import prisma from "../config/db";
import { Prisma, User } from "@prisma/client";

export const userRepository = {
  async create(userData: Prisma.UserCreateInput): Promise<User> {
    return prisma.user.create({ data: userData });
  },

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  },

  async findUserWorkshops(userId: number) {
    return prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        registrations: {
          select: {
            workshops: {
              select: {
                workshop: true, // Inclui todos os detalhes do workshop
              },
            },
          },
        },
      },
    });
  },

  async findAllUsersWithWorkshopCount() {
    return prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        _count: {
          select: { registrations: true },
        },
        registrations: {
          select: {
            workshops: {
              select: {
                workshopId: true, // Pegamos apenas os IDs dos workshops para contagem distinta
              },
            },
          },
        },
      },
    });
  },

  async findUserWorkshopsByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        registrations: {
          select: {
            workshops: {
              select: {
                workshop: {
                  select: {
                    title: true,
                    date: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  },
};
