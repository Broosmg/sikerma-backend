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

const getAllRepositories = async (userId) => {
  const repositories = await findRepositories(userId);

  return repositories;
};

const editRepositoryById = async (id, repositoryData) => {
  // Pastikan repository ada
  const repository = await getRepositoryById(id);

  // Jika perlu, bisa memvalidasi userId jika tidak sesuai dengan yang terdaftar pada repository
  if (repository.userId !== repositoryData.userId) {
    throw new Error("User ID mismatch.");
  }

  // Melakukan update repository
  const updatedRepository = await editRepository(id, repositoryData);

  return updatedRepository;
};

const deleteRepositoryById = async (id) => {
  // Pastikan repository ada
  const repository = await getRepositoryById(id);

  // Menghapus repository
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
