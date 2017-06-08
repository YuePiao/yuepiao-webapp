<template lang='pug'>
  li.cinema-list-item
    .cinema-name {{ cinema.name }}
    .cinema-address {{ cinema.address }}
</template>

<script>
export default {
  props: {
    cinema: Object,
  },
}
</script>

<style scoped>
.cinema-list-item {
  margin: 0;
  padding: 1rem 0;
  white-space: nowrap;
  overflow: hidden;
  color: black;
  transition: color .3s, background-color .3s;
  border-bottom: solid 1px #cccccc;
}

.cinema-list-item:hover {
  background-color: #dddddd;
}

.cinema-list-item .cinema-name, .cinema-list-item .cinema-address {
  text-decoration: none;
}

.cinema-list-item .cinema-address {
  text-align: right;
  font-size: small;
  color: #555555;
}

</style>
