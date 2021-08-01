import fs from 'fs';
require('dotenv').config();

const { CHAMP_LIST_PATH, ITEM_DICT_PATH } = process.env;

interface IChampDatas {
  [name: string]: { englishName: string; position: string[] };
}

interface IItemDict {
  [name: string]: string;
}

export const champDatas: IChampDatas = JSON.parse(fs.readFileSync(CHAMP_LIST_PATH!).toString());

export const itemDict: IItemDict = JSON.parse(fs.readFileSync(ITEM_DICT_PATH!).toString());
