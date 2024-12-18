const prisma = require("../config/db");

const insertRepository = async (newRepositoryData) => {
  const repository = await prisma.repository.create({
    data: {
      study_program: newRepositoryData.study_program,
      faculty: newRepositoryData.faculty,
      title: newRepositoryData.title,
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
      study_program: repositoryData.study_program,
      faculty: repositoryData.faculty,
      title: repositoryData.title,
      char: repositoryData.char,
      file_type: repositoryData.file_type,
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
      id,
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
