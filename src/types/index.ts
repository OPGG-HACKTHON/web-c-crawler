export interface IItemImgData {
  [name: string]: { englishName: string; src: string };
}

export interface IItemSkillAccelData {
  [name: string]: { skillAccel: string };
}

export interface IChampionData {
  [name: string]: { englishName: string; position: string[] };
}

export interface IUpdatedData {
  [itemName: string]: { skillAccel: string; englishName: string; src: string };
}

export interface IChampionDataProps {
  koName: string;
  data: IResponseData;
  skillAccelItemDatas: IItemSkillAccelData;
  pos?: string;
  enName?: string;
}

export interface IResponseData {
  [name: string]: {
    [pos: string]: {
      items: IUpdatedData;
      name: string;
      englishName: string;
      position: string;
    };
  };
}
