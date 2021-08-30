import axios from 'axios';
import ErrorMessage from '../constants/errorMsg';

class HTMLPaser {
  public getHtmlBeforeLoad = async (URL: string) => {
    try {
      const { data }: { data: string } = await axios.get(URL);
      return data;
    } catch (error) {
      throw new Error(ErrorMessage.UPSTREAM_ERROR);
    }
  };

  public async getHTML(URL: string, browserControll: boolean = false): Promise<string> {
    try {
      let HTML = '';
      // if (browserControll)
      if (!browserControll) HTML = await this.getHtmlBeforeLoad(URL);
      return HTML;
    } catch (error) {
      throw new Error('INVEN ERROR');
    }
  }
}

export default HTMLPaser;
