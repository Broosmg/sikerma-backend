const yup = require("yup");
const { insertTemplate, editTemplate, findTemplates, findTemplateById, deleteTemplate } = require("../repository/tempRepository");

const templateSchema = yup.object().shape({
  template: yup
    .string()
    .matches(/\.(doc|pdf)$/i, "Only .docx and .pdf files are allowed!") // Validasi ekstensi file
    .required("Upload file is required!"),
});

const createTemplate = async (newTemplateData) => {
  await templateSchema.validate(newTemplateData, { abortEarly: false });

  const template = await insertTemplate(newTemplateData);

  return template;
};

const getAllTemplates = async () => {
  const template = await findTemplates();

  return template;
};

const getTemplateById = async (id) => {
  const template = await findTemplateById(id);

  if (!template) {
    throw new Error("Template not found.");
  }

  return template;
};

const editTemplateById = async (id, templateData) => {
  await getTemplateById(id);

  const template = editTemplate(id, templateData);

  return template;
};

const deleteTemplateById = async (id) => {
  await getTemplateById(id);

  await deleteTemplate(id);
};

module.exports = {
  createTemplate,
  getAllTemplates,
  getTemplateById,
  editTemplateById,
  deleteTemplateById,
};
