angular.module('main').controller('dataCtrl', ['dataFactory', function(dataFactory, $timeout){

    var promise = dataFactory.getPets();

    promise.then(function(value){
        this.pets = value;

        this.pets = dataFactory.createTable(this.pets);
    }.bind(this));

    angular.forEach(this.pets, function (value) {
        value.deg = Math.round(Math.random() * (-5 -5) + 5);
    });
}]);