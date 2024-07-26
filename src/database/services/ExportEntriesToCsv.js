import db from "../SQLiteDataBase";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { jsonToCSV } from "react-native-csv";

const fetchEntriesByCdCashbook = (cdcashbook) => {
  return new Promise((resolve, reject) => {
    db.transaction((tx) => {
      tx.executeSql(
        "SELECT * FROM entries WHERE cdcashbook=? ORDER BY dtrecord ASC;",
        [cdcashbook],
        (_, { rows }) => {
          if (rows.length > 0) resolve(rows._array);
          else reject("Entries not found: cdCashbook=" + cdcashbook);
        },
        (_, error) => reject(error)
      );
    });
  });
};

const convertEntriesToCSV = (entries) => {
  try {
    const headers = [
      "identificador",
      "descrição",
      "valor",
      "data lançamento",
      "data criação",
      "identificador ",
      "tipo",
    ];
    const data = entries.map((entry) => [
      entry.id,
      entry.description,
      entry.value,
      entry.dtrecord,
      entry.createdat,
      entry.cdcashbook,
      entry.type,
    ]);
    const dataToCSV = {
      fields: headers,
      data: data,
    };
    //console.log(dataToCSV);
    return jsonToCSV(dataToCSV, { header: true });
  } catch (e) {
    console.log("error", e);
  }
};

const saveCSVFile = async (csvData, fileName) => {
  try {
    const filePath = FileSystem.documentDirectory + fileName;
    await FileSystem.writeAsStringAsync(filePath, csvData, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    Sharing.shareAsync(filePath);
    return null;
  } catch (e) {
    console.log("error", e);
  }
};

const exportEntriesToCSV = async (cdcashbook) => {
  try {
    const entries = await fetchEntriesByCdCashbook(cdcashbook);
    const csvData = convertEntriesToCSV(entries);
    const fileUri = await saveCSVFile(csvData, `entries.csv`);
  } catch (error) {
    console.error(error);
  }
};

export default exportEntriesToCSV;
