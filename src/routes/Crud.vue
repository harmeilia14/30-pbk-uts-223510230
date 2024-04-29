<template>
  <div style="margin:20px;">
    <h1 style="text-align:center">Daftar Buku</h1>
    <crud
      :prefix="prefix"
      :path="path"
      :page-title="pageTitle"
      :fields-info="fieldsInfo"
      :details-title="detailsTitle"
      :delete-mode="deleteMode"
      :refresh-button="refreshButton"
      :export-button="exportButton"
      :field-filters="fieldFilters"
      :main-filter="mainFilter"
      :create-mode="createMode"
      :edit-mode="editMode"
      :edit-button="editButton"
      :select-many-mode="selectManyMode"
      :update-many-mode="updateManyMode"
      :remove-many-mode="removeManyMode"
    >
    </crud>
    <alert-box></alert-box>
  </div>
</template>

<script>
import Crud from '@/utils/crud/components/Crud.vue'
import AlertBox from '@/utils/app/components/AlertBox.vue'

export default {
  data () {
    return {
      prefix: 'crud',
      path: 'tasks',
      pageTitle: 'demo.tasks',
      detailsTitle: '',
      deleteMode: 'soft',
      refreshButton: true,
      exportButton: true,
      fieldFilters: true,
      mainFilter: true,
      createMode: true,
      editMode: true,
      editButton: true,
      selectManyMode: true,
      updateManyMode: true,
      removeManyMode: true,
    }
  },
  created () {
    this.detailsTitle = this.$t('detailsTitle')
  },
  computed: {
    fieldsInfo () {
      return [
        {
          text: this.$t('fields.id'),
          name: 'id',
          details: false,
        },
        {
          type: 'input',
          column: 'name',
          text: this.$t('fields.name'),
          name: 'name',
          multiedit: false,
        },
        {
          type: 'textarea',
          column: 'description',
          text: this.$t('fields.description'),
          name: 'description',
          required: false,
        },
      ]
    },
  },
  components: {
    Crud,
    AlertBox,
  },
  i18n: {
    messages: {
      en: {
        detailsTitle: 'Task',
        fields: {
          id: 'Id',
          name: 'Name',
          description: 'Description',
        },
      },
    },
  },
}

</script>

<style>
.theme--light.v-application  {
  background-color: rgb(111, 190, 255);
}
</style>