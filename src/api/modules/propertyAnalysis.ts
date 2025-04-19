import hyRequest from '../request/index'
// 获取专利列表
export function getDataReportList(params?: any) {
    return hyRequest.get({
        url: "/dataReport/list",
        params: params
    })
}

// 创建专利数据
export function createDataReport(params: any) {
    return hyRequest.post({
        url: "/dataReport/create",
        data: params
    })
}

// 更新专利数据
export function updateDataReport(params: any) {
    return hyRequest.post({
        url: "/dataReport/update",
        data: params
    })
}

// 删除专利数据
export function deleteDataReport(params: any) {
    return hyRequest.post({
        url: "/dataReport/update",
        data: params
    })
}