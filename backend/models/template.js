import knex from './knex.js'; 

const db = knex();

export const create = async function (data) {
  const [id] = await db("template")
    .insert(data)
    .returning("id");

  data.id = id;
  return data;
};

export const get = async function () {
  return await db('t').select('*');
};

export const getWithBlocks = async function () {
  const results = await db('template as t')
    .select('t.*')
    .select(db.raw('COALESCE(json_agg(b.*) FILTER (WHERE b.id IS NOT NULL), \'[]\') as blocks'))
    .leftJoin('block as b', 'b.template_id', 't.id')
    .groupBy('t.id');

  return results;
};
