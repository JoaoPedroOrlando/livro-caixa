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
  const cashbookid = parseInt(rows[0][5]);
  // deleta entrda com mesmo cdCashbook
  //const delRes = await EntryService.removeByCdCashbook(cashbookid);
  try {
    const cashbook = await CashbookService.create({
      description: `cashbook${formatDateToString(new Date())}`,
      createdat: sqliteDateFormatter(new Date()),
      updatedat: sqliteDateFormatter(new Date()),
    });
    console.log(cashbook);
    for (let entry of rows) {
      // const savedEntry = await EntryService.create(
      //   {
      //     description:,
      //     value,
      //     dtrecord,
      //     createdat,
      //     cdcashbook,
      //     type,
      //   }
      // )
    }
  } catch (e) {
    console.log("caiu aqui", e);
  }

  db.transaction((tx) => {
    // rows.forEach((entry) => {
    //   tx.executeSql(
    //     `INSERT INTO entries (identificador, descricao, valor, data_lancamento, data_criacao, identificador2, tipo) VALUES (?, ?, ?, ?, ?, ?, ?)`,
    //     [
    //       parseInt(entry[0]),
    //       entry[1],
    //       parseFloat(entry[2]),
    //       entry[3],
    //       entry[4],
    //       parseInt(entry[5]),
    //       entry[6],
    //     ],
    //     (tx, result) => {
    //       console.log("Insert successful", result);
    //     },
    //     (tx, error) => {
    //       console.error("Insert error", error);
    //     }
    //   );
    // });
  });
};

export default importEntriesFromCsv;
