const prisma = require("../config/db");

const insertAddendum = async (newAddendumData) => {
  const addendum = await prisma.addendum.create({
    data: {
      name_of_the_proposer: newAddendumData.name_of_the_proposer,
      position: newAddendumData.position,
      partner_agencies: newAddendumData.partner_agencies,
      scope: newAddendumData.scope,
      country: newAddendumData.country,
      agency_category: newAddendumData.agency_category,
      document_number: newAddendumData.document_number,
      type: newAddendumData.type,
      start: newAddendumData.start,
      end: newAddendumData.end,
      comment: newAddendumData.comment,
      upload_file: newAddendumData.upload_file,
    },
  });
  return addendum;
};

const editAddendum = async (id, addendumData) => {
  const addendum = await prisma.addendum.update({
    where: {
      id,
    },
    data: {
      name_of_the_proposer: addendumData.name_of_the_proposer,
      position: addendumData.position,
      partner_agencies: addendumData.partner_agencies,
      scope: addendumData.scope,
      partner_agencies: addendumData.partner_agencies,
      country: addendumData.country,
      agency_category: addensumData.agency_category,
      country: addendumData.country,
      document_number: addendumData.document_number,
      type: addendumData.type,
      start: addendumData.start,
      end: addendumData.end,
      file_type: addendumData.file_type,
      comment: addendumData.comment,
      upload_file: addendumData.upload_file,
      status: addendumData.status,
      agreement: addendumData.agreement,
    },
  });

  return addendum;
};

const findAddenda = async () => {
  const addenda = await prisma.addendum.findMany();

  return addenda;
};

const findAddendumById = async (id) => {
  const addendum = await prisma.addendum.findUnique({
    where: {
      id: parseInt(id, 10),
    },
  });

  return addendum;
};

const deleteAddendum = async (id) => {
  await prisma.addendum.delete({
    where: {
      id,
    },
  });
};

module.exports = {
  insertAddendum,
  editAddendum,
  findAddenda,
  findAddendumById,
  deleteAddendum,
};
