
# API
- get-api-summary
  - method: POST
  - params: SummaryRequest
  - return: SummaryResponse
- get-api-details
  - method: POST
  - params: DetailRequest
  - return: DetailResponse
- get-api-video
  - method: POST
  - params: VideoRequest
  - return: VideoResponse

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
---
## Summary

<b>SummaryRequest</b>

```ts
class SummaryRequest {
	public region: string;
	public streamType: string;
	public resolution: string;
	public startTime: Date;
	public endTime: Date;
}
```

<b>SummaryResponse</b>

```ts
class SummaryResponse {
	public summarys: SummaryData[]
}
```

<b>SummaryData</b>

```ts
class SummaryData {
	public region: string;
	public streamType: string;
	public channel: string;
	public resolution: string;

	public nr_m: number;
	public nr_sd: number;

	public flive_m: number;
	public flive_sd: number;

	public spaq_m: number;
	public spaq_sd: number;
}
```
---
## Detail

<b>DetailRequest</b>

```ts
class DetailRequest {
	public region: string;
	public streamType: string;
	public resolution: string;
	public startTime: Date;
	public endTime: Date;
}
```

<b>DetailResponse</b>

```ts
class DetailResponse {
	public details: DetailData[]
}
```

<b>DetailData</b>

```ts
class DetailData {
	public region: string;
	public streamType: string;
	public channel: string;
	public resolution: string;

	public nr_m: number;
	public nr_sd: number;

	public flive_m: number;
	public flive_sd: number;

	public spaq_m: number;
	public spaq_sd: number;

	public nrs: number[];
	public flives: number[];
	public spaqs: number[];

	public timestamps: number[];
}
```
---

## Video

<b>VideoRequest</b>

```ts
class VideoRequest {
	public region: string;
	public streamType: string;
	public resolution: string;
	public timestamp: string;
}
```

<b>VideoResponse</b>

```ts
class VideoResponse {
	public video: VideoData;
}
```

<b>VideoData</b>

```ts
class VideoData {
	public videoURL: string;
}
```

# Other
https://johnvansickle.com/ffmpeg/


