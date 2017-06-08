<template lang='pug'>
  li.moment-list-item
    .moment-icon
      img.moment-cover(:src='moment.user.avatar')
      .moment-username {{moment.user.username}}
    .moment-description
      .moment-name {{ moment.round.movie.name }}
      .moment-cinema 影院: {{ moment.round.cinema.name | shorten}}
      .moment-duration 日期: {{ moment.round.beginTime }}
</template>

<script>
export default {
  props: {
    moment: Object,
  },
  filters: {
    shorten: (input) => {
      if (input.length <= 10) return input;
      else return input.substring(0,10) + '...';
    },
  }
}
</script>

<style scoped>
.moment-list-item {
  height: 8rem;
  width: 18rem;
  margin: 0;
  padding: 1rem;
  white-space: nowrap;
  overflow: hidden;
  color: #333333;
  transition: color .3s, background-color .3s;
}

.moment-list-item:hover {
  background-color: #dee1e6;
  color: black;
}

.moment-list-item .moment-cover, .moment-list-item .moment-description {
  display: inline-block;
  vertical-align: top;
}

.moment-list-item .moment-cover {
  height: 60px;
  width: 60px;
  border-radius: 30px;
  background-color: #A1A0A0;
}
.moment-list-item .moment-icon {
  display:inline-block;
  margin-top: 1rem;
  margin-left: 0rem;
}
.moment-list-item .moment-username {
  font-size: 15pt;
  margin-top: 10px;
  margin-left: 0px;
  background: rgba(255,255,255,0);
  text-decoration: none;
}

.moment-list-item .moment-description {
  padding-left: 0.5rem;
  margin-top: 1rem;
  margin-left: 0.5rem;
}

.moment-list-item .moment-name {
  display: block;
  font-size: x-large;
}
</style>
