'use strict';

angular.module('mycontact.contact', ['ngRoute','firebase'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/contact', {
    templateUrl: 'contact/contact.html',
    controller:'contactCtrl'
  });
}])

.controller('contactCtrl', ["$scope","$firebaseArray",function($scope,
	$firebaseArray) {

	var ref=firebase.database().ref().child('angular');
	$scope.contacts=$firebaseArray(ref);
	$scope.showAddForm=function()
	{
		$scope.addFormShow=true;
		$scope.msgShow=false;
		clearFields();
	}
	$scope.hideForm=function()
	{
		
		$scope.addFormShow=false;
		$scope.contactShow=false;
		clearFields();
		
	}
	
	$scope.addFormSubmit=function()
	{

		if($scope.name)
			var name=$scope.name;
		else
			var name=null;


		if($scope.company)
			var company=$scope.company;
		else
			var  company=null;


		if($scope.email)
			var email=$scope.email;
		else
			var email=null;


		if($scope.phone)
			var phone=$scope.phone;
		else
			var phone=null;

		$scope.contacts.$add({
			name:name,
			company:company,
			email:email,
			phone:phone
		})
		.then(function(ref)
		{
			
			$scope.addFormShow=false;
			$scope.msg="Contact Added!"
			$scope.msgShow=true;
			clearFields();
		})

		
	}

	$scope.showContact=function(contact)
	{
		$scope.contactShow=true;
		$scope.name=contact.name;
		$scope.email=contact.email;
		$scope.company=contact.company;
		$scope.phone=contact.phone;
	}

	function clearFields()
	{
		$scope.name='';
		$scope.email='';
		$scope.company='';
		$scope.phone='';
	}
		
$scope.showEditForm=function(contact)
{
	$scope.msgShow=false;
	$scope.editFormShow=true;
	$scope.id=contact.$id;
	$scope.name=contact.name;
	$scope.email=contact.email;
	$scope.company=contact.company;
	$scope.phone=contact.phone;
}

$scope.editFormSubmit=function()
{
	var id=$scope.id;
	
	var record=$scope.contacts.$getRecord(id);
	
	record.name=$scope.name;
	record.email=$scope.email;
	record.company=$scope.company;
	record.phone=$scope.phone;
	$scope.contacts.$save(record);
	clearFields();
	$scope.editFormShow=false;
	$scope.msg="Updated Contact!";
	$scope.msgShow=true;

}
$scope.removeContact=function(contact)
{
	$scope.contacts.$remove(contact);
	$scope.msg="Deleted Contact!";
	$scope.msgShow=true;

}

}]);