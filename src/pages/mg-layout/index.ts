import { App } from 'vue';
import MgLayout from './container.vue';
console.log('MgLayout: ', MgLayout.name);
import MgHeader from './header.vue';
import MgFooter from './footer.vue';
import MgContent from './content.vue';
import MgSidebar from './sidebar.vue';

export default {
    install(app:App) { 
        app.component(MgLayout.name, MgLayout);
        app.component(MgHeader.name, MgHeader);
        app.component(MgFooter.name, MgFooter);
        app.component(MgContent.name, MgContent);
        app.component(MgSidebar.name, MgSidebar);
    }
}