module.exports = {
    root: true,
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
        withDefaults: 'readonly',
    },
    extends: [
        // 'standard',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended'
    ],
    plugins: [
        '@typescript-eslint',
        'prettier',
    ],
    parser: 'vue-eslint-parser',
    // parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // parser字段需要在parserOptions，写在顶层会报错：是实验特性***
        // parser: '@babel/eslint-parser',
        parse: '@typescript-eslint/parser',
        requireConfigFile: false,
    },
    rules: {
        'no-console': 2,
        // 关闭基础的eslint校验,启用ts-lint校验获取准确的报错信息
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': ['error',
            { varsIgnorePattern: '.*', args: 'none' },
        ],
        // 允许let person = new constructor()
        // 变量和构造器小写开头
        'new-cap': ['error', { newIsCap: false }],
        // 必须以分号结尾
        semi: [2, 'always'],
        // 每行4个空格
        indent: ['error', 4],
        // 对象必须有逗号结尾
        'comma-dangle': ['error', 'only-multiline'],
        // 函数声明后带空格
        'space-before-function-paren': ['error', 'always'],
        'no-undef': 'off'
    },
};
