$(function(){
	chrome.storage.sync.get(['total','limit'], function(budget){
		$('#total').text(budget.total);
		$('#limit').text(budget.limit);
	})
	
	$('#spendAmount').click(function(){
		chrome.storage.sync.get(['total','limit'], function(budget){
		var newTotal=0;
		if (budget.total){
			newtotal+=parseInt(budget.total);
		}
		var amount =$('#amount').val();
		if (amount)
		{ newTotal+=parseInt(amount);
		}
		
		chrome.storage.sync.set({'total': newTotal},function(){
		if (amount && newtotal >=budget.limit){
			var notifications={
				type:'basic',
				iconUrl:'icon48.png',
				title:'Limit reached',
				message:"Uh oh ! Looks Like you've reached your Limit!"
				
			};
			chrome.notification.create('limitNotif',notifOption);
		}
		});
		$('#total').text(newTotal);
		$('#amount').val('');
	});
	});
});