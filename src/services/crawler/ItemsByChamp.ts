import cheerio, { CheerioAPI, Cheerio, Element } from 'cheerio';
import { IItemImgData } from '../types/index';
import HTMLPaser from '../models/HTMLParser';
import ErrorMessage from '../constants/errorMsg';

class ItemsByChampCrawler {
  private _cheerioHTMLObj: CheerioAPI | null = null;

  private _parser: null | HTMLPaser = null;

  private _champName: null | string = null;

  private _line: null | string = null;

  constructor(champName: string, line: string) {
    this._parser = new HTMLPaser();
    this._champName = champName;
    this._line = line;
  }

  public async execute(): Promise<IItemImgData> {
    try {
      const datas: IItemImgData = {};
      const HTML = await this._parser!.getHTML(this._createURL());
      this._cheerioHTMLObj = cheerio.load(HTML);
      if (!this._cheerioHTMLObj) return datas;
      const $: CheerioAPI = this._cheerioHTMLObj;
      const $bodyList = $('table');
      $bodyList.each((_, elem) => {
        const $itemList = this._filterValidTable($(elem));
        if (!$itemList) return;
        $itemList.each((_, tableElem) => {
          const $dataList = this._filterDataWrapper($(tableElem));
          $dataList.each((_, imgElem) => {
            this._setData($(imgElem), datas);
          });
        });
      });
      if (Object.keys(datas).length === 0) throw new Error(ErrorMessage.UPSTREAM_ERROR);
      return datas;
    } catch (error) {
      throw error;
    }
  }

  private _filterValidTable(elem: Cheerio<Element>): Cheerio<Element> | null {
    const innerTextOfTable = elem.find('thead').text();
    const isVaildTable = innerTextOfTable.includes('Item') || innerTextOfTable.includes('아이템');
    if (!isVaildTable) return null;
    const $itemList = elem.find('tbody').children('tr');
    return $itemList;
  }

  private _filterDataWrapper(elem: Cheerio<Element>): Cheerio<Element> {
    const $divList = elem.find('td').children('div');
    return $divList;
  }

  private _setData(elem: Cheerio<Element>, datas: IItemImgData) {
    const hasImgTag = elem.find('img').length !== 0;
    if (!hasImgTag) return;
    const imgSrc = elem.find('img').attr('src')!;
    const description = elem.find('img').attr('title');
    const itemName = description!.split('</b>')[0].split('>')[1];
    datas[itemName] = {
      englishName: itemName,
      src: 'https://' + imgSrc.substring(2, imgSrc.length),
    };
  }

  private _createURL(): string {
    return `https://www.op.gg/champion/${this._champName}/statistics/${this._line}/item`;
  }
}

export default ItemsByChampCrawler;
