<template lang='pug'>
  .round-info
    .round-container
      .round-info-left
        .sizer-left
          img.cinemaBox(:src='movie.uri')
        .sizer-right
          .movie-name {{movie.name}}
          .movie-time 时间：{{time}}
          .movie-version 版本：2D中字
          .movie-price 票价：￥{{price}}
      .separate-line.pos1
      .round-info-mid
        .cinema-name {{cinema.name}}
        .cinema-loc 地址：{{cinema.address}}
        .round-position 影厅：{{position}}
      .separate-line.pos2
      .round-info-right
        .total-label 总计： ￥{{total}}
        .enter-button
          .el-button(type='primary' , icon='el-icon-check' , @click='confirmOrder') 确认购票
</template>

<script>
export default {
  props: {
    movie: Object,
    cinema: Object,
    total: Number,
    time: Number,
    price: Number,
    position: String,
  },
  methods: {
    confirmOrder: () => {
      //TODO
    }
  }

}
</script>

<style scoped>
.round-info {
  width: 100%;
  background-color: #ffffff;
  height: 30%;
}
.round-container {
  position:relative;
  width: 80%;
  top: 15%;
  height: 100%;
  left: 18%;
}
.round-info-left,.round-info-mid,.round-info-right {
  display: inline-block;
  position: absolute;
  top: 13%;
  width: 25%;
  height: 30%;
}
.round-info-left .sizer-left {
  position:relative;
  margin-top: 0%;
  margin-left: 0%;
  display: inline-block;
  width: 30%;
  height: 100%;
}
.round-info-left .sizer-right {
  position: absolute;
  top: 0%;
  margin-left: 5%;
  display: inline-block;
  width: 60%;
  height: 100%;
}
.round-info-left .cinemaBox {
  width: 100px;
  height: 100px;
}
.round-info-left .movie-name {
  font-size:20px;
  font-weight: bold;
}
.round-info-mid .cinema-name {
  font-size: 20px;
  font-weight: bold;
}

.round-info-mid,.round-info-right {
  height: 30%;
  margin-left: 3%;
}
.round-info-right .total-label {
  font-size: 30px;
  font-weight: bold;
}
.round-info-right .enter-button {
  margin-top: 8%;
  margin-left: 27%;
  position: relative;
}

.separate-line {
  display: inline-block;
  position: relative;
  width: 1px;
  background: gray;
  height: 50%;
}

.pos1 {
    margin-left: 23%;
}
.pos2 {
    margin-left: 35%;
}

</style>
