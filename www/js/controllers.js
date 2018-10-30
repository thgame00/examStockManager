angular.module('app.controllers', [])
  
.controller('stockPortfolioCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
	$scope.mdl = {};

}])
   



.controller('stockCtrl', ['$scope', '$stateParams', '$http',

function ($scope, $stateParams, $http) {
	//api key: 8X8LEJJ0743ZK6TC
	
	apikey = '8X8LEJJ0743ZK6TC';
	
	stock = $stateParams.stock;
	
	if(stock == 1)symbol = "AAPL";
	else if(stock == 2)symbol = "GE";
	else if(stock == 3)symbol = "SBUX";
	else if(stock == 4)symbol = "WBA";

	url = "https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + symbol + "&apikey=" + apikey;

	$http.get(url).then(function(response) {

		$scope.symbol = response.data["Global Quote"]["01. symbol"];
		$scope.currentPrice = response.data["Global Quote"]["05. price"];
		$scope.date = response.data["Global Quote"]["07. latest trading day"];		
		$scope.trend = response.data["Global Quote"]["09. change"];
		//decide keep or sell (sell must be red)
		if($scope.trend > 0) {
			$scope.decision = "Keep!";
			$scope.colour = "#000000";
		}
		else {
			$scope.decision = "Sell!";
			$scope.colour = "#FF0000";
		}

	}, function(error) {
		alert("unable to retrieve data");
	});
}])
 