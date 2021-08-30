import URL from '../../constants/URL';
import cheerio, { Cheerio, Element, CheerioAPI } from 'cheerio';
import HTMLPaser from '../HTMLparser';
import { IChampionData, IItemDictData } from '../../types/index';
import fs from 'fs';
import position from '../../constants/position';
import axios from 'axios';
import ErrorMessage from '../../constants/errorMsg';
import sendMail from '../../utils/mailSender';

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
    try{
      await this._updateItemDict();
      await this._updateChampList();
    }catch(error){
      await sendMail(error);
    }
  }

  private async _updateItemDict() {
    try {
      const data: IItemDictData = {};
      const { data: versionData } = await axios.get(URL.VERSION);
      const latestVersion = versionData[0];
      const { data: koData } = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/ko_KR/item.json`);
      const { data: enData } = await axios.get(`https://ddragon.leagueoflegends.com/cdn/${latestVersion}/data/en_US/item.json`);
      Object.entries(koData.data).forEach((value: any) => (data[value[1].name] = enData.data[value[0]].name));
      fs.writeFile('static/' + 'itemDict.json', JSON.stringify(data), 'utf8', () => console.log('SUCCESS'));
    } catch (error) {
      throw new Error(ErrorMessage.UPSTREAM_ERROR);
    }
  }

  private async _updateChampList() {
    try {
      const champions: IChampionData = {};
      const html: string = await this._HTMLParser!.getHTML(URL.OPGG_STATIC_DATA, true);
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
    } catch (error) {
      throw new Error(ErrorMessage.UPSTREAM_ERROR);
    }
  }
}

export default new StaticDataUpdater();
