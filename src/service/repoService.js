const yup = require("yup");
const { insertRepository, editRepository, findRepositories, findRepositoryById, deleteRepository } = require("../repository/repoRepository");

const repositorySchema = yup.object().shape({
  study_program: yup.string(),
  faculty: yup.string(),
  title: yup.string(),
  type: yup.string(),
  comment: yup.string(),
  upload_file: yup.string(),
});

const createRepository = async (newRepositoryData) => {
  await repositorySchema.validate(newRepositoryData, { abortEarly: false });

  const repository = await insertRepository(newRepositoryData);

  return repository;
};

const getAllRepositories = async () => {
  const repository = await findRepositories();

  return repository;
};

const getRepositoryById = async (id) => {
  const repository = await findRepositoryById(id);

  if (!repository) {
    throw new Error("User not found.");
  }

  return repository;
};

const editRepositoryById = async (id, repositoryData) => {
  await getRepositoryById(id);

  const repository = editRepository(id, repositoryData);

  return repository;
};

const deleteRepositoryById = async (id) => {
  await getRepositoryById(id);

  await deleteRepository(id);
};

module.exports = {
  createRepository,
  getAllRepositories,
  getRepositoryById,
  editRepositoryById,
  deleteRepositoryById,
};