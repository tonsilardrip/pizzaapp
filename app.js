var myModule = angular.module('local_storage_app', []);

myModule.controller("MainController", ['$scope', 'LocalStorageService', 
                function($scope, LocalStorageService) {
    
  var mc = this;
	
	mc.crusters = ['Deep Dish', 'Grilled', 'Cast Iron','Thick', 'Thin','Flatbread'];
	
	mc.deliciousTopping = ['Pepperoni', 'Mushroom', 'Onions', 'Sausage', 'Bacon', 'Extra Cheese', 'Black Olives', 'Green Peppers', 'Pineapples', 'Spinach'];
	
	mc.crust = "";
	mc.firstTopping = "";
	mc.secondTopping = "";
	mc.thirdTopping = "";
	mc.background = "emphasis";
	mc.pizzas = [];

	mc.emphasis = function (status, $event){
		
		var el = $event.target.id;
		
		if(status){
			console.log("enter: " + el);
			mc.background = "emphasis";
			console.log(mc.background);
		} else {
			console.log("exit: " + el);		
			mc.background = "deemphasis";
			console.log(mc.background);
		}
	}
	
	mc.remove = function($index){

		mc.pizzs = mc.latestData();
		mc.pizzas.splice($index, 1);
		return LocalStorageService.setData('my-storage', angular.toJson(mc.pizzas));		
		
	};
    
    mc.latestData = function() {
        return LocalStorageService.getData('my-storage');
    };
	
    mc.update = function(c, fTopping, sTopping, tTopping) {
		mc.pizzs = mc.latestData();
		if(mc.pizzas == null){
			mc.pizzas = [];
		}
		var pizza = { crust: c, firstTopping: fTopping, secondTopping: sTopping, thridTopping: tTopping};
		console.log(angular.toJson(pizza));
		mc.pizzas.push(pizza);
        return LocalStorageService.setData('my-storage', angular.toJson(mc.pizzas));
    };

    //Check to see if null
	if(mc.pizzas != null){
		mc.pizzas = mc.latestData();
	}else{
		console.log("crikey");
	}
}]);

myModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'my-storage') {
            $rootScope.$apply();
        }
    });    
    
    return {
        setData: function(key, val) {
			
            $window.localStorage && $window.localStorage.setItem(key, val);
            return this;
        },
        getData: function(key) {
            
            var val = $window.localStorage && $window.localStorage.getItem(key);
            
            var data = angular.fromJson(val);
            
            return data; 
        }
    };
});