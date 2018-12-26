<template>
  <div class="section">
    <div class="columns">
      <div class="column is-2">
        MENU
      </div>
      <div class="column is-10">
        <div class="box">
          <b-field>
            <command-button
              command="log --abbrev-commit --color --date=local"
              name="View Log"
              @clicked="handleClick"
            />
            <command-button
              command="branch -a --color"
              name="View Branches"
              @clicked="handleClick"
            />
            <command-button
              command="ls-files -s"
              name="View Tree Files"
              @clicked="handleClick"
            />
            <command-button
              command="diff HEAD^ HEAD --color"
              name="View Commit Diff"
              @clicked="handleClick"
            />
          </b-field>
        </div>
        <div 
          class="box">
          <pre v-html="$convert(output) || 'Click a command'"></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommandButton from '@/components/common/CommandButton'
import PTexts from '@/components/common/Paragraphs'
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters({
      output: 'output'
    })
  },
  components: {
    CommandButton,
    PTexts
  },
  methods: {
    handleClick(data) {
      this.$store.commit('GET_DATA', data)
      console.log(this.$convert)
    }
  }
}
</script>

<style>

</style>
