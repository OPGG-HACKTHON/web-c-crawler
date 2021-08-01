export interface IItemImgData {
  [name: string]: { englishName: string; src: string };
}

export interface IItemSkillAccelData {
  [name: string]: { skillAccel: string };
}

export interface IChampionData {
  [name: string]: { englishName: string; position: string[] };
}

export interface IResponseData {
  [name: string]: {
    [pos: string]: {
      items: {
        [itemName: string]: { skillAccel: string; englishName: string; src: string };
      };
      name: string;
      englishName: string;
      position: string;
    };
  };
}
