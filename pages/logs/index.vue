<template>
  <div class="section">
    <div class="columns">
      <div class="column is-12">
        <div class="box">
          <b-field>
            <command-button
              command="status"
              name="Status"
              @clicked="handleClick"
            />
            <command-button
              command="log --color --stat --abbrev-commit --date=local"
              name="Commit Log"
              @clicked="handleClick"
            />
            <command-button
              command="log --color --summary --graph --abbrev-commit --pretty=oneline --date=local"
              name="Commit Graph"
              @clicked="handleClick"
            />
            <command-button
              command="ls-files -s"
              name="View Tree Files"
              @clicked="handleClick"
            />
            <command-button
              command="diff HEAD^ HEAD --color"
              name="Committed Code"
              @clicked="handleClick"
            />
            <command-button
              command="diff --color"
              name="Uncommitted Code"
              @clicked="handleClick"
            />
            <command-button
              command="config -l"
              name="View Config"
              @clicked="handleClick"
            />
          </b-field>
        </div>
        <div class="box"><pre v-html="$convert(output) || 'Click a command'"></pre>
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
    }
  }
}
</script>

<style>

</style>
