(function() {
  /**
   * @description
   * providers
   *
   */
  function HistoryProvider(config) {
    this.name = config.name;
    this.query = function(state) {
      return state;
    };
    this.update = function(state, action, payload) {
      state.push(payload);
      return state;
    };
    this.onUpdate = function() {};
    this.onQuery = function() {};
  }
  var providers = [
    {
      name: "rollHistory",
      defaultState: [],
      type: HistoryProvider
    },
    {
      name: "lottery",
      defaultState: 0
    }
  ];

  /**
   * constants
   */
  var constants = {
    ADD_LOTTERY: "ADD_LOTTERY",
    GET_LOTTERY: "GET_LOTTERY",
    SET_ROLL_HISTORY: "SET_ROLL_HISTORY",
    ROLL: "ROLL"
  };

  /**
   * 抽奖帮助类
   */
  function randInt() {
    return parseInt(Math.random() * 10);
  }

  function getBonus(value) {
    var result = [];
    value.forEach(function(index) {
      result[index] = result[index] ? ++result[index] : 1;
    });
    result = result.reduce(function(v, nv) {
      if (nv < v) {
        return v;
      } else {
        return nv;
      }
    });
    if (result == 2) {
      return 2;
    } else if (result == 3) {
      return 1;
    } else {
      return 0;
    }
  }

  /**
   * controller
   */
  let update = Febrest.update;
  let query = Febrest.query;
  let broadcast = Febrest.broadcast;
  var controllers = {
    addLottery() {
      let data = query("lottery");
      data++;
      update("lottery", null, data);
      return { lottery: data };
    },
    getLottery() {
      let data = query("lottery");
      return { lottery: data };
    },
    roll() {
      let lottery = query("lottery");
      let rollHistory = query("rollHistory");
      if (lottery < 5) {
        return { ok: false };
      } else {
        let value = [randInt(), randInt(), randInt()];
        let bonus = getBonus(value);
        let item = {
          time: Date.now(),
          value,
          bonus
        };
        rollHistory.push(item);
        let result = {
          ok: true,
          lottery: lottery - 5,
          value,
          bonus,
          rollHistory
        };
        update("lottery", null, lottery - 5);
        update("rollHistory", "push", item);
        return result;
      }
    }
  };

  /**
   * 初始化Febrest配置，创建action和注入provider
   */
  Febrest.action(controllers);
  Febrest.provider(providers);

  /**
   * view层
   * 负责页面更新和页面交互
   */
  function getStopAnimateByValue(value) {
    return "stop_animate_" + value;
  }
  function roll() {
    Febrest.dispatch("roll").then(data => {
      if (data.ok) {
        startRoll(data);
      } else {
        alert("奖券数量不够！");
      }
    });
  }
  /**
   * @description 抽奖动画开始
   * @param {*} state
   *
   * 因为动画是css控制所以结束时间大致用了setTimeout，没做精准的判断
   */
  function startRoll(state) {
    var rolls = document.getElementsByClassName("roll");
    rolls[0].className = "roll animate";
    rolls[1].className = "roll animate";
    rolls[2].className = "roll animate";
    setTimeout(() => stopRoll(state), 5000);
  }
  /**
   * @description 抽奖动画结束
   * @param {*} state
   */
  function stopRoll(state) {
    var rolls = document.getElementsByClassName("roll");
    var values = state.value;
    rolls[0].className = "roll " + getStopAnimateByValue(values[0]);
    rolls[1].className = "roll " + getStopAnimateByValue(values[1]);
    rolls[2].className = "roll " + getStopAnimateByValue(values[2]);
    setTimeout(function() {
      if (state.bonus) {
        alert("恭喜您中奖！");
      } else {
        alert("很遗憾，没有中奖！");
      }
      updateRollHistory(state.rollHistory);
    }, 3000);
  }

  function onClick(e) {
    if (e.target.attributes.fbclick) {
      return eval(e.target.attributes.fbclick.value);
    }
  }
  /**
   * @description 更新奖券数量
   * @param {*} data
   */
  function updateLotteryCount(data) {
    if (data.lottery) {
      Febrest.dispatch("getLottery").then(data => {
        document.getElementsByClassName("lottery_count")[0].innerHTML =
          "奖券数量:" + data.lottery;
      });
    }
  }
  /**
   * @description 更新抽奖记录
   * @param {*} data
   */
  function updateRollHistory(history) {
    var ul = document.getElementsByClassName("roll_history")[0];
    ul.innerHTML = history
      .map(function(item) {
        var time = new Date(item.time).toLocaleTimeString();
        var code = item.value.toString();
        var bonus =
          item.bonus == 2 ? "二等奖" : item.bonus == "1" ? "一等奖" : "未中奖";
        return (
          "<li>" +
          "时间：" +
          time +
          " 号码：" +
          code +
          " 中奖结果：" +
          bonus +
          "</li>"
        );
      })
      .join("\r\n");
  }

  /**
   * @description 每间隔一秒自动增加一张奖券
   */
  function lotterySelfAdd() {
    Febrest.dispatch("addLottery");
    setTimeout(lotterySelfAdd, 1000);
  }
  /**
   * @description 监听action
   */
  function onData(data) {
    switch (data.key) {
      case constants.GET_LOTTERY:
        break;
    }
  }
  /**
   * @description 监听lottery privder
   */
  Febrest.watch(updateLotteryCount);
  Febrest.subscribe(onData);

  lotterySelfAdd();

  document.body.addEventListener("click", onClick, false);
})();
