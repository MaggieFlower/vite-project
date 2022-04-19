import MgForm from './mg-form.vue';
import MgFormItem from './mg-form-item.vue';
import MgInput from './mg-input.vue';
import { App } from 'vue';

export default {
    install (app:App) {
        app.component(MgForm.name, MgForm);
        app.component(MgFormItem.name, MgFormItem);
        app.component(MgInput.name, MgInput);
    }
};
