
import API from "../utils/API.js";
import RandomUtil from "../utils/RandomUtil.js"
import {urlParam}  from "../utils/communication.js"

const newsClassMap = ["热点", "国内", "国际", "军事", "财经", "娱乐", "体育", "科技", "游戏", "文化", "社会"];

export function getNewsList(query, page, number, that) {
    var request = new XMLHttpRequest();
    console.log("getNewsList")
    var params = {
        page: page,
        number: number,
        query: query,
    }
    var url = urlParam(API.GET_NEWS_LIST.path, params) // 查询关键词，未分词
    request.open(API.GET_NEWS_LIST.method, url, true)
    var newsList
    var totalNumber = 100
    var start = new Date().getTime()
    var keywords = [query]
    request.onreadystatechange = function () {
        console.log(request.readyState, request.status)
        if (request.readyState === 4 && request.status === 200) {
            try{
                var jsonobj = JSON.parse(request.responseText);
                newsList = jsonobj["data"];       //新闻列表，属性不变
                totalNumber = jsonobj["total"];   //总结果条数
                keywords = jsonobj["keywords"];   //关键词分词结果，list[str]
                that.newsInfo = {
                    data: newsList,
                    total: totalNumber,
                    time: ((new Date().getTime()) - start) / 1000,
                    keywords: keywords,
                }
                console.log(that.newsInfo)
            } catch ( error ) {
                newsList = randomInitNews(query)
            }
        } else {
            newsList = randomInitNews(query)
        }
    }
    request.send(null)
}

export function getNewsClassList(newsclassnumber, page, number, that) {
    console.log(newsclassnumber)
    var newsclass = newsClassMap[newsclassnumber];
    console.log(newsclass);
    var request = new XMLHttpRequest()
    request.open(API.POST_NEWS_LIST.method, API.POST_NEWS_LIST.path, true)
    var total
    var newsList
    that.isLoading = true
    request.onreadystatechange = function () {
        console.log(request.readyState, request.status)
        if (request.readyState === 4 && request.status === 200) {
            try{
                var jsonobj = JSON.parse(request.responseText);
                newsList = jsonobj["data"];
                total = jsonobj["total"];
                that.newsInfo = {
                    data: newsList,
                    time: 0.0001,
                    total: total,
                    keywords: [],
                }
                that.isLoading = false
                console.log(that.newsInfo)
            } catch ( error ) {
                newsList = randomInitNews(newsclass)
                total = 1000
            }
        } else {
            newsList = randomInitNews(newsclass)
        }
    }
    request.send(JSON.stringify({
        newstype: newsclass,   // 查询新闻类别, str
        page: page,     // 请求 第page页 的结果, int
        number: number, // 每个page的新闻个数, int
    }))
}

function randomInitNews(query) {
    var newsList = []
    for (let index = 0; index < 10; index++) {
        newsList.push({
            uid: index,
            link: "https://www.baidu.com",
            title: (" This is a random news " + query + RandomUtil.getRandomNumber(0, 100)).repeat(10),
            content: "这是新闻内容，".repeat(20),
            imgurl: RandomUtil.getRandomNumber(0, 2) === 1 ? "http://inews.gtimg.com/newsapp_ls/0/12576682689_640330/0" : "",
            source: "新华网",
            time: "2020.1.1",
        })
    }
    return newsList
}

export default newsClassMap