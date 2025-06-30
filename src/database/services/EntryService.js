import db from "../SQLiteDataBase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
const initializeTable = async () => {
  const database = await db;

  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  // await database.execAsync("DROP TABLE IF EXISTS entries;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      description TEXT, 
      value REAL, 
      dtrecord DATETIME, 
      createdat DATETIME, 
      cdcashbook INTEGER, 
      type TEXT, 
      updatedat DATETIME
    );
  `);
};

// Initialize table when module loads
initializeTable().catch(console.error);

/**
 * CRIAÇÃO DE UM NOVO REGISTRO
 * - Recebe um objeto;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o ID do registro (criado por AUTOINCREMENT)
 *  - Pode retornar erro (reject) caso exista erro no SQL ou nos parâmetros.
 */
const create = async (obj) => {
  try {
    const database = await db;
    const result = await database.runAsync(
      "INSERT INTO entries (description, value, dtrecord, createdat, cdcashbook, type, updatedat) VALUES (?, ?, ?, ?, ?, ?, ?);",
      [
        obj.description,
        obj.value,
        obj.dtrecord,
        obj.createdat,
        obj.cdcashbook,
        obj.type,
        obj.updatedat,
      ]
    );

    if (result.changes > 0) {
      return result.lastInsertRowId;
    } else {
      throw new Error("Error inserting obj: " + JSON.stringify(obj));
    }
  } catch (error) {
    throw error;
  }
};

/**
 * ATUALIZA UM REGISTRO JÁ EXISTENTE
 * - Recebe o ID do registro e um OBJETO com valores atualizados;
 * - Retorna uma Promise:
 * - O resultado da Promise é a quantidade de registros atualizados;
 *  @returns Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const update = async (id, obj) => {
  try {
    const database = await db;
    const result = await database.runAsync(
      "UPDATE entries SET description=?, value=?, dtrecord=?, type=?, updatedat=? WHERE id=?;",
      [obj.description, obj.value, obj.dtrecord, obj.type, obj.updatedat, id]
    );

    if (result.changes > 0) {
      return result.changes;
    } else {
      throw new Error("Error updating obj: id=" + id);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * BUSCA UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o objeto (caso exista);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const find = async (id) => {
  try {
    const database = await db;
    const result = await database.getFirstAsync(
      "SELECT * FROM entries WHERE id=?;",
      [id]
    );

    if (result) {
      return result;
    } else {
      throw new Error("Obj not found: id=" + id);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * BUSCA UM REGISTRO POR MEIO DA DESCRIÇÃO
 * - Recebe a descrição do lançamento;
 * - Retorna uma Promise:
 *  - O resultado da Promise é um array com os objetos encontrados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso nenhum objeto seja encontrado.
 */
const findByDescription = async (description) => {
  try {
    const database = await db;
    const result = await database.getAllAsync(
      "SELECT * FROM entries WHERE description LIKE ?;",
      [`%${description}%`]
    );

    if (result.length > 0) {
      return result;
    } else {
      throw new Error("Obj not found: description=" + description);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * BUSCA UM REGISTRO POR MEIO DA CD_CASHBOOK
 * - Recebe o id da tabela CASHBOOK;
 * - Retorna uma Promise:
 *  - O resultado da Promise é um array com os objetos encontrados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso nenhum objeto seja encontrado.
 */
const findByCdCashbook = async (cdcashbook) => {
  try {
    const database = await db;
    const result = await database.getAllAsync(
      "SELECT * FROM entries WHERE cdcashbook=? ORDER BY dtrecord ASC;",
      [cdcashbook]
    );

    if (result.length > 0) {
      return result;
    } else {
      throw new Error("Entries not found: cdCashbook=" + cdcashbook);
    }
  } catch (error) {
    throw error;
  }
};

/**
 * BUSCA TODOS OS REGISTROS DE UMA DETERMINADA TABELA
 * - Não recebe parâmetros;
 * - Retorna uma Promise:
 *  - O resultado da Promise é uma lista (Array) de objetos;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso não existem registros.
 */
const all = async () => {
  try {
    const database = await db;
    const result = await database.getAllAsync("SELECT * FROM entries;");
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * REMOVE UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const remove = async (id) => {
  try {
    const database = await db;
    const result = await database.runAsync("DELETE FROM entries WHERE id=?;", [
      id,
    ]);
    return result.changes;
  } catch (error) {
    throw error;
  }
};

/**
 * REMOVE TODOS OS REGISTROS
 * - Não recebe parâmetros;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso ocorra erro no SQL.
 */
const removeAll = async () => {
  try {
    const database = await db;
    const result = await database.runAsync("DELETE FROM entries;");
    return result.changes;
  } catch (error) {
    throw error;
  }
};

/**
 * REMOVE UM REGISTRO POR MEIO DO CD_CASHBOOK
 * - Recebe o ID do CASHBOOK;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const removeByCdCashbook = async (cdCashbook) => {
  try {
    const database = await db;
    const result = await database.runAsync(
      "DELETE FROM entries WHERE cdcashbook=?;",
      [cdCashbook] // Fixed: was using 'id' instead of 'cdCashbook'
    );
    return result.changes;
  } catch (error) {
    throw error;
  }
};

/**
 * BUSCA DATA DO ÚLTIMO REGISTRO CRIADO POR MEIO DO CD_CASHBOOK
 * - Recebe o id da tabela CASHBOOK;
 * - Retorna uma Promise:
 *  - O resultado da Promise é um array com os objetos encontrados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso nenhum objeto seja encontrado.
 */
const findLastDtrecordByCdCashbook = async (cdcashbook) => {
  try {
    const database = await db;
    const result = await database.getAllAsync(
      "SELECT dtrecord FROM entries WHERE cdcashbook=? ORDER BY dtrecord DESC LIMIT 1;",
      [cdcashbook]
    );

    if (result.length > 0) {
      return result;
    } else {
      throw new Error("Entries not found: cdCashbook=" + cdcashbook);
    }
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  update,
  find,
  findByDescription,
  findByCdCashbook,
  findLastDtrecordByCdCashbook,
  all,
  remove,
  removeByCdCashbook,
  removeAll,
};
