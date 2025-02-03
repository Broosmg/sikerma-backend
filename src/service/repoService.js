const yup = require("yup");
const { insertRepository, editRepository, findRepositories, findRepositoryById, deleteRepository } = require("../repository/repoRepository");

const repositorySchema = yup.object().shape({
  name_of_the_proposer: yup.string(),
  position: yup.string(),
  partner_agencies: yup.string(),
  scope: yup.string(),
  country: yup.string(),
  agency_category: yup.string(),
  type: yup.string(),
  comment: yup.string(),
  end_date: yup.string(),
  upload_file: yup
    .string()
    .matches(/\.(doc|pdf)$/i, "Only .docx and .pdf files are allowed!") // Validasi ekstensi file
    .required("Upload file is required!"),
  userId: yup.string(),
});

const createRepository = async (newRepositoryData) => {
  await repositorySchema.validate(newRepositoryData, { abortEarly: false });

  const repository = await insertRepository(newRepositoryData);

  return repository;
};

const getRepositoryById = async (id) => {
  const repository = await findRepositoryById(id);

  if (!repository) {
    throw new Error("Repository not found.");
  }

  return repository;
};

const getAllRepositories = async () => {
  const repositories = await findRepositories();

  return repositories;
};

const editRepositoryById = async (id, repositoryData, userRole) => {
  await getRepositoryById(id);

  const repository = await editRepository(id, repositoryData, userRole);
  return repository;
};

const deleteRepositoryById = async (id) => {
  await getRepositoryById(id);

  await deleteRepository(id);

  return { message: "Repository deleted successfully" };
};

module.exports = {
  createRepository,
  getAllRepositories,
  getRepositoryById,
  editRepositoryById,
  deleteRepositoryById,
};
