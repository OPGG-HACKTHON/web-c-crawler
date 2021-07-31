import { PuppeteerLifeCycleEvent } from 'puppeteer';

interface IPageOption {
  waitUntil: 'load' | 'domcontentloaded' | 'networkidle0' | 'networkidle2' | PuppeteerLifeCycleEvent[] | undefined;
  timeout: number;
}

interface IBrowserOption {
  slowMo: number;
  headless: boolean;
}

export const pageOption: IPageOption = {
  waitUntil: 'load',
  timeout: 0,
};

export const browserOption: IBrowserOption = {
  slowMo: 500,
  headless: false,
};
