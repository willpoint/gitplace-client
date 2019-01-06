<template>
  <div>
    <p class="">
      <span v-if="meta.type === 'blob'">
        <b-icon 
          icon="file-outline" 
          size="is-small"
          type="is-dark"
        />
        &nbsp;
        <a @click="viewFile(meta.name)">{{ meta.name }}</a>
      </span>
      <span v-else-if="meta.type === 'tree'">
        <b-icon
          icon="folder"
          size="is-small"
          type="is-dark"
        />
        &nbsp;
        <a @click="viewFolder(meta.name)">{{ meta.name }}</a>
      </span>
      <span v-else>
        <b-icon 
          icon="folder" 
          size="is-small"
          type="is-success"
        />
        &nbsp;
        {{ meta.name }}
      </span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    meta: {
      type: Object,
      default: () => ({})
    }
  },
  methods: {
    viewFile(name) {
      this.$emit('file', name)
    },
    viewFolder(folder) {
      this.$emit('folder', folder)
    }
  }
}
</script>

<style>

</style>
