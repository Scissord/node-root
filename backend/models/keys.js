import knex from './knex.js'; 

const db = knex();

export const update = async function (id, data) {
  return await db("keys").update(data).where({ id });
};
