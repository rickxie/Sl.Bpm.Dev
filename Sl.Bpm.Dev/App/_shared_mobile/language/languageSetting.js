_shared.languageSetting = {};
_shared.languageSetting.rules = {
    'en': {
        nickname: {
            pattern: "nickname should start with latter, can contain numbers and letters"
        },
        schemaName: {
            pattern: "code should start with letter, only can contain numbers and letter"
        },
        password: {
            required: "password can't be empty",
            minlength: "length must larger than {minlength}",
            pattern: "length must larger than 6, and can contain numbers and letters"
        }
    },
    'zh-CN': {
        nickname: {
            pattern: "昵称必须输入数字或下划线,以字母开头"
        },
        schemaName: {
            pattern: "代码必须输入数字或下划线,以字母开头"
        },
        password: {
            required: "密码不能为空",
            minlength: "密码长度不能小于{minlength}",
            pattern: "密码必须且只能包含字母和数字,长度不能小于6位"
        }
    }
}

_shared.languageSetting.defaultRules = {
    'en': {
        required: "this is required",
        maxlength: "max-length can't be larger than {maxlength}",
        minlength: "max-length can't be less than {minlength}",
        email: "email format is wrong",
        repeat: "Two times input is not the same",
        pattern: "format is wrong",
        number: "number required",
        w5cuniquecheck: "value exists please change",
        url: "url format is not correct",
        max: "value can't be larger than {max}",
        min: "value can't be less than {min}",
        customizer: "custom validation failed",
        isrequired: ' is required.',
        lengthcannotlager: ' length cannot be larger than ',
        lengthcannotlesser: ' length cannot be lesser than ',
        valuecannotlager: ' number cannot be larger than ',
        valuecannotlesser: ' number cannot be lesser than '
    },
    'zh-CN': {
        required: "该选项不能为空",
        maxlength: "该选项输入值长度不能大于{maxlength}",
        minlength: "该选项输入值长度不能小于{minlength}",
        email: "输入邮件的格式不正确",
        repeat: "两次输入不一致",
        pattern: "输入格式不正确",
        number: "必须输入数字",
        w5cuniquecheck: "该输入值已经存在，请重新输入",
        url: "输入URL格式不正确",
        max: "该选项输入值不能大于{max}",
        min: "该选项输入值不能小于{min}",
        customizer: "自定义验证不通过",
        isrequired: ' 是必填的',
        lengthcannotlager: ' 长度不能大于 ',
        lengthcannotlesser: ' 长度不能小于 ',
        valuecannotlager: ' 不能大于 ',
        valuecannotlesser: ' 不能小于 '
    }
}