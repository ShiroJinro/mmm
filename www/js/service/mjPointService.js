//点棒データを入力し、ポイント計算するためのサービス
onsModule.factory('MjPointService', function() {
  return {
    //点棒リストからポイントリストを返す(点棒リスト,ウマ,返し点)
    getMjPoint: function(handPtList,umaPtList,returnPt) {
      console.log("Call MjPointService.getMjPoint()");
      var sorted = handPtList.slice().sort(function(a, b) {return b - a});//持ち点を昇順に並び替え
      var ranks = handPtList.slice().map(function(x){return sorted.indexOf(x) + 1});//順位リストを作成
      var pointMjList = [];//
      for(var i=0;i<4;i++) {
        var rank = ranks[i];//順位
        var uma = umaPtList[rank - 1];//順位ウマ
        var mjPoint;//最終ポイント
        if(rank == 1) {
          //1位の場合はオカを加える
          mjPoint = ((handPtList[i] - returnPt) / 10) + uma + 20;//最終ポイント
        } else {
          mjPoint = ((handPtList[i] - returnPt) / 10) + uma;//最終ポイント
        }
        pointMjList.push(mjPoint);//最終ポイントをリストに格納
      }
      console.log(pointMjList);
      return pointMjList;
      },

      //プレイヤー選択の重複チェック(true:重複あり)
      checkPlayerValid: function(selectPlList) {
        var validFlag = false;

        for(var i=0; i < (selectPlList.length - 1); i++) {
          for(var j=i+1; j < selectPlList.length; j++) {
            if(selectPlList[i] === selectPlList[j]){
                //i人目とj人目が同じなら重複フラグをtrue
                validFlag = true;
            }
          }
          if(validFlag) {
            return validFlag;
          }
        }
        return validFlag;
      }
    }
})