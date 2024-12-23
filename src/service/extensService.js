const yup = require("yup");
const { insertExtension, editExtension, findExtensions, findExtensionById, deleteExtension } = require("../repository/extensRepository");

const extensionSchema = yup.object().shape({
  name_of_the_proposer: yup.string(),
  position: yup.string(),
  partner_agencies: yup.string(),
  scope: yup.string(),
  country: yup.string(),
  agency_category: yup.string(),
  type: yup.string(),
  document_number: yup.string(),
  start: yup.string(),
  end: yup.string(),
  comment: yup.string(),
  upload_file: yup.string(),
});

const createExtension = async (newExtensionData) => {
  await extensionSchema.validate(newExtensionData, { abortEarly: false });

  const extension = await insertExtension(newExtensionData);

  return extension;
};

const getAllExtentions = async () => {
  const extension = await findExtensions();

  return extension;
};

const getExtensionById = async (id) => {
  const extension = await findExtensionById(id);

  if (!extension) {
    throw new Error("extension not found.");
  }

  return extension;
};

const editExtensionById = async (id, extensionData) => {
  await getExtensionById(id);

  const extension = editExtension(id, extensionData);

  return extension;
};

const deleteExtensionById = async (id) => {
  await getExtensionById(id);

  await deleteExtension(id);
};

module.exports = {
  createExtension,
  getAllExtentions,
  getExtensionById,
  editExtensionById,
  deleteExtensionById,
};
