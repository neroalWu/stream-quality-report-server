# API
- get-topiq-data
  - method: POST
  - params: TopiqRequest
  - return: TopiqResponse
- get-image
  - mtehod: POST
  - params: ImageRequest
  - return: ImageResponse


# Structure

## Topiq 
<b>TopiqModel</b>
```ts
class TopiqModel {
    public region: string,
    public streamType: string,
    public channel: string,
    public resolution: string,

    public topiq_nr: number,
    public "topiq_nr-flive": number,
    public "topiq_nr-spaq": number,

    public timestamp: number
}
```
- region: 地區，例如: CEBU。
- streamType: 協定類型，例如: RTMP。
- channel: 桌號，例如: BTCB02。
- resolution: 解析度，例如: HD(720p)。
- topiq_nr: 待補充。
- topiq_nr-flive: 待補充。
- topiq_nr-spqa: 待補充。
- timestamp: number


<b>TopiqRequest</b>
```ts
class TopiqRequest {
	public region: string;
	public streamType: string;
	public resolution: string;
}
```
<b>TopiqData</b>
```ts
class TopiqData {
	public region: string;
	public streamType: string;
	public channel: string;
	public resolution: string;

	public nr_list: number[];
	public nr_flive_list: number[];
	public nr_spqa_list: number[];

	public timestamp_list: number[];
}
```
<b>TopiqResponse</b>
```ts
class TopiqResponse {
	public list: TopiqData[]
}
```
---
## Image
<b>ImageModel</b>
```ts
class ImageModel {
  public id: string;
  public buffer: Buffer;
}
```

<b>ImageRequest</b>
```ts
class ImageRequest {
	public region: string;
	public streamType: string;
	public channel: string;
	public timestamp: number;
}
```

<b>ImageResponse</b>

```ts
class ImageResponse {
	public src: string;
}
```


