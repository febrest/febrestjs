(function () {

    /**
     * @description
     * providers
     * 
     */

    var providers = [
        {
            name:'lottery',
            defaultValue:0
        },
    ];

    var constants = {
        ADD_LOTTERY:'ADD_LOTTERY',
        GET_LOTTERY:'GET_LOTTERY'
    }

    var controllers = {
        addLottery(lottery){
            lottery++;
            return {lottery}
        },
        getLottery(lottery){
            return {lottery}
        },
        roll(){

        }
    }

    var actions = [
        {
            key:constants.ADD_LOTTERY,
            controller:controllers.addLottery,
            persist:{lottery:'lottery'}
        },
        {
            key:constants.GET_LOTTERY,
            controller:controllers.getLottery,
        }
    ];

    FebRest.createActions(actions);
    FebRest.injectProvider(providers);

    function randInt() {
        return parseInt(Math.random() * 10);
    }
    function getStopAnimateByValue(value) {
        return 'stop_animate_' + value;
    }
    function startRoll() {
        var rolls = document.getElementsByClassName('roll');
        rolls[0].className = 'roll animate';
        rolls[1].className = 'roll animate';
        rolls[2].className = 'roll animate';
        setTimeout(stopRoll, 5000)
    }
    function stopRoll() {
        var rolls = document.getElementsByClassName('roll');
        var values = [randInt(), randInt(), randInt()];
        rolls[0].className = 'roll ' + getStopAnimateByValue(values[0]);
        rolls[1].className = 'roll ' + getStopAnimateByValue(values[1]);
        rolls[2].className = 'roll ' + getStopAnimateByValue(values[2]);
    }

    function onClick(e) {
        if (e.target.attributes.fbclick) {
            return eval(e.target.attributes.fbclick.value);
        }
    }
    function updateLotteryCount(data){
        console.log(data)
        document.getElementsByClassName('lottery_count')[0].innerHTML = '奖券数量:'+data.lottery;
    }
   
    function lotterySelfAdd(){
        FebRest.dispatch(constants.ADD_LOTTERY);
        setTimeout(lotterySelfAdd,1000);
    }
    FebRest.watch('lottery',updateLotteryCount);
    lotterySelfAdd();
    document.body.addEventListener('click', onClick, false);


})()