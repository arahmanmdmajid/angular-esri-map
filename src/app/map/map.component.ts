import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy
} from '@angular/core';

import { MapControllerService } from '../map-controller.service';

import Map from "@arcgis/core/Map";
import WebMap from '@arcgis/core/WebMap';
import MapView from '@arcgis/core/views/MapView';
import Bookmarks from '@arcgis/core/widgets/Bookmarks';
import Expand from '@arcgis/core/widgets/Expand';
import esriConfig from '@arcgis/core/config';
import Graphic from '@arcgis/core/Graphic';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import * as urlUtils from '@arcgis/core/core/urlUtils';
import ScaleBar from '@arcgis/core/widgets/ScaleBar';
import Legent from '@arcgis/core/widgets/Legend';
import LayerList from '@arcgis/core/widgets/LayerList';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, OnDestroy {
  public view: any = null;

  
    // The <div> where we will place the map
  @ViewChild('mapViewNode', { static: true }) private mapViewEl: ElementRef;

  initializeMap(): Promise<any> {

    urlUtils.addProxyRule({
      urlPrefix: "https://webmap.mrda.gov.sa:6443/arcgis/rest/services/Public/MakkahGovernorates/MapServer",
      proxyUrl: "https://maps.mrda.gov.sa/Proxy/proxy.ashx"
    });

    esriConfig.apiKey = "AAPKc5486a5477b646fca5fbfc34c04a89b2FhoO1r_84yJoxcdgs3zryRSOfyQ45cv_LEr4aFPRd1CMUCUxWBFW9nduux50pMf7";
    const container = this.mapViewEl.nativeElement;


    const map = new Map({
      basemap: "arcgis-topographic"
    });

    const webmap = new WebMap({
      portalItem: {
        id: 'aa1d3f80270146208328cf66d022e09c',
      },
    });

    const view = new MapView({
      container,
      map: map,
      center: [40.46, 21.423], // Longitude, latitude
      zoom: 8
    });

    const bookmarks = new Bookmarks({
      view,
      // allows bookmarks to be added, edited, or deleted
      editingEnabled: true,
    });

    const layerList = new LayerList({
      view:view
    });

    const saclebar = new ScaleBar({
      view: view,
      unit: "dual"
    });

    const lyExpand = new Expand({
      view,
      content: layerList,
      expanded: false,
    })


    const bkExpand = new Expand({
      view,
      content: bookmarks,
      expanded: false,
    });

    // Add the widget to the top-right corner of the view
    view.ui.add(lyExpand, 'top-left');
    // view.ui.add(bkExpand, 'top-left');
    view.ui.add(saclebar, "bottom-right");
    


    // bonus - how many bookmarks in the webmap?
    webmap.when(() => {
      if (webmap.bookmarks && webmap.bookmarks.length) {
        console.log('Bookmarks: ', webmap.bookmarks.length);
      } else {
        console.log('No bookmarks in this webmap.');
      }
    });


    const MakkahGovernorates = new FeatureLayer({url:"https://webmap.mrda.gov.sa:6443/arcgis/rest/services/Public/MakkahGovernorates/MapServer",
      title: "حدود المحافظات مكة",
      outFields: ["Name_Arabic", "Population", "Shape_Area"],
      popupTemplate: {
        title: "حدود المحافظات", 
        content:"<b>Name:</b> {Name_Arabic}<br><b>سكان:</b> {Population}<br><b>مساحة الارض (sq.km):</b> {Shape_Area}<br>"
      }
    });
    map.add(MakkahGovernorates);

    this.view = view;
    return this.view.when();
  }
  
  ngOnInit(): any {
    // Initialize MapView and return an instance of MapView
    this.initializeMap().then(() => {
      // The map has been initialized
        console.log('The map is ready.');
    });
  }

  ngOnDestroy(): void {
    if (this.view) {
      // destroy the map view
      this.view.destroy();
    }
  }
}

