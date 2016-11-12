function selPref(obj,prefVar)
{
	var url,http;
    
    if (prefVar=='orderBy') 
    {
    url="pluginTools/saveSettingPreference.php?who=chutiya&orderBy="+obj.value+"&switch=1";	
    }
    else if (prefVar=='ascDescOrder')
    {
   	 url="pluginTools/saveSettingPreference.php?who=chutiya&orderBy="+obj.value+"&switch=2";	
    }
    http=new XMLHttpRequest();
    http.open("GET",url);
    http.send();	 	
}