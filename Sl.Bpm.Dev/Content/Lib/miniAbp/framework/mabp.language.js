mabp.languages = {
    'en': {
        'AreYouSure': 'Are you sure?',
        'Sure': 'Sure',
        'NextPage': 'Next',
        'PreviousPage': 'Previous',
        'TotalPageCount': 'Total',
        'OK': 'OK',
        'Export': 'Export',
        'Attachment': 'Attachment',
        'EachPageDisplay': 'Each Page Display',
        'ClickSureForExecute': 'Click sure to execute?'
    },
    'zh-CN': {
        'Sure': '确定',
        'OK': '确定',
        'Export': '导出',
        'Attachment': '附件',
        'NextPage': '下一页',
        'PreviousPage': '上一页',
        'TotalPageCount': '总共',
        'AreYouSure': '你确定吗?',
        'EachPageDisplay': '每页',
        'ClickSureForExecute': '点击确定将会执行操作?'
    }
}
mabp.language = mabp.languages['zh-CN'];
mabp.setDefaultLanguage = function (lang) {
    mabp.language = mabp.languages[lang];
}
mabp.L = function (key) {
    return mabp.language[key];
}