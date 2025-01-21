const prisma = require("../config/db");

const insertTemplate = async (newTemplateData) => {
  const template = await prisma.template.create({
    data: {
      template: newTemplateData.template,
    },
  });
  return template;
};

const editTemplate = async (id, templateData) => {
  const template = await prisma.template.update({
    where: {
      id,
    },
    data: {
      template: templateData.template,
    },
  });

  return template;
};

const findTemplates = async () => {
  const templates = await prisma.template.findMany();

  return templates;
};

const findTemplateById = async (id) => {
  const template = await prisma.template.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  return template;
};

const deleteTemplate = async (id) => {
  await prisma.template.delete({
    where: {
      id,
    },
  });
};

module.exports = { insertTemplate, editTemplate, findTemplates, findTemplateById, deleteTemplate };
