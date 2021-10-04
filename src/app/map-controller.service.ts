import { Injectable } from '@angular/core';
import * as urlUtils from '@arcgis/core/core/urlUtils';

@Injectable({
  providedIn: 'root'
})
export class MapControllerService {
  addrule(){
    urlUtils.addProxyRule({		
      urlPrefix: "https://webmap.mrda.gov.sa:6443/arcgis/rest/services/Aqleemi/%D8%A7%D9%84%D8%AA%D8%AC%D9%85%D8%B9%D8%A7%D8%AA_%D8%A7%D9%84%D8%B9%D9%85%D8%B1%D8%A7%D9%86%D9%8A%D8%A9_%D8%A8%D9%85%D9%86%D8%B7%D9%82%D8%A9_%D9%85%D9%83%D8%A9_%D8%A7%D9%84%D9%85%D9%83%D8%B1%D9%85%D8%A9_1431/MapServer",
      proxyUrl: "http://maps.mrda.gov.sa/Proxy/proxy.ashx"
    }),
    urlUtils.addProxyRule({
      urlPrefix: "https://webmap.mrda.gov.sa:6443/arcgis/rest/services/Public/MakkahGovernorates/MapServer",
      proxyUrl: "https://maps.mrda.gov.sa/Proxy/proxy.ashx"
    });
  }



  constructor(private urlutils: urlUtils ) { }
}
