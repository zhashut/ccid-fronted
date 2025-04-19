import hyRequest from '../request/index'

// 获取知识产权信息列表
export function getDataPropertyList(params?: any) {
    return hyRequest.get({
        url:"/dataProperty/list",
        params:params
    })
}

