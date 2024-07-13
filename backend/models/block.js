import knex from './knex.js'; 

const db = knex();

export const create = async function (data) {
  const [id] = await db("block")
    .insert(data)
    .returning("id");

  data.id = id;
  return data;
};

export const get = async function () {
  return await db("block").select("*")
};

export const find = async function (template_id) {
  return await db('block as b').where({ template_id });
};

export const getWithKeysByHtmlId = async function (html_id) {
  const results = await db('keys as k')
    .select('k.*')
    .leftJoin('block as b', 'k.block_id', 'b.id')
    .where("b.html_id", html_id)

  return results;
};
