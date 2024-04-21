import db from "../SQLiteDataBase";

/**
 * INICIALIZAÇÃO DA TABELA
 * - Executa sempre, mas só cria a tabela caso não exista (primeira execução)
 */
db.transaction((tx) => {
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>
  //tx.executeSql("DROP TABLE entries;");
  //<<<<<<<<<<<<<<<<<<<<<<<< USE ISSO APENAS DURANTE OS TESTES!!! >>>>>>>>>>>>>>>>>>>>>>>

  tx.executeSql(
    "CREATE TABLE IF NOT EXISTS entries (id INTEGER PRIMARY KEY AUTOINCREMENT,description TEXT, value REAL, dtrecord DATETIME, createdat DATETIME, cdcashbook INTEGER, type TEXT);"
  );
});

/**
 * CRIAÇÃO DE UM NOVO REGISTRO
 * - Recebe um objeto;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o ID do registro (criado por AUTOINCREMENT)
 *  - Pode retornar erro (reject) caso exista erro no SQL ou nos parâmetros.
 */
const create = (obj) => {
  return new Promise((resolve, reject) =>{
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "INSERT INTO entries (description,value,dtrecord,createdat,cdcashbook,type) values (?,?,?,?,?,?);",
        [obj.description,obj.value,obj.dtrecord,obj.createdat,obj.cdcashbook,obj.type],
        //-----------------------
        (_, { rowsAffected, insertId }) => {
          if (rowsAffected > 0) resolve(insertId);
          else reject("Error inserting obj: " + JSON.stringify(obj)); // insert falhou
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * ATUALIZA UM REGISTRO JÁ EXISTENTE
 * - Recebe o ID do registro e um OBJETO com valores atualizados;
 * - Retorna uma Promise:
 * - O resultado da Promise é a quantidade de registros atualizados;
 *  @returns Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const update = (id, obj) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "UPDATE entries SET description=?, value=?, dtrecord=?, type=? WHERE id=?;",
        [obj.description,obj.value,obj.dtrecord,obj.type, id],
        //-----------------------
        (_, { rowsAffected }) => {
          if (rowsAffected > 0) resolve(rowsAffected);
          else reject("Error updating obj: id=" + id); // nenhum registro alterado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * BUSCA UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise é o objeto (caso exista);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const find = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM entries WHERE id=?;",
        [id],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array[0]);
          else reject("Obj not found: id=" + id); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * BUSCA UM REGISTRO POR MEIO DA DESCRIÇÃO
 * - Recebe a descrição do lançamento;
 * - Retorna uma Promise:
 *  - O resultado da Promise é um array com os objetos encontrados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso nenhum objeto seja encontrado.
 */
const findByDescription = (description) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM entries WHERE description LIKE %?%;",
        [description],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array);
          else reject("Obj not found: description=" + description); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * BUSCA UM REGISTRO POR MEIO DA CD_CASHBOOK
 * - Recebe o id da tabela CASHBOOK;
 * - Retorna uma Promise:
 *  - O resultado da Promise é um array com os objetos encontrados;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso nenhum objeto seja encontrado.
 */
const findByCdCashbook = (cdcashbook) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM entries WHERE cdcashbook=? ORDER BY dtrecord ASC;",
        [cdcashbook],
        //-----------------------
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array);
          else reject("Entries not found: cdCashbook=" + cdcashbook); // nenhum registro encontrado
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * BUSCA TODOS OS REGISTROS DE UMA DETERMINADA TABELA
 * - Não recebe parâmetros;
 * - Retorna uma Promise:
 *  - O resultado da Promise é uma lista (Array) de objetos;
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL;
 *  - Pode retornar um array vazio caso não existam registros.
 */
const all = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "SELECT * FROM entries;",
        [],
        //-----------------------
        (_, { rows }) => resolve(rows._array),
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * REMOVE UM REGISTRO POR MEIO DO ID
 * - Recebe o ID do registro;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const remove = (id) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM entries WHERE id=?;",
        [id],
        //-----------------------
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * REMOVE TODOS OS REGISTROS
 * - Não recebe parâmetros;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso ocorra erro no SQL.
 */
const removeAll = () => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM entries;",
        [],
        //-----------------------
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

/**
 * REMOVE UM REGISTRO POR MEIO DO CD_CASHBOOK
 * - Recebe o ID do CASHBOOK;
 * - Retorna uma Promise:
 *  - O resultado da Promise a quantidade de registros removidos (zero indica que nada foi removido);
 *  - Pode retornar erro (reject) caso o ID não exista ou então caso ocorra erro no SQL.
 */
const removeByCdCashbook = (cdCashbook) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      //comando SQL modificável
      tx.executeSql(
        "DELETE FROM entries WHERE cdcashbook=?;",
        [id],
        //-----------------------
        (_, { rowsAffected }) => {
          resolve(rowsAffected);
        },
        (_, error) => reject(error) // erro interno em tx.executeSql
      );
    });
  });
};

export default {
  create,
  update,
  find,
  findByDescription,
  findByCdCashbook,
  all,
  remove,
  removeByCdCashbook,
  removeAll
};