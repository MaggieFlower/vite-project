import { createApp } from 'vue';

import App from './App.vue';
import Mg from './pages/mg-layout/index';
import MgForm from './components/form/index';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import Store from './store/index.js';

import Router from './router/index.js';

const app = createApp(App).use(Antd);
app.use(Store).use(Router).use(MgForm).use(Mg).mount('#app');
// app.mount('#app');
