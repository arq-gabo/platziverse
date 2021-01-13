<template>
  <div>
    <metric uuid="ab1269dd-aaa5-4763-9b4d-c4fd5a879ec7" type="promiseMetric" ></metric>
    <agent
      v-for="agent in agents"
      :uuid="agent.uuid"
      :key="agent.uuid">
    </agent>
    <p v-if="error">{{error}}</p>
  </div>
</template>

<style>
  body {
    font-family: Arial;
    background: #f8f8f8;
    margin: 0;
  }
</style>

<script>

module.exports = {
  data () {
    return {
      agents: [],
      error: null
    }
  },

  mounted () {
    this.initialize()
  },

  methods: {
    initialize () {
    }
  }
}
</script>
