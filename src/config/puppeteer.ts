import { PuppeteerLifeCycleEvent } from 'puppeteer';

interface IPageOption {
  waitUntil: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2' | PuppeteerLifeCycleEvent[] | undefined;
  timeout: number;
}

export const pageOption: IPageOption = {
  waitUntil: 'load',
  timeout: 0,
};

export const langOption = {
  'Accept-Language': 'ko',
};
