# API

## stream-quality-report
- get-all
  - query: null
  - return: Response
- get-by-region
  - query: region
  - return: Response
- get-by-stream-type
  - query: type
  - return: Response
- get-by-region-and-stream-type
  - query: region, type
  - return: Response
- get-by-channel
  - query: channel
  - return: Response


### structure

<b>Topia</b>
<p>資料庫儲存類型</p>

```
struct Topia {
    region: string,
    type: string,
    channel: string,
    topiq_nr: number,
    topiq_nr-flive: number,
    topiq_nr-spaq: number
    timestamp: 時間戳
}
```
- region: 地區，例如: CEBU。
- type: 協定類型，例如: RTMP。
- channel: 桌號，例如: BTCB02。
- topiq_nr: 待補充。
- topiq_nr-flive: 待補充。
- topiq_nr-sppqa: 待補充。
- timestamp: 時間戳

---
<b>TopiqResponse</b>
```
struct TopiqResponse {
    region: string;
    type: string;
    channel: string;
    nr_list: number[]; //limit 50
    nr_flive_list: number[]; //limit 50
    nr_spaq_list: number[]; //limit 50
    timestamp: number[] //limit 50
}
```

---

<b>StreamQualityReportResponse</b>
```
struct StreamQualityReportResponse {
  errorCode: number,
  list: TopiqResponse[],
}
```

- errorCode
  - 0: success
  - 1: missing query region
  - 2: missing query stream type
  - 3: missing query region and stream type
  - 4: missing query channel
- list: 篩選資料

