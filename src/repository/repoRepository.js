const prisma = require("../config/db");

const insertRepository = async (newRepositoryData) => {
  const repository = await prisma.repository.create({
    data: {
      name_of_the_proposer: newRepositoryData.name_of_the_proposer,
      position: newRepositoryData.position,
      partner_agencies: newRepositoryData.partner_agencies,
      scope: newRepositoryData.scope,
      country: newRepositoryData.country,
      agency_category: newRepositoryData.agency_category,
      type: newRepositoryData.type,
      comment: newRepositoryData.comment,
      end_date: newRepositoryData.end_date,
      upload_file: newRepositoryData.upload_file,
      userId: newRepositoryData.userId,
    },
  });

  return repository;
};

const editRepository = async (id, repositoryData, userRole) => {
  const allowedRoles = ["Admin", "Staff", "Unit"];

  if (!allowedRoles.includes(userRole)) {
    throw new Error("Unauthorized: Only Admin, Staff, or Unit can edit repository");
  }

  const repository = await prisma.repository.update({
    where: {
      id,
    },
    data: {
      name_of_the_proposer: repositoryData.name_of_the_proposer,
      position: repositoryData.position,
      partner_agencies: repositoryData.partner_agencies,
      scope: repositoryData.scope,
      country: repositoryData.country,
      agency_category: repositoryData.agency_category,
      type: repositoryData.type,
      comment: repositoryData.comment,
      end_date: repositoryData.end_date,
      upload_file: repositoryData.upload_file,
    },
  });

  return repository;
};

const findRepositoryById = async (id) => {
  const repository = await prisma.repository.findUnique({
    where: {
      id: parseInt(id, 10),
    },
    include: {
      user: true,
    },
  });

  return repository;
};

// Fungsi untuk mencari repositories berdasarkan userId
const findRepositories = async () => {
  const repositories = await prisma.repository.findMany();

  return repositories;
};

// Fungsi untuk menghapus repository
const deleteRepository = async (id) => {
  await prisma.repository.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  insertRepository,
  editRepository,
  findRepositoryById,
  findRepositories,
  deleteRepository,
};
