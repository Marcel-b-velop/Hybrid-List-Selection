<script setup lang="ts">
import {ref} from 'vue';
import {Item} from "../types/item.ts";
import DataTable from "primevue/datatable";

defineProps<{ msg: string }>()
const grid = ref<DataTable>();
const setOne = ref<Item[]>([
  {id: 1, code: 'A', name: 'Apple'},
  {id: 2, code: 'B', name: 'Pineapple'},
  {id: 3, code: 'C', name: 'Banana'},
  {id: 4, code: 'D', name: 'Orange'},
  {id: 5, code: 'E', name: 'Grapes'},
  {id: 6, code: 'F', name: 'Mango'},
  {id: 7, code: 'G', name: 'Strawberry'},
  {id: 8, code: 'H', name: 'Blueberry'},
  {id: 9, code: 'I', name: 'Watermelon'},
  {id: 10, code: 'J', name: 'Peach'}
]);
const setTwo = ref<Item[]>([]);

const add = (f) => {
  setTwo.value.push(f);
};
const addAllFiltered = () => {
  setTwo.value = setTwo.value.concat(filteredValues.value);
};
const rm = (f) => {
  setTwo.value = setTwo.value.filter((item) => item.id !== f.id);
};
const isInSetTwo = (f) => {
  const result = setTwo.value.find((item) => item.id === f.id);
  console.log(result);
  return result === undefined;
};
const filters = ref();
const filters2 = ref();
const initFilters = () => {
  filters.value = {
    name: {value: null, matchMode: "contains"},
    code: {value: null, matchMode: "startsWith"},
    // global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  };
  filters2.value = {
    name: {value: null, matchMode: "contains"},
    code: {value: null, matchMode: "startsWith"},
    // global: {value: null, matchMode: FilterMatchMode.CONTAINS},
  };
};
const clearFilter = () => {
  initFilters();
};
const removeAll = () => {
  setTwo.value = [];
};

const filteredValues = ref<Item[]>([]);
const onFilter = (e) => {
  filteredValues.value = e.filteredValue;
};
initFilters();
const getIcon = (data) => {
  return isInSetTwo(data) ? 'pi pi-arrow-right' : 'pi pi-times';
};

</script>

<template>
  <Card class="w-full">
    <template #title>
      <h1>Data Table</h1>
    </template>
    <template #content>
      <div class="flex">
        <div class="mr-4">
          <h2 class="text-left">Suche</h2>
          <DataTable
              filterDisplay="menu"
                     v-model:filters="filters"
                     key="id"
                     v-on:filter="onFilter"
                     ref="grid"
                     :value="setOne"
                     tableStyle="min-width: 20rem">
            <template #header>
              <div class="flex align-content-start justify-between">
                <IconField>
                  <InputText class="w-8rem" v-model="filters.code.value" placeholder="Code"/>
                  <InputIcon>
                    <i class="pi pi-search"/>
                  </InputIcon>
                </IconField>
                <Button class="mr-4" type="button" icon="pi pi-filter-slash" outlined @click="clearFilter()"/>
                <IconField>
                  <InputText class="w-10rem" v-model="filters.name.value" placeholder="Name"/>
                  <InputIcon>
                    <i class="pi pi-search"/>
                  </InputIcon>
                </IconField>
                <Button type="button" icon="pi pi-filter-slash" outlined @click="clearFilter()"/>
              </div>
            </template>
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column>
              <template #header>
                <Button type="button" icon="pi pi-arrow-right" outlined @click="addAllFiltered()"/>
              </template>
              <template #body="{data}">
                <Button @click="isInSetTwo(data) ? add(data) : rm(data)"
                        :icon="getIcon(data)"
                        class="p-button-rounded"
                        :class="isInSetTwo(data) ? 'p-button-success' : 'p-button-danger'"
                        style="transition: all 0.8s ease;"/>
              </template>
            </Column>
          </DataTable>
        </div>
        <div>
          <h2 class="text-left">Auswahl</h2>
          <DataTable
              filterDisplay="menu"
              v-model:filters="filters2"
              key="id"
              ref="grid"
              :value="setTwo"
              tableStyle="min-width: 20rem">
            <template #header>
              <div class="flex align-content-start justify-between">
                <IconField>
                  <InputText class="w-8rem" v-model="filters2.code.value" placeholder="Code"/>
                  <InputIcon>
                    <i class="pi pi-search"/>
                  </InputIcon>
                </IconField>
                <Button class="mr-4" type="button" icon="pi pi-filter-slash" outlined @click="clearFilter()"/>
                <IconField>
                  <InputText class="w-10rem" v-model="filters2.name.value" placeholder="Name"/>
                  <InputIcon>
                    <i class="pi pi-search"/>
                  </InputIcon>
                </IconField>
                <Button type="button" icon="pi pi-filter-slash" outlined @click="clearFilter()"/>
              </div>
            </template>
            <Column field="code" header="Code"></Column>
            <Column field="name" header="Name"></Column>
            <Column header="">
              <template #header>
                <Button v-if="setTwo.length > 0" type="button" icon="pi pi-times" severity="danger" outlined @click="removeAll()"/>
              </template>
              <template #body="{data}">
                <Button @click="rm(data)" icon="pi pi-times" class="p-button-rounded p-button-danger p-mr-2"/>
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </template>
  </Card>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
