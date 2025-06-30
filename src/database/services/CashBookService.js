import db from "../SQLiteDataBase";
import { sqliteDateFormatter } from "../../../assets/utils/SQLiteDateFormatter";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
const initializeTable = async () => {
  const database = await db;

  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  // await database.execAsync("DROP TABLE IF EXISTS cashbooks;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

  await database.execAsync(`
    CREATE TABLE IF NOT EXISTS cashbooks (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      description TEXT, 
      createdat DATETIME, 
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
      "INSERT INTO cashbooks (description, createdat, updatedat) VALUES (?, ?, ?);",
      [obj.description, obj.createdat, obj.updatedat]
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
 *  - O resultado da Promise é a quantidade de registros atualizados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const update = async (id, obj) => {
  try {
    const database = await db;
    const result = await database.runAsync(
      "UPDATE cashbooks SET description=?, updatedat=? WHERE id=?;",
      [obj.description, sqliteDateFormatter(new Date()), id]
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
      "SELECT * FROM cashbooks WHERE id=?;",
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
 * - Recebe o nome do livro caixa;
 * - Retorna uma Promise:
 *  - O resultado da Promise é um array com os objetos encontrados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso nenhum objeto seja encontrado.
 */
const findByDescription = async (description) => {
  try {
    const database = await db;
    const result = await database.getAllAsync(
      "SELECT * FROM cashbooks WHERE description LIKE ?;",
      [description]
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
 * BUSCA O ÚLTIMO REGISTRO SALVO NO BANCO
 * - Retorna uma Promise:
 *  - O resultado da Promise é um array com os objetos encontrados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso nenhum objeto seja encontrado.
 */
const findLastCashbook = async () => {
  try {
    const database = await db;
    const result = await database.getFirstAsync(
      "SELECT * FROM cashbooks ORDER BY updatedat DESC LIMIT 1;"
    );

    if (result) {
      return result;
    } else {
      throw new Error("No registers found");
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
 *  - Pode retornar um array vazio caso não existam registros.
 */
const all = async () => {
  try {
    const database = await db;
    const result = await database.getAllAsync("SELECT * FROM cashbooks;");
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
    const result = await database.runAsync(
      "DELETE FROM cashbooks WHERE id=?;",
      [id]
    );
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
    const result = await database.runAsync("DELETE FROM cashbooks;");
    return result.changes;
  } catch (error) {
    throw error;
  }
};

export default {
  create,
  update,
  find,
  findByDescription,
  findLastCashbook,
  all,
  remove,
  removeAll,
};
