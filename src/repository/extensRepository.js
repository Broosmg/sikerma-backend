const prisma = require("../config/db");

const insertExtension = async (newExtensionData) => {
  const extension = await prisma.extension.create({
    data: {
      name_of_the_proposer: newExtensionData.name_of_the_proposer,
      position: newExtensionData.position,
      partner_agencies: newExtensionData.partner_agencies,
      scope: newExtensionData.scope,
      country: newExtensionData.country,
      agency_category: newExtensionData.agency_category,
      document_number: newExtensionData.document_number,
      type: newExtensionData.type,
      start: newExtensionData.start,
      end: newExtensionData.end,
      comment: newExtensionData.comment,
      upload_file: newExtensionData.upload_file,
    },
  });
  return extension;
};

const editExtension = async (id, extensionData) => {
  const extension = await prisma.extension.update({
    where: {
      id,
    },
    data: {
      name_of_the_proposer: extensionData.name_of_the_proposer,
      position: extensionData.position,
      partner_agencies: extensionData.partner_agencies,
      scope: extensionData.scope,
      partner_agencies: extensionData.partner_agencies,
      country: extensionData.country,
      agency_category: extensionData.agency_category,
      country: extensionData.country,
      document_number: extensionData.document_number,
      type: extensionData.type,
      start: extensionData.start,
      end: extensionData.end,
      file_type: extensionData.file_type,
      comment: extensionData.comment,
      upload_file: extensionData.upload_file,
      status: extensionData.status,
      agreement: extensionData.agreement,
    },
  });

  return extension;
};

const findExtensions = async () => {
  const extensions = await prisma.extension.findMany();

  return extensions;
};

const findExtensionById = async (id) => {
  const extension = await prisma.extension.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  return extension;
};

const deleteExtension = async (id) => {
  await prisma.extension.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  insertExtension,
  editExtension,
  findExtensions,
  findExtensionById,
  deleteExtension,
};
