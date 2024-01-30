# API

## stream-quality-report
- get-topiq-response-list
  - body
    - region: string
    - streamType: string
    - bitrateType: string
  - return : TopiqResponseList
- get-image-response
  - body
    - region: string
    - streamType: string
    - channel: string
    - timestamp: number
  - return: ImageResponse


### structure

<b>TopiqModel</b>
```
struct TopiqModel {
    region: string,
    streamType: string,
    channel: string,
    bitrateType: string,

    topiq_nr: number,
    topiq_nr-flive: number,
    topiq_nr-spaq: number,

    timestamp: number
}
```
- region: 地區，例如: CEBU。
- streamType: 協定類型，例如: RTMP。
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

<b>TopiqResponseList</b>
```
struct TopiqResponseList {
  list: TopiqResponse[],
}
```

- errorCode
  - 0: success
- list: 篩選資料

---

<b>ImageModel</b>
```
struct ImageModel {
  id: string;
  buffer: Buffer;
}
```

---
<b>ImageResponse</b>

```
struct ImageResponse {
  imageSrc: string;
}
```


