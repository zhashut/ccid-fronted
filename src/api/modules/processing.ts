import hyRequest from '../request/index'

// 获取专利列表
export function getDataPatentList(params?: any) {
    return hyRequest.get({
        url:"/dataPatent/list",
        params:params
    })
}
// 创建专利数据
export function createDataPatent(params: any){
    return hyRequest.post({
        url:"/dataPatent/create",
        data:params
    })
}
// 更新专利数据
export function updateDataPatent(params: any){
    return hyRequest.post({
        url:"/dataPatent/update",
        data:params
    })
}
// 删除专利数据
export function deleteDataPatent(params: any){
    return hyRequest.post({
        url:"/dataPatent/update",
        data:params
    })
}

// 获取团队成员列表
export function getTeamMemberList(params: any){
    return hyRequest.get({
        url:"/teamMember/list",
        params:params
    })
}

// 创建团队成员数据
export function createTeamMember(params: any){
    return hyRequest.post({
        url:"/teamMember/create`",
        data:params
    })
}
// 更新团队成员数据
export function updateTeamMember(params: any){
    return hyRequest.post({
        url:"/teamMember/update",
        data:params
    })
}
// 删除团队成员数据
export function deleteTeamMember(params: any){
    return hyRequest.post({
        url:"/teamMember/delete",
        data:params
    })
}