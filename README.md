# 架構
```
           +-------------------+
           |        PM2        |
           +---------+---------+
                     |
          +----------+----------+ Start Service
          |                     |
+---------+---------+ +---------+---------+
|       cron        | |        www        |
+---------+---------+ +---------+---------+
          |                     |
          |                     |
          |                     |
+---------+---------+ +---------+-----------------+
|    CronService    | | StreamQualityReportRouter |
+-------------------+ +---------------------------+
| TopiqRecordJob    | |/get-api-summary           |
| MonthlyCleanupJob | |/get-api-details           |
|                   | |/get-api-video             |
+---------+---------+ +---------+-----------------+
          |                     |
          +---------------------+
          |                     |
+---------+--------+   +--------+---------+
|   MongoService   |   |   VideoService   |
+------------------+   +------------------+
| DB Connection    |   | Create Video URL |
| CRUD Operation   |   | Save/Delete Video|
+------------------+   +------------------+

```

- StreamQualityReportRouter： 處理與串流相關的API請求。
- CronService: 管理 cron job。
- MongoService: 負責與MongoDB連線和操作。
- VideoService: 負責處理影片相關操作，包括生成影片URL和刪除影片。

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

# 類別定義

<b>SummaryRequest</b>

```ts
class SummaryRequest {
	public region: string;
	public streamType: string;
	public resolution: string;
	public startTime: number;
	public endTime: number;
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

<b>DetailRequest</b>

```ts
class DetailRequest {
	public region: string;
	public streamType: string;
	public channel: string;
	public resolution: string;
	public startTime: number;
	public endTime: number;
}
```

<b>DetailResponse</b>

```ts
class DetailResponse {
	public detail: DetailData
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

<b>VideoRequest</b>

```ts
class VideoRequest {
	public region: string;
	public streamType: string;
	public resolution: string;
	public channel: string;
	public timestamp: string;
}
```

<b>VideoResponse</b>

```ts
class VideoResponse {
	public videoURL: string;
}
```

# 資料庫儲存結構
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

# 參考
https://johnvansickle.com/ffmpeg/


