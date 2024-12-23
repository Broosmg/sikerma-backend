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
      upload_file: newRepositoryData.upload_file,
    },
  });
  return repository;
};

const editRepository = async (id, repositoryData) => {
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
      upload_file: repositoryData.upload_file,
      status: repositoryData.status,
      agreement: repositoryData.agreement,
    },
  });

  return repository;
};

const findRepositories = async () => {
  const repositories = await prisma.repository.findMany();

  return repositories;
};

const findRepositoryById = async (id) => {
  const repository = await prisma.repository.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  return repository;
};

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
  findRepositories,
  findRepositoryById,
  deleteRepository,
};
