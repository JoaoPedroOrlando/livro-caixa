import db from "../SQLiteDataBase";
import * as FileSystem from "expo-file-system";
import { readString } from "react-native-csv";
import * as DocumentPicker from "expo-document-picker";
import EntryService from "./EntryService";
import CashbookService from "./CashBookService";
import { formatDateToString } from "../../shared/helpers/dateHelper";
import { sqliteDateFormatter } from "../../../assets/utils/SQLiteDateFormatter";

const importEntriesFromCsv = async () => {
  try {
    let result = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    if (result) {
      const fileUri = result.assets[0].uri;
      // Read the content of the CSV file
      const fileContent = await FileSystem.readAsStringAsync(fileUri, {
        header: true,
      });
      const parsedData = readString(fileContent);
      console.log(parsedData);
      await insertDataIntoSQLite(parsedData.data);
    }
  } catch (e) {
    console.log(e);
  }
};

const insertDataIntoSQLite = async (data) => {
  // Pula o header
  const rows = data.slice(1);
  try {
    const cashbookid = await CashbookService.create({
      description: `cashbook ${formatDateToString(new Date())}`,
      createdat: sqliteDateFormatter(new Date()),
      updatedat: sqliteDateFormatter(new Date()),
    });
    console.log(cashbookid);
    console.log(rows);
    for (let row of rows) {
      await EntryService.create({
        description: row[1],
        value: parseFloat(row[2]),
        dtrecord: row[3],
        createdat: row[4],
        cdcashbook: cashbookid,
        type: row[5],
        updatedat: row[6],
      });
    }
  } catch (e) {
    console.log("caiu aqui", e);
  }
};

export default importEntriesFromCsv;
