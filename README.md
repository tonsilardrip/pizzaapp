# Pizza App 
![alt tag](http://www.clipartbest.com/cliparts/9c4/enq/9c4enqayi.png)

## What it's suppose to do.
In this assignment we are suppose to make use of the services and factory methods to make a local storage. 
All this app does is lets you choose a crust and topping from a predefined list. 
Once you have created a pizza the app will store what you have choosen in the browser.
You also have the ability to delete the updated record and create another one.
There is no amount to how many pizzas you can make. 

###### Start making your pizzas now!

Here is an example of a factory
```
myModule.factory("LocalStorageService", function($window, $rootScope) {
    
    angular.element($window).on('storage', function(event) {
        if (event.key === 'pizza-storage') {
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
```


Here is an example of a Service
```
myModule.controller("MainController", ['$scope', 'LocalStorageService', 
                function($scope, LocalStorageService) {
```