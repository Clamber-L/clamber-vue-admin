// 组件迁移辅助脚本
const fs = require('fs')
const path = require('path')

// Vue 组件转 React 组件的基本转换规则
const conversionRules = {
    // 模板转换
    template: {
        'v-if': (content) => content.replace(/v-if="([^"]+)"/g, '{$1 && '),
        'v-for': (content) => content.replace(/v-for="([^"]+) in ([^"]+)"/g, '{$2.map(($1) => '),
        'v-model': (content) => content.replace(/v-model="([^"]+)"/g, 'value={$1} onChange={(e) => set$1(e.target.value)}'),
        '@click': (content) => content.replace(/@click="([^"]+)"/g, 'onClick={$1}'),
        ':class': (content) => content.replace(/:class="([^"]+)"/g, 'className={$1}'),
    },

    // script 转换
    script: {
        'import { ref }': 'import { useState }',
        'import { reactive }': 'import { useState }',
        'import { computed }': 'import { useMemo }',
        'import { onMounted }': 'import { useEffect }',
        'const.*= ref\\(': 'const [state, setState] = useState(',
        'const.*= reactive\\(': 'const [state, setState] = useState(',
    }
}

// 组件转换函数
function convertVueToReact(vueFilePath, reactFilePath) {
    const vueContent = fs.readFileSync(vueFilePath, 'utf8')

    // 提取 template、script、style 部分
    const templateMatch = vueContent.match(/<template>([\s\S]*?)<\/template>/)
    const scriptMatch = vueContent.match(/<script.*?>([\s\S]*?)<\/script>/)
    const styleMatch = vueContent.match(/<style.*?>([\s\S]*?)<\/style>/)

    let template = templateMatch ? templateMatch[1] : ''
    let script = scriptMatch ? scriptMatch[1] : ''
    let style = styleMatch ? styleMatch[1] : ''

    // 应用转换规则
    Object.keys(conversionRules.template).forEach(rule => {
        template = conversionRules.template[rule](template)
    })

    Object.keys(conversionRules.script).forEach(rule => {
        script = script.replace(new RegExp(rule, 'g'), conversionRules.script[rule])
    })

    // 生成 React 组件
    const reactComponent = `
import React, { useState, useEffect, useMemo } from 'react'
import './style.scss'

${script}

const Component: React.FC = () => {
  return (
    ${template}
  )
}

export default Component
  `

    // 写入 React 文件
    fs.writeFileSync(reactFilePath, reactComponent)

    // 写入样式文件
    if (style) {
        fs.writeFileSync(reactFilePath.replace('.tsx', '.scss'), style)
    }
}

// 批量转换工具
function batchConvert(vueDir, reactDir) {
    const files = fs.readdirSync(vueDir)

    files.forEach(file => {
        if (file.endsWith('.vue')) {
            const vueFilePath = path.join(vueDir, file)
            const reactFilePath = path.join(reactDir, file.replace('.vue', '.tsx'))

            try {
                convertVueToReact(vueFilePath, reactFilePath)
                console.log(`✅ 转换成功: ${file}`)
            } catch (error) {
                console.log(`❌ 转换失败: ${file}`, error.message)
            }
        }
    })
}

module.exports = {
    convertVueToReact,
    batchConvert
}