import eslintPluginVue from 'eslint-plugin-vue'
import vueParser from 'vue-eslint-parser'

export default [
  {
    files: ['**/*.{js,vue}'],
    ignores: [
      'src/components/ui/*',
      'src/components/ui/**/*'
    ],
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module'
      },
      globals: {
        // Common browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        Audio: 'readonly',
        fetch: 'readonly'
      }
    },
    plugins: {
      vue: eslintPluginVue
    },
    rules: {
      ...eslintPluginVue.configs.base.rules,
      ...eslintPluginVue.configs['vue3-recommended'].rules,
      "vue/comment-directive": "off"
    }
  }
]
