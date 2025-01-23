const yup = require("yup");
const { insertAddendum, editAddendum, findAddenda, findAddendumById, deleteAddendum } = require("../repository/addenRepository");

const addendumSchema = yup.object().shape({
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
  upload_file: yup
    .string()
    .matches(/\.(doc|pdf)$/i, "Only .docx and .pdf files are allowed!") // Validasi ekstensi file
    .required("Upload file is required!"),
});

const createAddendum = async (newAddendumData) => {
  await addendumSchema.validate(newAddendumData, { abortEarly: false });

  const addendum = await insertAddendum(newAddendumData);

  return addendum;
};

const getAllAddenda = async () => {
  const addendum = await findAddenda();

  return addendum;
};

const getAddendumById = async (id) => {
  const addendum = await findAddendumById(id);

  if (!addendum) {
    throw new Error("Addendum not found.");
  }

  return addendum;
};

const editAddendumById = async (id, addendumData) => {
  await getAddendumById(id);

  const addendum = editAddendum(id, addendumData);

  return addendum;
};

const deleteAddendumById = async (id) => {
  await getAddendumById(id);

  await deleteAddendum(id);
};

module.exports = {
  createAddendum,
  getAllAddenda,
  getAddendumById,
  editAddendumById,
  deleteAddendumById,
};
