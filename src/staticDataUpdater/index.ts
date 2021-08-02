import URL from '../constants/URL';
import cheerio, { Cheerio, Element, CheerioAPI } from 'cheerio';
import HTMLPaser from '../models/HTMLParser';
import { IChampionData, IItemDictData } from '../types/index';
import fs from 'fs';
import position from '../constants/position';

const namuWikiURLs = [
  URL.NAMUWIKI_PAGE1,
  URL.NAMUWIKI_PAGE2,
  URL.NAMUWIKI_PAGE3,
  URL.NAMUWIKI_PAGE4,
  URL.NAMUWIKI_PAGE5,
  URL.NAMUWIKI_PAGE6,
  URL.NAMUWIKI_PAGE7,
];

class StaticDataUpdater {
  private _HTMLParser: HTMLPaser | null = null;

  constructor() {
    this._HTMLParser = new HTMLPaser();
  }

  public async updateStaticData() {
    await this._updateItemDict();
    await this._updateItemDict();
  }

  private async _updateItemDict() {
    const datas: IItemDictData = {};
    for (let URL of namuWikiURLs) {
      const html: string = await this._HTMLParser!.getHTML(URL, true);
      const $: CheerioAPI = cheerio.load(html);
      const $itemList: Cheerio<Element> = $('#toc').find('.toc-indent').children('.toc-item');
      $itemList.each(function () {
        const text: string = $(this).text();
        if (!text.includes('(')) return;

        const koItem = Array.from(text.split('(')[0])
          .filter((s) => s === ' ' || (isNaN(Number(s)) && s !== '.'))
          .join('')
          .trim();
        const enItem = text
          .split('(')[1]
          .substring(0, text.split('(')[1].length - 1)
          .trim();
        datas[koItem] = enItem;
      });
    }
    fs.writeFile('static/' + 'itemDict.json', JSON.stringify(datas), 'utf8', () => console.log('SUCCESS'));
  }

  private async _updateChampList() {
    const champions: IChampionData = {};
    const html: string = await this._HTMLParser!.getHTML(URL.OPGG_STATIC_DATA);
    const $: CheerioAPI = cheerio.load(html);
    const $bodyList: Cheerio<Element> = $('div.champion-index__champion-list').children('.champion-index__champion-item');

    $bodyList.each(function () {
      const positionList: string[] = [];
      $(this)
        .children('a')
        .children('.champion-index__champion-item__positions')
        .children('.champion-index__champion-item__position')
        .each(function () {
          positionList.push(position[$(this).text()]);
        });
      champions[$(this).attr('data-champion-name')!] = {
        englishName: $(this).attr('data-champion-key')!,
        position: positionList,
      };
    });
    fs.writeFile('static/' + 'champList.json', JSON.stringify(champions), 'utf8', () => console.log('SUCCESS'));
  }
}

const staticDataUpdater = new StaticDataUpdater();
