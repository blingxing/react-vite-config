/*
 * @Author: ryyyyy
 * @Date: 2023-02-01 12:05:39
 * @LastEditors: ryyyyy
 * @LastEditTime: 2023-02-01 14:17:12
 * @FilePath: /ad-oversea-vite/.eslintrc.cjs
 * @Description: 
 * 
 */
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:react/jsx-runtime"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        },
    },
    "plugins": [
        "react"
    ],
    "rules": {
        //空行不能够超过2行
        "no-multiple-empty-lines": [1, { "max": 2 }],
        //变量未引用的警告
        "no-unused-vars": [1],
        //prop-types
        "react/prop-types": [0],
        //声明名称
        "react/display-name": [0],
        "no-undef": [0],
        "no-useless-escape": [1]
    }
}
