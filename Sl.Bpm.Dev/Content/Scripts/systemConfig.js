//系统配置项 
window.$systemConfig = {};

//流程执行中配置项
window.$systemConfig.workFlowConfig = {
    submitConfirm: false,  //提交时是否需要确认
    showApproveHistory: true,  // 审批时,在审批历史记录中，是否默认显示所有的后续步骤
    showNodesInMyRaised: false,  //我发起的流程打开，若存在多个节点是否需要选择
    enableMailApproveHistory: false,  // 开启审批历史记录中的发送邮件功能
    topicRequired: true, // 是否需要填写主题
    hasPrintBtn: 1, // 第一位代表 在结束的流程上显示打印按钮, [HasPrintBtn & 1 == 1]
    viewSelectSingle: true, //视图选择控件是否启用单击行直接确认选择.
    printRefId: false,//打印的时候显示任务号
    closeAfterSave: false,//表单保存后自动关闭
};

window.$systemConfig.commonConfig = {
    // 静态文件模版下载路径 
    // 以前老路径: "/AppPages/File/Template/"  注意前后要带 "/"
    tplDownloadPath: "/Content/Custom/Files/Template/",  
    //文件存储相对路径 有自定义需求可以引用此配置
    StorePath: "/Content/Custom/Files/",  
    //修改密码功能
    enablePwdReset: true
}

window.$systemConfig.workFlowCenterConfig = {
    statusBackgroundColor: {
        "agree": {
            "color": "#38b03f",
            "background-color": "#ddf4df",
            "border-color": "#bae8b6",
        },
        "reject": {
            "color": "#ea644a",
            "background-color": "#ffe5e0",
            "border-color": "#ffc6c7",
        },
        "cancel": {
            "color": "#ea644a",
            "background-color": "#ffe5e0",
            "border-color": "#ffc6c7",
        }
    }
};