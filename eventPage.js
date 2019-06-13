var contextMenuItem={
	"id":"spendMoney",
	"title":"spendMoney",
	"contexts":["selection"]
	
	
};
chrome.contextMenus.create(contextMenuItem);
function isInt(value){
	return !isNaN(value)&&
			parseInt(Number(value))==value&&
			! isNaN(parseInt(value,10));
	}
chrome.contextMenus.onClicked.addListener(function(clickData){
	if(clickData.menuItemId=="spendMoneey"&& clickData.selectionText){
		if(isInt(clickData.selectionText)){
			chrome.storage.sync.get(['total','limit'],function(budget){
				var newTotal=0;
				if(budget.total){
					newTotal+=parseInt(budget.total);
				}
				newTotal+=parseInt(clickData.selectionText);
				chrome.storage.sync.set({'total':newTotal},function(){
					if(newTotal>=budget.limit){
						var notifications={
				type:'basic',
				iconUrl:'icon48.png',
				title:'Limit reached',
				message:"Uh oh ! Looks Like you've reached your Limit!"
				
			};
			chrome.notification.create('limitNotif',notifOption);
		
					}
				});
			});
		}
		
	}
	
});