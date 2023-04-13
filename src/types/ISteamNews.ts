export interface INewsItem {
  gid: string
  title: string
  url: string
  is_external_url: boolean
  author: string
  contents: string
  feedlabel: string
  date: number
  feedname: string
  feed_type: number
  appid: number
}

export interface IGetNewsForAppResponse {
  appnews: {
    appid: number
    newsitems: INewsItem[]
  }
}

export interface IGetNewsForAppParams {
  appid: number
  count?: number
  maxlength?: number
  format?: 'json' | 'xml' | 'vdf'
}
