//データ保持用のサービス
onsModule.factory('ShareDataService', function() {
  var plList = ["プレイヤー1","プレイヤー2","プレイヤー3","プレイヤー4","プレイヤー5"];
  var pointList = [];

  return {
    //プレイヤー一覧を返す
    getPlList: function() {
      return plList;
    },

    //ポイント一覧を返す
    getPtList: function() {
      return pointList;
    },
    
    //点棒一覧とプレイヤー選択から得点リストを作成する
    createPointList: function(resultList,selectPlayerList) {
      var thisGamePointList = {};
      for(var i=0; i < resultList.length; i++) {
        thisGamePointList[selectPlayerList[i]] = resultList[i];//順番にキー：プレイヤー名、値：ポイントを格納
      }
      pointList.push(thisGamePointList);
      console.log(pointList);
    },

    //プレイヤー名を更新し、結果コードを返す(0:Success, -1:Fail)
    changeNameData: function(index,name) {
      if (plList.indexOf(name) == -1) {
        //既に登録済の名前でないかチェックし更新
        plList[index] = name;
        return 0;
      } else {
        //重複名の場合エラーコードとして-1を返す
        return -1;
      }
    }
  }
})