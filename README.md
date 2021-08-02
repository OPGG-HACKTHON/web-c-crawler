# Custom Data API

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

# Progress API

## `Request`

```python
GET /champion/progress
Host: http://52.78.131.104:9000
```

## `Response`

숫자의 형태로 `0~100`까지 제공.

총 챔피언 수는 현재 155개이며, 현재 크롤링이 완료된 챔피언 수로 계산.

## `Example`

```python
Request : axios.get('http://52.78.131.104:9000/champion/progress')

result.data = 75
```

# Status Code



|               설명                | 코드 |      message      |
|:---------------------------------:|:----:|:-----------------:|
| 중복 요청을 한 경우, Client Error | 403  | Duplicate Request |
|자체적인 Server에 오류가 있는 경우|    500  |  Server Error     |
|Upstream Server에 오류가 있는 경우 | 502 |  Upstream Server Error  |
|   성공적으로 데이터를 전송한 경우   |  200    |                   |



# Static Data Updater

Browser를 컨트롤하여 Static Data를 크롤링한다.

## 특징

라이엇의 챔프, 아이템 추가 시에만 필요한 API 이다.
매우 느리게 바뀌는 데이터를 보장하므로 아니므로, 천천히 추후에 추가할 예정이다.
현재는 `update`하는 함수만 구현한 상태! 
함수를 실행할 방법은 직접 Clone하여 실행시키는 방법 뿐입니다.😀

## 실행 방법

```
1. git clone https://github.com/OPGG-HACKTHON/web-c-crawler

2. npm i 

3. src/staticDataUpdater/index 파일 제일 하단에 staticDataUpdater.updateStaticData() 추가

4. npx tsc && node dist/staticDataUpdater/index (브라우저가 자동으로 움직일거임)

5. static/ 폴더 안을 보시면 업데이트가 되어있을거에요.

6. 그 업데이트된 파일을 GitHub에 push 해주세요.

**굳이 안하시길 바랍니다. 
```
