import hyRequest from '../request/index'

// 获取专利列表
export function getDataPatentList(params?: any) {
    return hyRequest.get({
        url: "/dataPatent/list",
        params: params
    })
}

// 创建专利数据
export function createDataPatent(params: any) {
    return hyRequest.post({
        url: "/dataPatent/create",
        data: params
    })
}

// 更新专利数据
export function updateDataPatent(params: any) {
    return hyRequest.post({
        url: "/dataPatent/update",
        data: params
    })
}

// 删除专利数据
export function deleteDataPatent(params: any) {
    return hyRequest.post({
        url: "/dataPatent/update",
        data: params
    })
}