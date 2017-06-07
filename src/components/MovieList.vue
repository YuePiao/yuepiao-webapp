<template lang='pug'>
  ul.movie-list
    slot
</template>

<script>

</script>

<style>
.movie-list {
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-color: #eef1f6;
  height: 100%;
  overflow-y: auto;
}
</style>
