//angular module(onsenUI)の定義
var onsModule = ons.bootstrap(['onsen'])

//点棒入力ページのコントローラー
onsModule.controller('InputCtrl', function(MjPointService,ShareDataService) {
    //点棒の初期入力値設定
    this.point1 = 250;
    this.point2 = 250;
    this.point3 = 250;
    this.point4 = 250;

    var players = ShareDataService.getPlList();//プレイヤーリスト
    this.players = players;//
    
    //プレイヤー入力の初期入力値設定
    this.select1 = players[0];
    this.select2 = players[1];
    this.select3 = players[2];
    this.select4 = players[4];

    var firstPt = 250;//持ち点
    var returnPt = 300;//返し点
    var handPtList = [];//持ち点のリスト
    var umaPtList = [30,10,-10,-30];
    
    //点棒入力完了ボタン押下時
    this.inputFinish = function() {
      handPtList = [];//持ち点リストの初期化
      var selectPlList = [this.select1,this.select2,this.select3,this.select4];//選択したプレイヤーのリスト

      //入力した点棒合計がsumPtと一致しているかチェック
      if ((this.point1 + this.point2 + this.point3 + this.point4) == (firstPt*4)) {
        if(MjPointService.checkPlayerValid(selectPlList)) {
          //プレイヤーの重複チェック
          ons.notification.alert({
            message: '同じプレイヤーが選択されています',
            title: 'エラーだよ'
          });
        } else {
          //持ち点の配列に入力値を格納
          handPtList.push(this.point1);
          handPtList.push(this.point2);
          handPtList.push(this.point3);
          handPtList.push(this.point4);
          var resultList = MjPointService.getMjPoint(handPtList,umaPtList,returnPt);//持ち点からPtを計算
          if (resultList == null) {
            //nullの場合は同点あり
            ons.notification.alert({
              message: '同点のプレイヤーがいます',
              title: 'エラーだよ'
            });
          } else {
            ShareDataService.createPointList(resultList,selectPlList);//保存データに結果表示用のPtリストを保存する
            mainNavigator.pushPage('page/resultList.html');
          }
        }
      } else {
        ons.notification.alert({
          message: '合計を10万点で入力してください',
          title: 'エラーだよ'
        });
      }
    }

    //トップへ戻るボタン
    this.back = function(){
      mainNavigator.popPage();
    };

    this.playerSetting = function() {
      mainNavigator.pushPage('page/playerSetting.html');//プレイヤー設定画面に遷移
    }
  })
  
  //トップページのコントローラー
onsModule.controller('topCtrl', function() {
    this.gameStart = function(){
        mainNavigator.pushPage('page/resultList.html');//集計画面に遷移
    }
  })
  
  //集計画面のコントローラー
onsModule.controller('ResultCtrl', function(ShowService,ShareDataService) {

    var firstPt = 250;//持ち点
    var returnPt = 300;//返し点
    var umaPtList = [30,10,-10,-30];//ウマ

    this.firstPt = firstPt;//Viewへバインド
    this.returnPt = returnPt;//Viewへバインド
    this.umaPtList = umaPtList;//Viewへバインド

    //shareDataサービスから保持しているデータを取ってくる
    var plList = ShareDataService.getPlList();
    var pointList = ShareDataService.getPtList();

    this.testList = ShowService.getPointList(plList,pointList);//表示用データを作成し、Viewへバインド

    this.pointInput = function(){
      mainNavigator.pushPage('page/pointInput.html');//点棒入力画面に遷移
    }

    this.playerSetting = function() {
      mainNavigator.pushPage('page/playerSetting.html');//プレイヤー設定画面に遷移
    }
  })

  //プレイヤー設定画面のコントローラー
  onsModule.controller('SetPlayerCtrl', function(ShareDataService) {
    //集計一覧画面へ
    this.backTop = function(){
      mainNavigator.pushPage('page/resultList.html');
    };

    var players = ShareDataService.getPlList();//プレイヤーリスト
    this.players = players;//Viewへバインド

    this.changeName = function(nowName,indexNumber) {
      mainNavigator.pushPage('page/playerSettingDetail.html',
      {data: {index: indexNumber,
              name: nowName}});
    };
  })

    //プレイヤー設定詳細画面のコントローラー
  onsModule.controller('PlayerDetailCtrl', function($scope,ShareDataService) {
    this.back = function(){
      mainNavigator.popPage();
    };
    this.playerData = $scope.mainNavigator.topPage.data;//前画面で選択したプレイヤー情報を引き継ぐ(index,name)
    
    //入力した情報でプレイヤー名を更新する
    this.changeNameComplete = function(index) {
      var newName = this.newName;
      if (newName == null) {
        ons.notification.alert({
          message: '変更後のプレイヤー名を入力してください',
          title: 'エラーだよ'
        });
      } else {
        var resultCode = ShareDataService.changeNameData(index,newName);//保持データのプレイヤー名を更新
        if (resultCode == -1) {
          //重複エラーの場合
          ons.notification.alert({
          message: '既に登録済のプレイヤー名です',
          title: 'エラーだよ'
        });
        } else {
          mainNavigator.pushPage('page/playerSetting.html');
        }
      }
    }
  })

  ;//コントローラーClose

  //アプリ起動時に初めに呼ばれる関数
  ons.ready(function() {
    console.log("Application is ready!");
  });

  //iPhoneXの場合の画面調整
  if (ons.platform.isIPhoneX()) {
    document.documentElement.setAttribute('onsflag-iphonex-portrait', '');
    document.documentElement.setAttribute('onsflag-iphonex-landscape', '');
  }