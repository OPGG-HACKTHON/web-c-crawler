import { IItemSkillAccelData } from '../types/index';
import cheerio, { CheerioAPI, Cheerio, Element } from 'cheerio';
import HTMLPaser from '../models/HTMLParser';
import URL from '../constants/URL';

class SkillAccelCrawler {
  private _cheerioHTMLObj: CheerioAPI | null = null;

  private _parser: null | HTMLPaser = null;

  constructor() {
    this._parser = new HTMLPaser();
  }

  public async execute(): Promise<IItemSkillAccelData> {
    try {
      const datas = {};
      const HTML = await this._parser!.getHTML(URL.ACCEL_ITEM_URL);
      this._cheerioHTMLObj = cheerio.load(HTML);
      if (!this._cheerioHTMLObj) return datas;
      const $: CheerioAPI = this._cheerioHTMLObj;
      const $itemList = $('table#itemListTable').children('tbody').children('tr');
      $itemList.each((_, elem) => this._setData($(elem), datas));
      return datas;
    } catch (error) {
      throw error;
    }
  }

  private _setData(elem: Cheerio<Element>, datas: IItemSkillAccelData) {
    const name: string = elem.children('td.itemname').find('div.name').text();
    const option: string = elem.find('td.itemoption').find('maintext').text();
    const isSkillAccelItem = option.includes('스킬 가속');
    if (!isSkillAccelItem) return;
    datas[name] = { skillAccel: this._getAccelNum(option) };
  }

  private _getAccelNum(option: string) {
    let accelNum = '';
    for (let s of option.split('스킬 가속')[1].trim()) {
      if (isNaN(Number(s))) break;
      accelNum += s;
    }
    return accelNum;
  }
}

export default SkillAccelCrawler;
