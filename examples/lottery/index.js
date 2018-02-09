(function () {

    /**
     * @description
     * providers
     * 
     */

    var providers = [
        {
            name: 'lottery',
            defaultValue: 0
        },
    ];

    var constants = {
        ADD_LOTTERY: 'ADD_LOTTERY',
        GET_LOTTERY: 'GET_LOTTERY',
        ROLL: 'ROLL'
    }

    function getBonus(value){
        var result = [];
        value.forEach(function(index){
            result[index] = result[index]?++result[index]:1;
        });
        result = result.reduce(function(v,nv){
            if(nv<v){
                return v;
            }else {
                return nv;
            }
        });
        if(result==2){
            return 2
        }else if(result==3){
            return 1;
        }else {
            return 0;
        }
    }
    var controllers = {
        addLottery(lottery) {
            lottery++;
            return { lottery }
        },
        getLottery(lottery) {
            return { lottery }
        },
        roll(lottery) {
            if (lottery < 5) {
                return { ok: false }
            } else {
                let value = [randInt(), randInt(), randInt()];
                let bonus = getBonus(value);
                return { ok: true, lottery: lottery - 5, value,bonus}
            }
        }
    }

    var actions = [
        {
            key: constants.ADD_LOTTERY,
            controller: controllers.addLottery,
            persist: { lottery: 'lottery' }
        },
        {
            key: constants.GET_LOTTERY,
            controller: controllers.getLottery,
        },
        {
            key: constants.ROLL,
            controller: controllers.roll,
            persist: { lottery: 'lottery' }
        }
    ];

    FebRest.createActions(actions);
    FebRest.injectProvider(providers);

    /**
     * app
     */
    var app = { lottery: 0 }
    function randInt() {
        return parseInt(Math.random() * 10);
    }
    function getStopAnimateByValue(value) {
        return 'stop_animate_' + value;
    }
    function roll() {
        FebRest.dispatch(constants.ROLL);
    }
    function startRoll(state) {
        var rolls = document.getElementsByClassName('roll');
        rolls[0].className = 'roll animate';
        rolls[1].className = 'roll animate';
        rolls[2].className = 'roll animate';
        setTimeout(() => stopRoll(state), 5000);
    }
    function stopRoll(state) {
        var rolls = document.getElementsByClassName('roll');
        var values = state.value;
        rolls[0].className = 'roll ' + getStopAnimateByValue(values[0]);
        rolls[1].className = 'roll ' + getStopAnimateByValue(values[1]);
        rolls[2].className = 'roll ' + getStopAnimateByValue(values[2]);
        setTimeout(function(){
            if(state.bonus){
                alert('恭喜您中奖！')
            }else{
                alert('很遗憾，没有中奖！')
            }
        },3000);
    }

    function onClick(e) {
        if (e.target.attributes.fbclick) {
            return eval(e.target.attributes.fbclick.value);
        }
    }
    function updateLotteryCount(data) {
        document.getElementsByClassName('lottery_count')[0].innerHTML = '奖券数量:' + data.lottery;
    }

    function lotterySelfAdd() {
        FebRest.dispatch(constants.ADD_LOTTERY);
        setTimeout(lotterySelfAdd, 1000);
    }
    function onData(data) {
        switch (data.key) {
            case constants.ROLL:
                if (data.state.ok) {
                    startRoll(data.state);
                }else{
                    alert('奖券数量不够！')
                }
                break;
        }
    }
    FebRest.watch('lottery', updateLotteryCount);
    FebRest.subscribe(onData)

    lotterySelfAdd();

    document.body.addEventListener('click', onClick, false);


})()