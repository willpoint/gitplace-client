<template>
  <div class="section">
    <div class="columns">
      <div class="column is-4">
        <div class="box">
          <div class="">
            <p class="title is-6">
              Checkout Branch
            </p>
            <form @submit.prevent="handleCheckout('branch')">
              <b-field>
                <b-select 
                  placeholder="Select a branch"
                  v-model="form.branch"
                  expanded>
                  <option
                    v-for="(b, i) in branchChoice"
                    :key="i"
                    :value="b">
                    {{ b }}
                  </option>
                </b-select>
              </b-field>
              <button 
                class="button is-small is-success">
                Checkout
              </button>
            </form>
            <hr />
          </div>
          <div class="">
            <p class="title is-6">
              Checkout Tags
            </p>
            <form @submit.prevent="handleCheckout('tag')">
              <b-field>
                <b-select 
                  placeholder="Select a branch"
                  v-model="form.tag"
                  expanded>
                  <option
                    v-for="(b, i) in tagChoice"
                    :key="i"
                    :value="b">
                    {{ b }}
                  </option>
                </b-select>
              </b-field>
              <button 
                class="button is-small is-success">
                Checkout
              </button>
            </form>
            <hr />
          </div>
          <div class="">
            <p class="title is-6">
              Checkout SHA1 refs
            </p>
            <form @submit.prevent="handleCheckout('sha1')">
              <b-field 
                message="You can enter an abbreviated sha1 hash">
                <b-input 
                  placeholder="Enter SHA1"
                  v-model="form.sha1"
                />
              </b-field>
              <button 
                class="button is-small is-success">
                Checkout
              </button>
            </form>
            <hr />
          </div>
          <b-message
            v-if="errormsg" 
            type="is-danger" 
            size="is-small"
            has-icon>
            {{ errormsg }}
          </b-message>
        </div>
      </div>
      <div class="column is-8">
        <div class="reflist">
          <b-collapse class="card">
            <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">
                Branches ({{filteredBranches.length}})
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
              </a>
            </div>
            <div class="card-content">
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
                        <b-tag type="is-success">
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
                  <b-tag type="is-success">
                    <b-icon 
                      icon="tag-multiple"
                      size="is-small"
                    />
                    (no branches?)
                  </b-tag>
                </div>
              </div>
            </div>
          </b-collapse>
        </div>
        <hr />
        <div class="reflist">
          <b-collapse class="card">
            <div slot="trigger" slot-scope="props" class="card-header">
              <p class="card-header-title">
                Tags ({{filteredTags.length}})
              </p>
              <a class="card-header-icon">
                <b-icon :icon="props.open ? 'menu-down' : 'menu-up'" />
              </a>
            </div>
            <div class="card-content">
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
                        <b-tag type="is-light">
                          <b-icon 
                            icon="tag-multiple"
                            size="is-small"
                            type="is-primary"
                          />
                        </b-tag>
                        <b-tag type="is-dark">{{ c }}</b-tag>
                      </b-taglist>
                    </div>
                  </b-field>
                </div>
                <div v-else>
                  <b-tag type="is-success">
                    <b-icon 
                      icon="tag-multiple"
                      size="is-small"
                    />
                    (no tags)
                  </b-tag>
                </div>
              </div>
            </div>
          </b-collapse>
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
      body: 'branch -a'
    })
    const tags = store.dispatch('tags', {
      type: 'tags',
      body: 'tag'
    })
    return Promise.all([branches, tags]).catch((err) => {
      
    })
  },
  data() {
    return {
      errormsg: '',
      form: {
        branch: null,
        tag: null,
        sha1: null,
      }
    }
  },
  computed: {
    ...mapGetters(
      ['branches', 'tags', 'notification']
    ),
    branchChoice() {
      const c = this.branches.split('\n')
      // Ensure already checked out branch is not in choice
      return c.filter(v => v != '' && !v.includes('*'))
    },
    tagChoice() {
      const c = this.tags.split('\n')
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
    handleCheckout(name) {
      this.isLoading = true
      let ref = this.form[name]
      this.$store.dispatch('notification', {
        type: 'notification',
        body: 'checkout ' + ref
      }).then(d => {
        this.$store.commit('GET_DATA', {
          type: 'branches',
          body: 'branch -a'
        })
        this.form[name] = null
        this.isLoading = false
      }).catch(err => {
        this.isLoading = false
        this.errormsg = 'Aborted: You may have uncommitted changes, please commit your changes or stash them before you switch branches'
      })
    }
  }
}
</script>

<style>
  .reflist .card {
    border-radius: 5px;
    background-color: rgba(255, 255, 255, 0.1);
  }
</style>
