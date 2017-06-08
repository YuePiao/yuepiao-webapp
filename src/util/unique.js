function getUnique(list) {
      var res = [];
      var jsona = {};
      var jsonb = {};
      for (var i = 0; i < list.length; i++) {
        if (!jsona[list[i].user_id] || !jsonb[list[i].round_id]){
          res.push(list[i]);
          jsona[list[i].user_id] = 1;
          jsonb[list[i].round_id] = 1;
        }
      }
      console.log(jsona);
      console.log(jsonb);
      return res;
}

export default getUnique;
