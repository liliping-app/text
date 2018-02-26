<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <div>请遵守Vue规范，请仔细阅读README.md</div>
    <div>请遵守命名规范</div>
    <div>请按照Eslint规则书写</div>
  </div>
</template>

<script>
export default {
    name: 'hello',
    data () {
        return {
            msg: '这个页面是基于Vue的'
        };
    }
};
</script>

<style scoped>
h1{
    color: black;
    font-weight: normal;
}
</style>
