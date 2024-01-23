# API

## stream-quality-report
- get-all
  - query: null
  - return: Topiq[]
- get-by-region
  - query: region
  - return: Topiq[]
- get-by-stream-type
  - query: type
  - return: Topiq[]
- get-by-region-and-stream-type
  - query: region, type
  - return: Topiq[]
- get-by-channel
  - query: channel
  - return: Topiq[]


### structure

- Topiq
```
struct Topiq {
    region: string,
    type: string,
    channel: string,
    topiq_nr: number,
    topiq_nr-flive: number,
    topiq_nr-spaq: number
}
```

- region: 地區，例如: CEBU。
- type: 協定類型，例如: RTMP。
- channel: 桌號，例如: BTCB02。
- topiq_nr: 待補充。
- topiq_nr-flive: 待補充。
- topiq_nr-sppqa: 待補充。

