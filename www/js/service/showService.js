//入力データから結果一覧を表示するためのサービス
onsModule.factory('ShowService', function() {
    //テストデータ
    return {
      //ポイントリストから表示用の結果配列を作る
      getPointList: function(plList,pointList) {
        var showList = [];
        showList.push(plList);//1行目にプレイヤーリストを格納

        for (var i=0, lenI=pointList.length; i<lenI; ++i) {
          var inputList = [];
          var tmpPtList = pointList[i];
            for (var j=0, lenJ=plList.length; j<lenJ; ++j) {
              var player = plList[j];
              var point = tmpPtList[player];
              if (point == null) {
                point = "--";
              }
              inputList.push(point);
            }
          showList.push(inputList);//代入
        }
       
        return showList;
      }
    }    
  })