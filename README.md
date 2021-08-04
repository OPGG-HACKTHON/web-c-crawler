# Custom Data API

## `특징`

매주 수요일, 토요일 아침 6시에 자동적으로 Crawling하여 Custom Data를 업데이트합니다.<br/>
정기 업데이트 성공 여부도 자동으로 팀원 메일로 발송하여, 오류가 있을시 즉각적으로 대응합니다!<br/>
<br/>
현재 메타에서 각 챔피언별, 라인별로 자주 가는 아이템을 확인하고, 그 아이템들 중 스킬 쿨타임에 영향을 주는 아이템만을 선별하여 데이터로 제공합니다.<br/>
<br/>
데이터에는 챔피언의 자주가는 스킬쿨타임 관련 아이템과 아이템의 스킬 쿨타임 감소 양, 아이템의 영어, 한국어 이름 등의 정보가 들어있습니다.<br/>
또한 가장 최신 업데이트된 날짜도 제공하여, `신뢰`도를 높이고 있습니다.
이 데이터를 이용하여, 쿨타임이 감소된 궁극기, 스펠 시간 체크를 더욱 `정확`하게 할 수 있습니다.


## `Request`

```python
GET /champion/item
Host: http://52.78.131.104:9000
```

## `Response`


|   Key 종류   |              설명              |
|:------------:|:------------------------------:|
| ChampionName |      한글로 제공, 155가지      |
|   Position   | jungle, top, mid, adc, support |
| englishName  |    챔피언의 영어 이름 제공     |
| date  |    데이터가 업데이트된 날짜     |




| Key 종류 | 설명 |
|:--------:|:----:|
| itemName |   한글로 제공, 챔피언별 자주가는 아이템 중에서 스킬 가속 관련 아이템만 제공  |
|skillAccel |  스킬 가속 수치    |
|src |   아이템 이미지   |
| englishName | 아이템의 영어 이름 제공 |



## `Example`

```python
Request : axios.get('http://52.78.131.104:9000/champion/item')

result.data = 

{"가렌": {
    "top": {
      "items": {
        "점화석": {
          "skillAccel": "10",
          "englishName": "Kindlegem",
          "src": "https://opgg-static.akamaized.net/images/lol/item/3067.png?image=q_auto:best&v=1626880099"
        },
        "콜필드의 전투 망치": {
          "skillAccel": "10",
          "englishName": "Caulfield's Warhammer",
          "src": "https://opgg-static.akamaized.net/images/lol/item/3133.png?image=q_auto:best&v=1626880099"
        },
        "칠흑의 양날 도끼": {
          "skillAccel": "25",
          "englishName": "Black Cleaver",
          "src": "https://opgg-static.akamaized.net/images/lol/item/3071.png?image=q_auto:best&v=1626880099"
        },
        "태양불꽃 방패": {
          "skillAccel": "20",
          "englishName": "Sunfire Aegis",
          "src": "https://opgg-static.akamaized.net/images/lol/item/3068.png?image=q_auto:best&v=1626880099"
        },
        "발걸음 분쇄기": {
          "skillAccel": "20",
          "englishName": "Stridebreaker",
          "src": "https://opgg-static.akamaized.net/images/lol/item/6631.png?image=q_auto:best&v=1626880099"
        },
        "신성한 파괴자": {
          "skillAccel": "20",
          "englishName": "Divine Sunderer",
          "src": "https://opgg-static.akamaized.net/images/lol/item/6632.png?image=q_auto:best&v=1626880099"
        },
        "삼위일체": {
          "skillAccel": "20",
          "englishName": "Trinity Force",
          "src": "https://opgg-static.akamaized.net/images/lol/item/3078.png?image=q_auto:best&v=1626880099"
        }
      },
      "name": "가렌",
      "englishName": "garen",
      "position": "top"
    },
    "mid": {
      "items": {
        "점화석": {
          "skillAccel": "10",
          "englishName": "Kindlegem",
          "src": "https://opgg-static.akamaized.net/images/lol/item/3067.png?image=q_auto:best&v=1626880099"
        },
        "콜필드의 전투 망치": {
          "skillAccel": "10",
          "englishName": "Caulfield's Warhammer",
          "src": "https://opgg-static.akamaized.net/images/lol/item/3133.png?image=q_auto:best&v=1626880099"
        },
        "칠흑의 양날 도끼": {
          "skillAccel": "25",
          "englishName": "Black Cleaver",
          "src": "https://opgg-static.akamaized.net/images/lol/item/3071.png?image=q_auto:best&v=1626880099"
        },
        "태양불꽃 방패": {
          "skillAccel": "20",
          "englishName": "Sunfire Aegis",
          "src": "https://opgg-static.akamaized.net/images/lol/item/3068.png?image=q_auto:best&v=1626880099"
        },
        "발걸음 분쇄기": {
          "skillAccel": "20",
          "englishName": "Stridebreaker",
          "src": "https://opgg-static.akamaized.net/images/lol/item/6631.png?image=q_auto:best&v=1626880099"
        },
        "삼위일체": {
          "skillAccel": "20",
          "englishName": "Trinity Force",
          "src": "https://opgg-static.akamaized.net/images/lol/item/3078.png?image=q_auto:best&v=1626880099"
        }
      },
      "name": "가렌",
      "englishName": "garen",
      "position": "mid"
    }
  }....}
```

# Status Code


|               설명                | 코드 |      message      |
|:---------------------------------:|:----:|:-----------------:|
|자체적인 Server에 오류가 있는 경우|    500  |  Server Error     |
|Upstream Server에 오류가 있는 경우 | 502 |  Upstream Server Error  |
|   성공적으로 데이터를 전송한 경우   |  200    |                   |

