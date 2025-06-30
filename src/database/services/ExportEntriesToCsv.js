import db from "../SQLiteDataBase";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import { jsonToCSV } from "react-native-csv";

const fetchEntriesByCdCashbook = async (cdcashbook) => {
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

const convertEntriesToCSV = (entries) => {
  try {
    const headers = [
      "entry_id",
      "description",
      "value",
      "dt_record",
      "created_at",
      "type",
      "updated_at",
    ];
    const data = entries.map((entry) => [
      entry.id,
      entry.description,
      entry.value,
      entry.dtrecord,
      entry.createdat,
      entry.type,
      entry.updatedat,
    ]);
    const dataToCSV = {
      fields: headers,
      data: data,
    };
    //console.log(dataToCSV);
    return jsonToCSV(dataToCSV, { header: true });
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};

const saveCSVFile = async (csvData, fileName) => {
  try {
    const filePath = FileSystem.documentDirectory + fileName;
    await FileSystem.writeAsStringAsync(filePath, csvData, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    await Sharing.shareAsync(filePath);
    return filePath;
  } catch (e) {
    console.log("error", e);
    throw e;
  }
};

const exportEntriesToCSV = async (cdcashbook) => {
  try {
    const entries = await fetchEntriesByCdCashbook(cdcashbook);
    const csvData = convertEntriesToCSV(entries);
    const fileUri = await saveCSVFile(csvData, `entries.csv`);
    return fileUri;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default exportEntriesToCSV;
