import hyRequest from '../request/index'

// 获取任务列表
export function getDataPatentList(params?: any) {
    return hyRequest.get({
        url:"/dataTask/list",
        params:params
    })
}
// 创建任务数据
export function createDataPatent(params: any){
    return hyRequest.post({
        url:"/dataTask/create",
        data:params
    })
}
// 更新任务数据
export function updateDataPatent(params: any){
    return hyRequest.post({
        url:"/dataTask/update",
        data:params
    })
}
// 删除任务数据
export function deleteDataPatent(id: any){
    return hyRequest.post({
        url:"/dataTask/delete",
        data:{ id: id }
    })
}

// 获取团队成员列表
export function getTeamMemberList(params: any) {
    return hyRequest.get({
        url: "/teamMember/list",
        params: params
    })
}

// 创建团队成员数据
export function createTeamMember(params: any) {
    return hyRequest.post({
        url:"/teamMember/create",
        data:params
    })
}
// 更新团队成员数据
export function updateTeamMember(params: any) {
    return hyRequest.post({
        url: "/teamMember/update",
        data: params
    })
}   
// 删除团队成员数据
export function deleteTeamMember(id: any){
    return hyRequest.post({
        url:"/teamMember/delete",
        data:{ id: id }
    })
}
