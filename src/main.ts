import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import Button from "primevue/button";
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';   // optional
import Row from 'primevue/row';
import IconField from "primevue/iconfield";
import InputIcon from "primevue/inputicon";
import InputText from "primevue/inputtext";                   // optional
import Card from "primevue/card";

const app = createApp(App);
app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
});
app
  .component('Button', Button)
  .component('DataTable', DataTable)
  .component('Column', Column)
  .component("InputText", InputText)
  .component('IconField', IconField)
  .component('InputIcon', InputIcon)
  .component('ColumnGroup', ColumnGroup)
  .component('Card', Card)
  .component('Row', Row);

app.mount('#app')
