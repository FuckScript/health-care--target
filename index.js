let markerList = []
let popup = new mapboxgl.Popup({ closeButton: false, });

const nameList = [
  "shenzhen",
  "baoan",
  "dapeng",
  "futian",
  "guangming",
  "longgang",
  "longhua",
  "luohu",
  "nanshan",
  "pingshan",
  "yantian",
];
let dataMap = {
  shenzhen,
  baoan,
  dapeng,
  futian,
  guangming,
  longgang,
  longhua,
  luohu,
  nanshan,
  pingshan,
  yantian,
};
let currentLayerName = 'shenzhen'
const currentArea = document.getElementById('current-area')
const areaMap = {
  "shenzhen": '深圳',
  "baoan": '宝安',
  "dapeng": '大鹏',
  "futian": '福田',
  "guangming": '光明',
  "longgang": '龙岗',
  "longhua": '龙华',
  "luohu": '罗湖',
  "nanshan": '南山',
  "pingshan": '坪山',
  "yantian": '盐田',
}

let vecUrl = "http://t0.tianditu.com/vec_w/wmts?tk=43c28dc109e34f25445bfe9fef5124dc";
let cvaUrl = "http://t0.tianditu.com/cva_w/wmts?tk=43c28dc109e34f25445bfe9fef5124dc";
let tdtCva = {
  //类型为栅格瓦片
  "type": "raster",
  //请求瓦片地址
  'tiles': [
    cvaUrl + "&SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=w&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}&FORMAT=tiles"
  ],
  //分辨率
  'tileSize': 256
};

mapboxgl.accessToken =
  "pk.eyJ1IjoiY2hlbmppYWRvbmciLCJhIjoiY2t2bHIxNmJyZGgybjJ3cTZkM3FhMW5tZSJ9.i_ItmzVYbYrHLg43CDyZdw";
let map = new mapboxgl.Map({
  container: "map",
  // style: "mapbox://styles/chenjiadong/clfqklj9u000001qou13mh90a",
  doubleClickZoom: false,
  style: {
    //设置版本号，一定要设置
    "version": 8,
    "glyphs": "mapbox://fonts/mapbox/{fontstack}/{range}.pbf",
    //添加来源
    "sources": {
      "tianditu": {
        type: 'raster',
        tiles: [
          'https://t0.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=2d8eca459ee67a4b8d1f281791d4f09f',
          'https://t1.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=2d8eca459ee67a4b8d1f281791d4f09f',
          'https://t2.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=2d8eca459ee67a4b8d1f281791d4f09f',
          'https://t4.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=2d8eca459ee67a4b8d1f281791d4f09f',
          'https://t5.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=2d8eca459ee67a4b8d1f281791d4f09f',
          'https://t6.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=2d8eca459ee67a4b8d1f281791d4f09f',
          'https://t3.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=2d8eca459ee67a4b8d1f281791d4f09f ',
          'https://t7.tianditu.gov.cn/img_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=img&STYLE=default&TILEMATRIXSET=w&FORMAT=tiles&TILECOL={x}&TILEROW={y}&TILEMATRIX={z}&tk=2d8eca459ee67a4b8d1f281791d4f09f',
        ],
        tileSize: 256,
      },
      "tdtCva": tdtCva
    },
    "layers": [
      {
        id: 'tianditu',
        type: 'raster',
        source: 'tianditu',
        // minzoom: 6,
        // maxzoom: 18,
        layout: {
          // visibility: 'none',
        },
      },
      // {
      //   //图层id，要保证唯一性
      //   "id": "tdtVec",
      //   //图层类型
      //   "type": "raster",
      //   //数据源
      //   "source": "tdtCva",
      //   //图层最小缩放级数
      //   "minzoom": 0,
      //   //图层最大缩放级数
      //   "maxzoom": 17
      // },
      // {
      //   "id": "tdtCva",
      //   "type": "raster",
      //   "source": "tdtCva",
      //   "minzoom": 0,
      //   "maxzoom": 17
      // }
    ]
  },
  center: [114.07798699999998, 22.52946899999999],
  zoom: 9.5,
});
function addImgSource ()
{
  const pngNames = ["yiyuan"];
  let loadedCount = 0;
  return new Promise((resolve, reject) =>
  {
    pngNames.map((imgName) =>
    {
      const imgSrc = `./${imgName}.png`;
      map.loadImage(imgSrc, (error, image) =>
      {
        if (error) throw error;
        try {
          if (!map.hasImage(imgName)) {
            map.addImage(imgName, image);
          }
        } catch (err) {
          console.log(err, "imageLoadFailed:", imgName);
        }
        loadedCount++;
        if (loadedCount === pngNames.length) {
          resolve();
        }
      });
    });
  });
  /*  const imgSrc = `/yiyuan.png`;
   map.loadImage(imgSrc, (error, image) =>
   {
     if (error) throw error;
     if (!map.hasImage('yiyuan')) map.addImage('yiyuan', image);
   }); */
}
function changeArea (name)
{
  currentArea.innerHTML = areaMap[name]
  if (markerList !== null) {
    for (let i = markerList.length - 1; i >= 0; i--) {
      markerList[i].remove();
    }
  }
  map.setLayoutProperty(currentLayerName, "visibility", "none");
  map.setLayoutProperty(currentLayerName + 'label', "visibility", "none");
  map.setLayoutProperty(name, "visibility", "visible");
  map.setLayoutProperty(name + 'label', "visibility", "visible");
  currentLayerName = name
  addMaker(dataMap[name])
  // if (currentLayerName !== 'shenzhen') {
  //   map.setLayoutProperty('hospital', "visibility", "none");
  //   return
  // }
  // map.setLayoutProperty('hospital', "visibility", "visible");
}
function addMaker (markerData)
{
  if (markerList !== null) {
    for (let i = markerList.length - 1; i >= 0; i--) {
      markerList[i].remove();
    }
  }
  markerData.features.forEach((marker) =>
  {
    // create a DOM element for the marker
    let el = document.createElement("div");
    el.className = "my-marker";
    el.style.color = "#fff";
    el.style.fontSize = "20px";

    const div1 = document.createElement("div");
    div1.className = "text";
    div1.innerText =
      marker.properties.nums +
      `人
      `;
    // , ${marker.properties.percentage || 0}%
    el.appendChild(div1);

    const div2 = document.createElement("div");
    div2.className = "img";
    div2.style.backgroundImage = `url(./maker.png)`;
    el.appendChild(div2);
    el.pitchAlignment = "viewport";
    const mapMaker = new mapboxgl.Marker(el)
      .setLngLat(marker.properties.center)
      .addTo(map);
    markerList.push(mapMaker);
    let center = currentLayerName === 'shenzhen' ? [114.07798699999998, 22.52946899999999] : marker.properties.center
    map.flyTo({
      center,
      zoom: currentLayerName === 'shenzhen' ? 9.5 : 11.5,
      speed: 0.6,
      curve: 1,
      /* easing (t)
      {
        return t;
      } */
    })


    // map.setZoom(currentLayerName === 'shenzhen' ? 9 : 10)
  });

}
function hospitalInfoPop (e)
{
  const { properties } = e.features[0];
  const { name, level, hospitalName, id } = properties;
  const content = `<div class="c-popup">
  <div class="t1">${name || hospitalName
    }</div>
  </div>`;
  popup.setLngLat(e.lngLat).setHTML(content).addTo(map);
}

function addLayers ()
{
  for (let index = 0; index < nameList.length; index++) {
    const adName = nameList[index];
    map.addSource(adName, { type: "geojson", data: dataMap[adName] });
    /*  map.addLayer({
       id: adName,
       type: "fill",
       source: adName,
       layout: {},
       paint: {
         "fill-outline-color": "#fff",
         "fill-color":
           "#0" +
           parseInt(Math.random() * 10) +
           parseInt(Math.random() * 10),
         "fill-opacity": 0.8,
       },
     }); */
    map.addLayer({
      id: adName,
      type: 'line',
      source: adName,
      layout: {
        "visibility": 'none',
      },
      paint: {
        'line-color': '#ffa530',
        'line-width': 2,
      },
    });
    map.addLayer({
      id: adName + "label",
      type: "symbol",
      source: adName,
      layout: {
        "text-field": ["get", "name"],
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.6],
        "text-anchor": "top",
        "visibility": 'none',
      },
      paint: {
        "text-color": "#fff",
        // "text-halo-color": "rgba(0,0,0,.9)",
        "text-halo-width": 1,
        "text-halo-blur": 1,
      },
    });

    map.on("click", adName, (e) =>
    {
      const feature = e.features[0];
      let coordinates = null;
      if (true) {
        // coordinates = feature.geometry.coordinates.flat(1)
        feature.properties = Object.assign(feature.properties, {
          center: [e.lngLat.lng, e.lngLat.lat],
          nums: 0,
          percentage: 0,
        });
      } else {
        coordinates = feature.geometry.coordinates;

        let polygon = turf.polygon(feature.geometry.coordinates);
        let centroid = turf.centroid(polygon);
        feature.properties = Object.assign(feature.properties, {
          center: centroid.geometry.coordinates,
          nums: 0,
          percentage: 0,
        });
      }

      console.log(
        `  "properties": ${JSON.stringify(feature.properties)}}, `
      );
    });
    map.addLayer({
      id: adName + "symbol",
      type: "symbol",
      source: adName,
      layout: {
        "text-field": "{Name}",
      },
    });
  }
  map.addSource('hospital', { type: "geojson", data: hospital });

  map.addLayer({
    id: "hospital",
    source: "hospital",
    type: "symbol",
    paint: {
      // "text-color": "red",
    },
    layout: {
      visibility: "none",
      "icon-image": "yiyuan",
      // "icon-size": 0.5,
    },
    // minzoom: 10,
  },);
  map.on("click", "hospital", hospitalInfoPop);

}

map.on("load", function ()
{
  addLayers()
  currentArea.innerHTML = '深圳'
  addMaker(shenzhen)
  map.setLayoutProperty(currentLayerName, "visibility", "visible");
  map.setLayoutProperty(currentLayerName + 'label', "visibility", "visible");
  addImgSource().then(() =>
  {
    map.setLayoutProperty('hospital', "visibility", "visible");
  })

});


