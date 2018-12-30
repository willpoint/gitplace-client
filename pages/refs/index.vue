<template>
  <div class="section">
    <div class="columns">
      <div class="column is-4">
        <div class="box">
          <p class="title is-6">
            Checkout Branch
          </p>
          <form @submit.prevent="handleCheckout">
            <b-field>
              <b-select 
                placeholder="Select a branch"
                v-model="form.branch"
                expanded>
                <option
                  v-for="(b, i) in choice"
                  :key="i"
                  :value="b">
                  {{ b }}
                </option>
              </b-select>
            </b-field>
            <button 
              class="button is-small is-gold">
              Checkout
            </button>
          </form>
          <hr />
          <b-message>
            Actions such as merge, rebase, etc may be done on the command line
          </b-message>
        </div>
      </div>
      <div class="column is-8">
        <div class="box">
          <p class="title is-6">Branches ({{filteredBranches.length }})</p>
          <div>
            <div
              v-if="filteredBranches.length > 0"
              attached>
              <b-field 
                grouped 
                group-multiline>
                <div
                  v-for="(c, i) in filteredBranches"
                  :key="i" 
                  class="control">
                  <b-taglist attached>
                    <b-tag type="is-warning">
                      <b-icon 
                        icon="source-branch"
                        size="is-small"
                      />
                    </b-tag>
                    <b-tag type="is-dark">{{ c }}</b-tag>
                  </b-taglist>
                </div>
              </b-field>
            </div>
            <div v-else>
              <b-tag type="is-gold">
                <b-icon 
                  icon="tag-multiple"
                  size="is-small"
                />
                (no tags)
              </b-tag>
            </div>
          </div>
        </div>
        <div class="box">
          <p class="title is-6">Tags ({{filteredTags.length}})</p>
          <div>
            <div
              v-if="filteredTags.length > 0"
              attached>
              <b-field 
                grouped 
                group-multiline>
                <div
                  v-for="(c, i) in filteredTags"
                  :key="i" 
                  class="control">
                  <b-taglist attached>
                    <b-tag type="is-gold">
                      <b-icon 
                        icon="tag-multiple"
                        size="is-small"
                      />
                    </b-tag>
                    <b-tag type="is-dark">{{ c }}</b-tag>
                  </b-taglist>
                </div>
              </b-field>
            </div>
            <div v-else>
              <b-tag type="is-gold">
                <b-icon 
                  icon="tag-multiple"
                  size="is-small"
                />
                (no tags)
              </b-tag>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  fetch({store}) {
    const branches = store.dispatch('branches', {
      type: 'branches',
      body: 'branch'
    })
    const tags = store.dispatch('tags', {
      type: 'tags',
      body: 'tag'
    })
    return Promise.all([branches, tags])
  },
  data() {
    return {
      form: {
        branch: null,
        tag: null,
      }
    }
  },
  computed: {
    ...mapGetters(
      ['branches', 'tags', 'notification']
    ),
    choice() {
      const c = this.branches.split('\n')
      // Ensure already checked out branch is not in choice
      return c.filter(v => v != '' && !v.includes('*'))
    },
    filteredBranches() {
      const b = this.branches.split('\n')
      return b.filter(v => v != '')
    },
    filteredTags() {
      const t = this.tags.split('\n')
      return t.filter(v => v != '')
    }
  },
  methods: {
    handleCheckout() {
      this.$store.commit('GET_DATA', {
        type: 'notification',
        body: 'checkout ' + this.form.branch
      })
      this.$store.commit('GET_DATA', {
        type: 'branches',
        body: 'branch'
      })
    }
  }
}
</script>

<style>

</style>
