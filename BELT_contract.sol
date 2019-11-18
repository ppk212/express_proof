pragma solidity ^0.4.24;

contract BELT_contract
{
    enum CarClass
    {
        domestic_light,
        domestic_small,
        domestic_small_medium,
        domestic_medium,
        domestic_large,
        foreign_light,
        foreign_small,
        foreign_medium,
        foreign_large
    }
    struct Customer 
    {
        string name; //고객이름
        uint birth; // 생년월일
        uint insur_date; //보험가입날짜
        uint recent_pay_day; //최근 보험금 결제 날짜
        uint violation_count;// 법규위반경력
        uint accident_count;// 사고경력
        uint total_insurance;//보험 총액 1 Klay당 100
        CarType car;//차종(구조체)
    }
    
    struct CarType
    {
        string car_name;//차 번호
        uint car_price;//차량 가액
        CarClass car_class;// 차 종류
        uint car_cc;// 차배기량
        uint model_year;//연식
        Driving_score d_score; // 운전 점수
        uint isSetted;
    }
    
    struct Driving_score 
    {
        uint total_score; // 총 운전 점수 (아래 4개의 평균치)
        uint speeding_rate; // 과속 점수
        uint sharp_turn_rate; // 급회전 점수
        uint abrupt_deceleration_rate; // 급감속 점수
        uint rapid_acceleration_rate; // 급가속 점수
    }
    
    address private owner;
    mapping(address => Customer) private customer_collection;

    address[] private customerList;
    
    uint default_insurance_fee_peb;
    
    constructor() public {
        owner = msg.sender;
        default_insurance_fee_peb = 100000000000000000; // 0.1 Klay
    }
    
    function createMember(address _customer, string _name, uint _birth) {
        customer_collection[_customer].name = _name;
        customer_collection[_customer].birth = _birth;
        customer_collection[_customer].recent_pay_day = 0;
        customer_collection[_customer].accident_count = 0;
        customer_collection[_customer].violation_count = 0;
        customer_collection[_customer].total_insurance = default_insurance_fee_peb;
    }
    
    function deposit() public payable {  
        require(msg.sender == owner);
    }
    
    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }
    
    function payAuto(uint date) public returns (bool) {
        //여기에 날짜 추가
        uint gap = customer_collection[msg.sender].recent_pay_day - date;
        require(gap >= 100); // 한달마다 결제 20191109 20191209
        //함수 호출한 날짜와 최근 결제일과 비교하여 1달 차이가 날 경우, 결제되도록 require문 추가
        uint fee = (customer_collection[msg.sender].total_insurance * 10);
        require(this.getContractBalance() >= fee);
        msg.sender.transfer(fee);
        return true;
    }
    
    function payFirst(address _address) public payable {
        require(msg.sender == _address);
    }
    
    function getTotalInsurance (address _customer) view public returns (uint finalScore) {
        return customer_collection[_customer].total_insurance;
    }
    
    function setScore(address _customer, uint _speeding_rate, uint _sharp_turn_rate,
    uint _abrupt_deceleration_rate, uint _rapid_acceleration_rate) public {
        customer_collection[_customer].car.d_score.speeding_rate = _speeding_rate;
        customer_collection[_customer].car.d_score.sharp_turn_rate = _sharp_turn_rate;
        customer_collection[_customer].car.d_score.abrupt_deceleration_rate = _abrupt_deceleration_rate;
        customer_collection[_customer].car.d_score.rapid_acceleration_rate = _rapid_acceleration_rate;
        
        customer_collection[_customer].car.d_score.total_score = (customer_collection[_customer].car.d_score.speeding_rate
        + customer_collection[_customer].car.d_score.sharp_turn_rate
        + customer_collection[_customer].car.d_score.abrupt_deceleration_rate
        + customer_collection[_customer].car.d_score.rapid_acceleration_rate) / 4;
    }
    
    function getScore (address _customer) view public returns (uint total, uint speeding_rate, uint sharp_turn_rate,
    uint abrupt_deceleration_rate, uint rapid_acceleration_rate) {
        return(customer_collection[_customer].car.d_score.total_score,
        customer_collection[_customer].car.d_score.speeding_rate,
        customer_collection[_customer].car.d_score.sharp_turn_rate,
        customer_collection[_customer].car.d_score.abrupt_deceleration_rate,
        customer_collection[_customer].car.d_score.rapid_acceleration_rate);
    }
    
    function getBirth (address _customer) view public returns (uint _birth) {
        return customer_collection[_customer].birth;
    }
    
    function calculateInsurance (address _customer) private {
        // 보험료 계산
        // uint temp = customer_collection[_customer].total_insurance;
        uint score = customer_collection[_customer].car.d_score.total_score;
        uint ac_count = customer_collection[_customer].accident_count;
        CarClass car_type = customer_collection[_customer].car.car_class;
        uint il_count = customer_collection[_customer].violation_count;
        uint year = customer_collection[_customer].car.model_year;
        uint temp = 2019;
        uint rate = 100;
        
        // 운전 점수를 기준으로 +- 25%
        if((score - 50) != 0) {
            rate = rate * (100-(score-50)/2)/100;
        }
        
        // // 사고 이력 횟수 * 2 (3달간)
        if(ac_count != 0) {
            rate = rate * (ac_count * 2);
        }
        
        // // 차종 (경차 : 0.8, 소형 : 0.9, 준중형 : 1, 중형 : 1.1, 대형 : 1.2)
        if(car_type == CarClass.domestic_light) {
            rate = rate * 4 / 5;
        } else if(car_type == CarClass.domestic_small) {
            rate = rate * 9 / 10;
        } else if(car_type == CarClass.domestic_medium) {
            rate = rate * 11 / 10;
        } else if(car_type == CarClass.domestic_large) {
            rate = rate * 6 / 5;
        }
        
        // // 법규 위반 횟수 * 1.1 (음주 기준)
        if(il_count != 0) {
            rate = rate * (100+10*il_count) / 100;
        }
        
        // // 연식
        if((temp - year) > 5) { 
            year = temp - year - 5;
            rate = rate * (100+year) / 100;
        }
        
        customer_collection[_customer].total_insurance =  customer_collection[_customer].total_insurance * rate / 100;
    }
    
    function insure(address _customer, uint _date) public {
        require(customer_collection[_customer].insur_date == 0);
        customer_collection[_customer].insur_date = _date;
        customer_collection[_customer].recent_pay_day = _date;
        // payFirst(_customer);
        // customerList.push(_customer);
        calculateInsurance(_customer);
    }

    function createCar(address _customer, string _car_name, uint _car_price, CarClass _car_class, uint _car_cc, uint _model_year )
    {
        // customer_collection[_customer].car = CarType(_car_name, _car_price, _car_class, _car_cc, _model_year, Driving_score(0,0,0,0,0), 1);
        customer_collection[_customer].car.car_name = _car_name;
        customer_collection[_customer].car.car_price = _car_price;
        customer_collection[_customer].car.car_class = _car_class;
        customer_collection[_customer].car.car_cc = _car_cc;
        customer_collection[_customer].car.model_year = _model_year;
        customer_collection[_customer].car.isSetted = 1;
    }
    
    function getIsSetted(address _customer) view public returns (uint) {
        return customer_collection[_customer].car.isSetted;
    }
    
    function getInsuranceInfo(address _customer) view public returns (uint finalScore, uint accident_count, uint insur_date, uint _recent_pay_day, 
    uint violation_count, CarClass car, uint model_year){
        
        return(customer_collection[_customer].total_insurance, 
        customer_collection[_customer].accident_count,
        customer_collection[_customer].insur_date,
        customer_collection[_customer].recent_pay_day,
        customer_collection[_customer].violation_count,
        customer_collection[_customer].car.car_class,
        customer_collection[_customer].car.model_year);
    }
    
    function getCustomerInfo(address _customer) view public returns (string name,
    uint birth, uint insur_date, uint violation_count, uint accident_count) {
        return(customer_collection[_customer].name,
               customer_collection[_customer].birth,
               customer_collection[_customer].insur_date,
               customer_collection[_customer].violation_count,
               customer_collection[_customer].accident_count);
    }
    
    function setInsureDate(address _customer, uint _insure_date)
    {
        customer_collection[_customer].insur_date = _insure_date;
    }
    
    function getCarInfo(address _customer) view public returns(string  car_name, uint car_price, CarClass car_class, uint car_cc, uint model_year)
    {
        //차량정보가 없을 시 차량정보를 반환하지 않음
        require (customer_collection[_customer].car.isSetted == 1);
        //차량정보 있을시 정보 출력
        return(customer_collection[_customer].car.car_name,
               customer_collection[_customer].car.car_price,
               customer_collection[_customer].car.car_class,
               customer_collection[_customer].car.car_cc,
               customer_collection[_customer].car.model_year);
    }
    
    function returnBalance() payable {
        require(msg.sender == owner);
        //가입자 명수 계산
        address(this).transfer(getContractBalance());
    }
}