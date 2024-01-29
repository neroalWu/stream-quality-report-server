# API

## stream-quality-report
- get-stream-quality-report-response
  - query
    - region: string
    - streamType: string
    - bitrateType: string
  - return : StreamQualityReportResponse
- get-screenshot
  - query
    - region: string
    - streamType: string
    - channel: string
    - timestamp: number
    - return: Base64


### structure

<b>Topia</b>
<p>資料庫儲存類型</p>

```
struct Topia {
    region: string,
    type: string,
    channel: string,
    bitrateType: string,
    topiq_nr: number,
    topiq_nr-flive: number,
    topiq_nr-spaq: number
    timestamp: number
}
```
- region: 地區，例如: CEBU。
- type: 協定類型，例如: RTMP。
- channel: 桌號，例如: BTCB02。
- bitrateType: 畫質，例如: High。
- topiq_nr: 待補充。
- topiq_nr-flive: 待補充。
- topiq_nr-spqa: 待補充。
- timestamp: number

---
<b>TopiqResponse</b>
```
struct TopiqResponse {
    region: string;
    streamType: string;
    channel: string;
    bitrateType: string;
    nr_list: number[]; //limit 20
    nr_flive_list: number[]; //limit 20
    nr_spaq_list: number[]; //limit 20
    timestamp_list: number[] //limit 20
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
  - 1: missing query string
- list: 篩選資料

---

<b>ImageModel</b>
```
struct ImageModel {
  id: string;
  data: Buffer;
}
```


