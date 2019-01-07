<template>
  <div>
    <p class="">
      <span v-if="meta.type === 'blob'">
        <a
          class="selected"
          @click="viewFile(meta.name)">
          <b-icon 
            icon="file-outline" 
            size="is-small"
            type="is-gold"
          />
          &nbsp;
          {{ meta.name }}
        </a>
      </span>
      <span v-else-if="meta.type === 'tree'">
        <a
          class="selected"
          @click="viewFolder(meta.name)">
          <b-icon
            icon="folder"
            size="is-small"
            type="is-gold"
          />
          &nbsp;
          {{ meta.name }}
        </a>
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
  .selected {
    display:inline-block;
    width:100%;
  }
</style>
