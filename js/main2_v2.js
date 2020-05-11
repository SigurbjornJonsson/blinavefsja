

var rvk_center = [-2434901.536024, 9381059.153668]

var map = new ol.Map({
    view: new ol.View({
        center: rvk_center,
        zoom: 12.5,
        // minZoom:5,
        minZoom: 9,
    }),
    controls: ol.control.defaults({ attributionOptions: { collapsible: true } }),
    target: 'js-map',
})


var OSMStandard = new ol.layer.Tile({
    source: new ol.source.OSM({
        url: 'http://{a-c}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png'
    }),
    // visible: true,
    title: 'OSMStandard',
    // attributions: 'Map Tiles &copy; ' + new Date().getFullYear()
    visible: true
})

map.addLayer(OSMStandard);
// map.getView().fit([-2444255.6721459883265197,9376680.7555828671902418,-2428368.0860126595944166,9388450.5387795995920897]);
map.getView().fit([-2450000,9376680.7555828671902418,-2428368.0860126595944166,9388450.5387795995920897]);


//Add zoom slider
var zoomslider = new ol.control.ZoomSlider();
map.addControl(zoomslider);


var BingMap =  new ol.layer.Tile({
    source: new ol.source.BingMaps({
        key: 'Aoko-RpqAoPGfi0XMSUmnvGyuvU_24JcKQWJHxK8CCtHRW-eWZkh0dBOruyEY3lX',
        imagerySet: 'AerialWithLabelsOnDemand'
    }),
    visible: false,
    opacity: 0.9
})

map.addLayer(BingMap)















///////////////////////////////////////////////////////////////////////////////////////////////////////
//Add Borgarlina - bufferzones to the map
//Default style
var blinaBuffer_style_one = new ol.style.Style({
    fill: new ol.style.Fill({
        color: [255, 0, 0, 0.5]
    }),
    stroke: new ol.style.Stroke({
        color: [0, 0, 0, 0.5],
        width: 1,
    })
})

//Color style
function blinabuffer_style_color_fill(){
    blinaBuffer.getSource().forEachFeature(function(feature){
        if (feature.get('leggur') == 6) {

            var bufferFill = new ol.style.Fill({
                color: [32, 121, 180, 0.5]
            });

            feature.setStyle(new ol.style.Style({
                fill: bufferFill,
                stroke: new ol.style.Stroke({
                    color: [0, 0, 0, 0.5],
                    width: 1,
                })
            }))
        } else if (feature.get('leggur') == 5) {
            var bufferFill = new ol.style.Fill({
                color: [228, 6, 6, 0.5]
            });
            
            feature.setStyle(new ol.style.Style({
                fill: bufferFill,
                stroke: new ol.style.Stroke({
                    color: [0, 0, 0, 0.5],
                    width: 1,
                })
            }))
            
        } else if (feature.get('leggur') == 4) {
            var bufferFill = new ol.style.Fill({
                color: [230, 65, 208, 0.5]
            });
            
            feature.setStyle(new ol.style.Style({
                fill: bufferFill,
                stroke: new ol.style.Stroke({
                    color: [0, 0, 0, 0.5],
                    width: 1,
                })
            }))
        } else if (feature.get('leggur') == 3) {
            var bufferFill = new ol.style.Fill({
                color: [5, 73, 41, 0.5]
            });
            
            feature.setStyle(new ol.style.Style({
                fill: bufferFill,
                stroke: new ol.style.Stroke({
                    color: [0, 0, 0, 0.5],
                    width: 1,
                })
            }))

        } else if (feature.get('leggur') == 2) {
            var bufferFill = new ol.style.Fill({
                color: [231, 235, 22, 0.5]
            });
            
            feature.setStyle(new ol.style.Style({
                fill: bufferFill,
                stroke: new ol.style.Stroke({
                    color: [0, 0, 0, 0.5],
                    width: 1,
                })
            }))

        } else if (feature.get('leggur') == 1) {
            var bufferFill = new ol.style.Fill({
                color: [59, 250, 161, 0.5]
            });
            
            feature.setStyle(new ol.style.Style({
                fill: bufferFill,
                stroke: new ol.style.Stroke({
                    color: [0, 0, 0, 0.5],
                    width: 1,
                })
            }))

        } else {
            feature.setStyle(new ol.style.Style({
                fill: new ol.style.Fill({
                    color: [255, 0, 0, 0]
                })
            }))
        }
    })
}

var blinaBuffer_style_color = new ol.style.Style({
    fill: blinabuffer_style_color_fill,
    stroke: new ol.style.Stroke({
        color: [0, 0, 0, 0.5],
        width: 1,
    })
})

var blinaBuffer = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: "data/blina_buffer3.geojson",
        format: new ol.format.GeoJSON()
    }),
    zIndex: 9,
    visible: false,
    title: 'BorgarlinaBuffer',
    style: blinabuffer_style_color_fill
});
// map.addLayer(blinaBuffer);

/////////////////////////////////////////////////////////////////////////////////////////





//Add Borgarlina to the map
//Simple style - one color (black)
var blina_style_one = new ol.style.Style({
    stroke: new ol.style.Stroke({
        color: [5, 73, 41, 1],
        width: 5,
    })
})

var blina = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: "data/blina_update.geojson",
        format: new ol.format.GeoJSON()
    }),
    zIndex: 10,
    visible: true,
    title: 'Borgarlina',
    style: blina_style_one
});
map.addLayer(blina);






var blina_stopp = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: "data/blina_stopp_update.geojson",
        format: new ol.format.GeoJSON()
    }),
    zIndex: 12,
    visible: true,
    title: 'BorgarlinaStopp',
    style: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
                color: [255, 255, 255, 1]
            }),
            stroke: new ol.style.Stroke({
                color: [0, 0, 0, 1],
                width: 2,
            })
        }),
    })
});
map.addLayer(blina_stopp);


var blina_stopp_labels = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: "data/blina_stopp_update.geojson",
        format: new ol.format.GeoJSON()
    }),
    zIndex: 12,
    visible: true,
    title: 'BorgarlinaStopp',
    style: blina_stopp_style_func_pos,
    declutter: true
});



map.addLayer(blina_stopp_labels);




function syna_grunnkort() {
    if (OSMStandard.getVisible() == true) {
        OSMStandard.setVisible(false);
        BingMap.setVisible(true);
        var blina_style_two = new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: [0, 0, 255, 1],
                width: 5,
            })
        });
        blina.setStyle(blina_style_two);
       
        
        // document.getElementById("skyringartakki").style.backgroundColor = "rgba(0,0,255,0.8)";
        // document.getElementById("grunnkort").style.backgroundColor = "rgba(0,0,255,0.8)";
    } else if (OSMStandard.getVisible() == false) {
        OSMStandard.setVisible(true);
        BingMap.setVisible(false);
        blina.setStyle(blina_style_one);
       
        // document.getElementById("skyringartakki").style.backgroundColor = "rgba(30, 160, 121, 1)";
        // document.getElementById("grunnkort").style.backgroundColor = "rgba(30, 160, 121, 1)";
    }
}


// var blina_stopp_labels_aerial = new ol.layer.VectorImage({
//     source: new ol.source.Vector({
//         url: "data/blina_stopp_update.geojson",
//         format: new ol.format.GeoJSON()
//     }),
//     zIndex: 12,
//     visible: false,
//     title: 'BorgarlinaStopp',
//     style: blina_stopp_style_func3,
//     declutter: true
// });


// map.addLayer(blina_stopp_labels_aerial);











//Add NM, fridlyst og karakterkort
//Karakter
var karakterkort = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: "data/karakterkort_update2.geojson",
        format: new ol.format.GeoJSON()
    }),
    zIndex: 1,
    visible: false,
    title: 'stadhaettir',
    style: karakterkort_style_color_fill
});

//Color style
function karakterkort_style_color_fill(){
    karakterkort.getSource().forEachFeature(function(feature){
        if (feature.get('id') == 1) {

            var bufferFill = new ol.style.Fill({
                color: [75, 130, 100, 0.75]
            });

            feature.setStyle(new ol.style.Style({
                fill: bufferFill,
            }))
        } else if (feature.get('id') == 2) {
            var bufferFill = new ol.style.Fill({
                color: [120, 160, 235, 0.75]
            });
            
            feature.setStyle(new ol.style.Style({
                fill: bufferFill,
            }))
            
        } else if (feature.get('id') == 3) {
            var bufferFill = new ol.style.Fill({
                color: [108, 63, 153, 0.75]
            });
            
            feature.setStyle(new ol.style.Style({
                fill: bufferFill,
            }))
        } else if (feature.get('id') == 4) {
            var bufferFill = new ol.style.Fill({
                color: [180, 35, 90, 0.75]
            });
            
            feature.setStyle(new ol.style.Style({
                fill: bufferFill,
            }))

        } else if (feature.get('id') == 5) {
            var bufferFill = new ol.style.Fill({
                color: [60, 90, 200, 0.75]
            });
            
            feature.setStyle(new ol.style.Style({
                fill: bufferFill,
            }))

        } else if (feature.get('id') == 6) {
            var bufferFill = new ol.style.Fill({
                color: [195, 105, 170, 0.75]
            });
            
            feature.setStyle(new ol.style.Style({
                fill: bufferFill,
            }))

        } else if (feature.get('id') == 7) {
            var bufferFill = new ol.style.Fill({
                color: [135, 210, 170, 0.75]
            });
            
            feature.setStyle(new ol.style.Style({
                fill: bufferFill,
            }))
        } else {
            var bufferFill = new ol.style.Fill({
                color: [250, 190, 50, 0.75]
            });
            
            feature.setStyle(new ol.style.Style({
                fill: bufferFill,
            }))
        }
    })
}
// map.addLayer(karakterkort);

//NM
var nm_svaedi = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: "data/nm.geojson",
        format: new ol.format.GeoJSON()
    }),
    zIndex: 1,
    visible: false,
    title: 'nm',
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: [21, 209, 71, 0.5]
        }),
        stroke: new ol.style.Stroke({
            color: [21, 209, 71, 0.8],
            width: 1,
        })
    })
});
// map.addLayer(nm_svaedi);

//Fridlyst
var fridlyst_svaedi = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: "data/fridlyst.geojson",
        format: new ol.format.GeoJSON()
    }),
    zIndex: 1,
    visible: false,
    title: 'fl',
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: [255, 255, 0, 0.5]
        }),
        stroke: new ol.style.Stroke({
            color: [255, 255, 0, 0.8],
            width: 1,
        })
    })
});
// map.addLayer(fridlyst_svaedi);

//Valkostir
var valkostir_layer = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: "data/valkostir_leid_update.geojson",
        format: new ol.format.GeoJSON()
    }),
    zIndex: 11,
    visible: false,
    title: 'valkostagreining',
    style: valkostir_style
});

//Color style
function valkostir_style(){
    valkostir_layer.getSource().forEachFeature(function(feature){
        if (feature.get('id') == 1) {
            var val_style = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: [0, 0, 0, 1],
                    width: 3,
                    lineDash: [5],
                })
            })
            
            feature.setStyle(val_style)
        } else {
            var val_style = new ol.style.Style({
                stroke: new ol.style.Stroke({
                    color: [146, 0, 73, 1],
                    width: 3,
                    lineDash: [5],
                })
            })
            
            feature.setStyle(val_style)
        }
    })
}
// map.addLayer(valkostir_layer);

//Valkostir punktar
function valkostir_stopp_style_func(feature){
    var valkostir_stops_text = new ol.style.Style({
        // image: new ol.style.Circle({
        //     radius: 5,
        //     fill: new ol.style.Fill({
        //         color: [255, 255, 255, 1]
        //     }),
        //     stroke: new ol.style.Stroke({
        //         color: [0, 0, 0, 1],
        //         width: 2,
        //     })
        // }),
            
        text: new ol.style.Text({
            font: '12px Calibri,sans-serif',
            fill: new ol.style.Fill({ color: '#000' }),
            stroke: new ol.style.Stroke({
              color: '#fff', 
              width: 4
            }),
            text: feature.get('stopp_name'),
            offsetY: 20,
            offsetX: -25,
            scale: 1.2,
            // padding: [10,10,10,10]
        })
    })
    return [valkostir_stops_text]
}


var valkostir_stopp = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: "data/valkostir_stop_update.geojson",
        format: new ol.format.GeoJSON()
    }),
    zIndex: 12,
    visible: false,
    title: 'ValkostirStopp',
    style: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 5,
            fill: new ol.style.Fill({
                color: [0, 0, 0, 1]
            }),
            stroke: new ol.style.Stroke({
                color: [0, 0, 0, 1],
                width: 2,
            })
        }),
    })
});
map.addLayer(valkostir_stopp);

var valkostir_stopp_labels = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: "data/valkostir_stop_update.geojson",
        format: new ol.format.GeoJSON()
    }),
    zIndex: 12,
    visible: false,
    title: 'ValkostirStopp',
    style: valkostir_stopp_style_func,
    declutter: true
});
map.addLayer(valkostir_stopp_labels);




var hverfisvernd = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: "data/hverfisvernd_update2.geojson",
        format: new ol.format.GeoJSON()
    }),
    zIndex: 2,
    visible: false,
    title: 'hv',
    style: new ol.style.Style({
        fill: new ol.style.FillPattern({
            pattern: "hatch",
            size: 2,
            spaceing: 5,
            angle: 45,
            color: [0, 0, 0, 0.5],
        }),
        stroke: new ol.style.Stroke({
            color: [0, 0, 0, 0.8],
            width: 1,
        })
    })
});
map.addLayer(hverfisvernd);












var baseLayerGroup = new ol.layer.Group({
        layers: [
            karakterkort, nm_svaedi, fridlyst_svaedi, blinaBuffer, valkostir_layer
        ]
    })
map.addLayer(baseLayerGroup);



// Layer Switcher logic for basemaps
//////USE THIS
var baseLayerElements = document.querySelectorAll('.sk-b-head > input[type=checkbox]');
for (let baseLayerElement of baseLayerElements) {
    baseLayerElement.addEventListener('click', function(){
        if (baseLayerElement.checked == true) {
            // console.log("yes")
            baseLayerGroup.getLayers().forEach(function(element, index, array){
                if (element.get('title') == baseLayerElement.value) {
                    element.setVisible(true)
                    // if (element.get('title') == 'BorgarlinaBuffer') {
                    //     var x = document.getElementById("is-grouped");
                    //     x.style.visibility = "visible";
                    // }
                }
            })
        } else if (baseLayerElement.checked == false) {
            baseLayerGroup.getLayers().forEach(function(element, index, array){
                if (element.get('title') == baseLayerElement.value) {
                    element.setVisible(false)
                    // if (element.get('title') == 'BorgarlinaBuffer') {
                    //     var x = document.getElementById("is-grouped");
                    //     x.style.visibility = "hidden";
                    // }
                }
            })
        }
    })
}



// map.setLayerIndex(blinaBuffer, 0);
// map.setLayerIndex(blina, 5);

///////////////////////////////////////////////////////////////////////////////////////////////////////////
//Applying the functions for buttons (leggir)
function buttonLeggirId(leggir){
    var leggir_ext = blinaBuffer.getSource().forEachFeature(function(feature){
        if (feature.get('leggur') == leggir) {
            var rammi = feature.getGeometry().getExtent();
            
        }
        return rammi;
    })
    return leggir_ext;
}


function zoomToLegOne(){
    var x = document.getElementById("button-explain1")
    x.style.visibility = "visible";
    document.getElementById('btn-close1').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest2').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest3').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest4').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest5').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest6').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })

    map.getView().fit(buttonLeggirId(1));
    map.getView().setZoom(map.getView().getZoom()-0.5)
}

function zoomToLegTwo(){
    var x = document.getElementById("button-explain2")
    x.style.visibility = "visible";
    document.getElementById('btn-close2').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest3').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest4').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest5').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest6').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })

    map.getView().fit(buttonLeggirId(2));
    map.getView().setZoom(map.getView().getZoom()-0.5)
    // var x = document.getElementById("button-explain");
    // if (x.style.display === "none") {
    //     x.style.display = "block";
    // } else {
    //     x.style.display = "none";
    // }
}

function zoomToLegThree(){
    var x = document.getElementById("button-explain3")
    x.style.visibility = "visible";
    document.getElementById('btn-close3').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest2').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest4').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest5').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest6').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })

    map.getView().fit(buttonLeggirId(3));
    map.getView().setZoom(map.getView().getZoom()-0.5)
}

function zoomToLegFour(){
    var x = document.getElementById("button-explain4")
    x.style.visibility = "visible";
    document.getElementById('btn-close4').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest3').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest2').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest5').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest6').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })

    map.getView().fit(buttonLeggirId(4));
    map.getView().setZoom(map.getView().getZoom()-0.5)
}

function zoomToLegFive(){
    var x = document.getElementById("button-explain5")
    x.style.visibility = "visible";
    document.getElementById('btn-close5').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest3').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest4').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest2').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest6').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })

    map.getView().fit(buttonLeggirId(5));
    map.getView().setZoom(map.getView().getZoom()-0.5)
}

function zoomToLegSix(){
    var x = document.getElementById("button-explain6")
    x.style.visibility = "visible";
    document.getElementById('btn-close6').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest3').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest4').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest5').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })
    document.getElementById('buttontest2').addEventListener("click", function(){
        x.style.visibility = "hidden"
    })

    map.getView().fit(buttonLeggirId(6));
    map.getView().setZoom(map.getView().getZoom()-0.5)
}


// function zoomToLegOne(){
//     blina.getSource().forEachFeature(function(feature){
//         if (feature.get('leggur') == 1) {
//             var rammi = feature.getGeometry().getExtent();
//             console.log(rammi);
//             map.getView().fit(rammi)
//             // map.addControl().ZoomToExtent(rammi)
//         }
//     })
// }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var comment = new ol.layer.VectorImage({
    source: new ol.source.Vector({
        url: "data/comment.geojson",
        format: new ol.format.GeoJSON()
    }),
    zIndex: 20,
    visible: false,
    title: 'comment',
    style: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                color: [245, 126, 66, 1]
            }),
            stroke: new ol.style.Stroke({
                color: [255, 0, 0, 1],
                width: 2,
            })
        }),
    })
});
map.addLayer(comment);

// var comment_test = new ol.Feature({
//     geometry: new ol.geom.Point([-2438984.080564762, 9383815.134970972]),
//     properties: { "nafn": "Sigurður Jónsson", "leggur": "Almennt", "comment": "Mörg börn fara um þetta svæði. Þarf að huga vel að merkingum." },
// })

// comment.getSource().addFeature(comment_test)
// comment.getSource().getFormat().writeFeatureObject(comment_test)




// Popup overlay
var popup = new ol.Overlay.Popup (
{	popupClass: "default", //"tooltips", "warning" "black" "default", "tips", "shadow",
    closeBox: false,
    // onshow: function(){ console.log("You opened the box"); },
    // onclose: function(){ console.log("You close the box"); },
    positioning: 'auto',
    autoPan: true,
    autoPanAnimation: { duration: 250 }
});



// Control Select 
var select = new ol.interaction.Select({
    // source: comment.getSource(),
    layers: [comment],
    style: new ol.style.Style({
        image: new ol.style.Circle({
            radius: 7,
            fill: new ol.style.Fill({
                // color: [245, 246, 67, 1]
                color: [245, 126, 66, 1]
            }),
            stroke: new ol.style.Stroke({
                color: [255, 0, 0, 1],
                width: 2,
            })
        }),
    })
});
map.addInteraction(select);

// On selected => show/hide popup
select.getFeatures().on(['add'], function(e) {
  var feature = e.element;
  var content = "";
  content += feature.get("comment");
  if (content !== "undefined") {
    popup.show(feature.getGeometry().getFirstCoordinate(), content); 
  }
});
select.getFeatures().on(['remove'], function(e) {
  popup.hide(); 
})






var popup2 = new ol.Overlay.Popup (
    {	popupClass: "default",
     //"tooltips", "warning" "black" "default", "tips", "shadow",
        closeBox: false,
        onshow: function(){ console.log("You opened the box"); },
        onclose: function(){ console.log("You close the box"); },
        positioning: 'auto',
        autoPan: true,
        autoPanAnimation: { duration: 250 }
    });
    

//Select karakterkort
var select_kar = new ol.interaction.Select({
    // source: comment.getSource(),
    layers: [karakterkort],
    style: new ol.style.Style({
        fill: new ol.style.Fill({
            color: [255, 255, 255, 0]
        }),
        stroke: new ol.style.Stroke({
            color: [255, 0, 0, 0.8],
            width: 4,
        })
    })
});
map.addInteraction(select_kar);



select_kar.getFeatures().on(['add'], function(e) {
    var feature = e.element;
    var content = "";
    content += feature.get("nafn");
    var geom = feature.getGeometry();
    if (content !== "undefined") {
        popup2.show(geom.getFirstCoordinate(),content); 
    }
});
select_kar.getFeatures().on(['remove'], function(e) {
    popup2.hide();
    select_kar.getFeatures().clear()
    
})




map.addOverlay(popup);
map.addOverlay(popup2)











//Some styles
function blina_stopp_style_func_pos(){
    blina_stopp_labels.getSource().forEachFeature(function(feature){
        if (feature.get('stopp_name') == "Hamraborg") {
            
            var textstyle = new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#054929' }),
                stroke: new ol.style.Stroke({
                    color: '#fff', 
                    width: 4
                }),
                text: feature.get('stopp_name'),
                offsetX: 25,
                offsetY: 20,
                scale: 1.2,
                // padding: [10,10,10,10]
            });
            

            // feature.setStyle(new ol.style.Style({
            //     text: textstyle,
            // }))
        } else if (feature.get('stopp_name') == "Hlíðarendi") {
            var textstyle = new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#054929' }),
                stroke: new ol.style.Stroke({
                    color: '#fff', 
                    width: 4
                }),
                text: feature.get('stopp_name'),
                offsetX: 40,
                scale: 1.2,
                // padding: [10,10,10,10]
            });
            

            // feature.setStyle(new ol.style.Style({
            //     text: textstyle,
            // }))
        } else if (feature.get('stopp_name') == "HR") {
            var textstyle = new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#054929' }),
                stroke: new ol.style.Stroke({
                    color: '#fff', 
                    width: 4
                }),
                text: feature.get('stopp_name'),
                offsetX: 20,
                scale: 1.2,
                // padding: [10,10,10,10]
            });
            

            // feature.setStyle(new ol.style.Style({
            //     text: textstyle,
            // }))
        } else if (feature.get('stopp_name') == "Öskjuhlíð") {
            var textstyle = new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#054929' }),
                stroke: new ol.style.Stroke({
                    color: '#fff', 
                    width: 4
                }),
                text: feature.get('stopp_name'),
                offsetX: 40,
                scale: 1.2,
                // padding: [10,10,10,10]
            });
            

            // feature.setStyle(new ol.style.Style({
            //     text: textstyle,
            // }))
        } else if (feature.get('stopp_name') == "Lækjartorg") {
            var textstyle = new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#054929' }),
                stroke: new ol.style.Stroke({
                    color: '#fff', 
                    width: 4
                }),
                text: feature.get('stopp_name'),
                offsetX: -40,
                scale: 1.2,
                // padding: [10,10,10,10]
            });
            

            // feature.setStyle(new ol.style.Style({
            //     text: textstyle,
            // }))
        } else if (feature.get('stopp_name') == "Hlemmur") {
            var textstyle = new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#054929' }),
                stroke: new ol.style.Stroke({
                    color: '#fff', 
                    width: 4
                }),
                text: feature.get('stopp_name'),
                offsetY: 20,
                offsetX: -20,
                scale: 1.2,
                // padding: [10,10,10,10]
            });
            

            // feature.setStyle(new ol.style.Style({
            //     text: textstyle,
            // }))
        } else if (feature.get('stopp_name') == "Frakkastígur") {
            var textstyle = new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#054929' }),
                stroke: new ol.style.Stroke({
                    color: '#fff', 
                    width: 4
                }),
                text: feature.get('stopp_name'),
                offsetX: 40,
                offsetY: -15,
                scale: 1.2,
                // padding: [10,10,10,10]
            });
            

            // feature.setStyle(new ol.style.Style({
            //     text: textstyle,
            // }))
        } else if (feature.get('stopp_name') == "Smiðjustígur") {
            var textstyle = new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#054929' }),
                stroke: new ol.style.Stroke({
                    color: '#fff', 
                    width: 4
                }),
                text: feature.get('stopp_name'),
                offsetX: 20,
                offsetY: -15,
                scale: 1.2,
                // padding: [10,10,10,10]
            });
            

            // feature.setStyle(new ol.style.Style({
            //     text: textstyle,
            // }))
        } else if (feature.get('stopp_name') == "Elliðaárvogur") {
            var textstyle = new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#054929' }),
                stroke: new ol.style.Stroke({
                    color: '#fff', 
                    width: 4
                }),
                text: feature.get('stopp_name'),
                offsetY: 25,
                scale: 1.2,
                // padding: [10,10,10,10]
            });
            

            // feature.setStyle(new ol.style.Style({
            //     text: textstyle,
            // }))
        } else if (feature.get('stopp_name') == "HÍ") {
            var textstyle = new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#054929' }),
                stroke: new ol.style.Stroke({
                    color: '#fff', 
                    width: 4
                }),
                text: feature.get('stopp_name'),
                offsetX: 20,
                scale: 1.2,
                // padding: [10,10,10,10]
            });
            

            // feature.setStyle(new ol.style.Style({
            //     text: textstyle,
            // }))
        } 
        else {
            var textstyle = new ol.style.Text({
                font: '12px Calibri,sans-serif',
                fill: new ol.style.Fill({ color: '#054929' }),
                stroke: new ol.style.Stroke({
                    color: '#fff', 
                    width: 4
                }),
                text: feature.get('stopp_name'),
                offsetY: -20,
                scale: 1.2,
                // padding: [10,10,10,10]
            });
            

            // feature.setStyle(new ol.style.Style({
            //     text: textstyle,
            // }))
        } 

        feature.setStyle(new ol.style.Style({
            text: textstyle,
        }))
    })
}





// //Another blina stopp styel for aeriel view
// function blina_stopp_style_func3(){
//     blina_stopp_labels.getSource().forEachFeature(function(feature){
//         if (feature.get('stopp_name') == "Hamraborg") {
            
//             var textstyle = new ol.style.Text({
//                 font: '12px Calibri,sans-serif',
//                 fill: new ol.style.Fill({ color: '#0000ff' }),
//                 stroke: new ol.style.Stroke({
//                     color: '#fff', 
//                     width: 4
//                 }),
//                 text: feature.get('stopp_name'),
//                 offsetX: 25,
//                 offsetY: 20,
//                 scale: 1.2,
//                 // padding: [10,10,10,10]
//             });
            

//             feature.setStyle(new ol.style.Style({
//                 text: textstyle,
//             }))
//         } else if (feature.get('stopp_name') == "Hlíðarendi") {
//             var textstyle = new ol.style.Text({
//                 font: '12px Calibri,sans-serif',
//                 fill: new ol.style.Fill({ color: '#0000ff' }),
//                 stroke: new ol.style.Stroke({
//                     color: '#fff', 
//                     width: 4
//                 }),
//                 text: feature.get('stopp_name'),
//                 offsetX: 40,
//                 scale: 1.2,
//                 // padding: [10,10,10,10]
//             });
            

//             feature.setStyle(new ol.style.Style({
//                 text: textstyle,
//             }))
//         } else if (feature.get('stopp_name') == "HR") {
//             var textstyle = new ol.style.Text({
//                 font: '12px Calibri,sans-serif',
//                 fill: new ol.style.Fill({ color: '#0000ff' }),
//                 stroke: new ol.style.Stroke({
//                     color: '#fff', 
//                     width: 4
//                 }),
//                 text: feature.get('stopp_name'),
//                 offsetX: 20,
//                 scale: 1.2,
//                 // padding: [10,10,10,10]
//             });
            

//             feature.setStyle(new ol.style.Style({
//                 text: textstyle,
//             }))
//         } else if (feature.get('stopp_name') == "Öskjuhlíð") {
//             var textstyle = new ol.style.Text({
//                 font: '12px Calibri,sans-serif',
//                 fill: new ol.style.Fill({ color: '#0000ff' }),
//                 stroke: new ol.style.Stroke({
//                     color: '#fff', 
//                     width: 4
//                 }),
//                 text: feature.get('stopp_name'),
//                 offsetX: 40,
//                 scale: 1.2,
//                 // padding: [10,10,10,10]
//             });
            

//             feature.setStyle(new ol.style.Style({
//                 text: textstyle,
//             }))
//         } else if (feature.get('stopp_name') == "Lækjartorg") {
//             var textstyle = new ol.style.Text({
//                 font: '12px Calibri,sans-serif',
//                 fill: new ol.style.Fill({ color: '#0000ff' }),
//                 stroke: new ol.style.Stroke({
//                     color: '#fff', 
//                     width: 4
//                 }),
//                 text: feature.get('stopp_name'),
//                 offsetX: -40,
//                 scale: 1.2,
//                 // padding: [10,10,10,10]
//             });
            

//             feature.setStyle(new ol.style.Style({
//                 text: textstyle,
//             }))
//         } else if (feature.get('stopp_name') == "Hlemmur") {
//             var textstyle = new ol.style.Text({
//                 font: '12px Calibri,sans-serif',
//                 fill: new ol.style.Fill({ color: '#0000ff' }),
//                 stroke: new ol.style.Stroke({
//                     color: '#fff', 
//                     width: 4
//                 }),
//                 text: feature.get('stopp_name'),
//                 offsetY: 20,
//                 offsetX: -20,
//                 scale: 1.2,
//                 // padding: [10,10,10,10]
//             });
            

//             feature.setStyle(new ol.style.Style({
//                 text: textstyle,
//             }))
//         } else if (feature.get('stopp_name') == "Frakkastígur") {
//             var textstyle = new ol.style.Text({
//                 font: '12px Calibri,sans-serif',
//                 fill: new ol.style.Fill({ color: '#0000ff' }),
//                 stroke: new ol.style.Stroke({
//                     color: '#fff', 
//                     width: 4
//                 }),
//                 text: feature.get('stopp_name'),
//                 offsetX: 40,
//                 offsetY: -15,
//                 scale: 1.2,
//                 // padding: [10,10,10,10]
//             });
            

//             feature.setStyle(new ol.style.Style({
//                 text: textstyle,
//             }))
//         } else if (feature.get('stopp_name') == "Smiðjustígur") {
//             var textstyle = new ol.style.Text({
//                 font: '12px Calibri,sans-serif',
//                 fill: new ol.style.Fill({ color: '#0000ff' }),
//                 stroke: new ol.style.Stroke({
//                     color: '#fff', 
//                     width: 4
//                 }),
//                 text: feature.get('stopp_name'),
//                 offsetX: 20,
//                 offsetY: -15,
//                 scale: 1.2,
//                 // padding: [10,10,10,10]
//             });
            

//             feature.setStyle(new ol.style.Style({
//                 text: textstyle,
//             }))
//         } else if (feature.get('stopp_name') == "Elliðaárvogur") {
//             var textstyle = new ol.style.Text({
//                 font: '12px Calibri,sans-serif',
//                 fill: new ol.style.Fill({ color: '#0000ff' }),
//                 stroke: new ol.style.Stroke({
//                     color: '#fff', 
//                     width: 4
//                 }),
//                 text: feature.get('stopp_name'),
//                 offsetY: 25,
//                 scale: 1.2,
//                 // padding: [10,10,10,10]
//             });
            

//             feature.setStyle(new ol.style.Style({
//                 text: textstyle,
//             }))
//         } else if (feature.get('stopp_name') == "HÍ") {
//             var textstyle = new ol.style.Text({
//                 font: '12px Calibri,sans-serif',
//                 fill: new ol.style.Fill({ color: '#0000ff' }),
//                 stroke: new ol.style.Stroke({
//                     color: '#fff', 
//                     width: 4
//                 }),
//                 text: feature.get('stopp_name'),
//                 offsetX: 20,
//                 scale: 1.2,
//                 // padding: [10,10,10,10]
//             });
            

//             feature.setStyle(new ol.style.Style({
//                 text: textstyle,
//             }))
//         } 
//         else {
//             var textstyle = new ol.style.Text({
//                 font: '12px Calibri,sans-serif',
//                 fill: new ol.style.Fill({ color: '#0000ff' }),
//                 stroke: new ol.style.Stroke({
//                     color: '#fff', 
//                     width: 4
//                 }),
//                 text: feature.get('stopp_name'),
//                 offsetY: -20,
//                 scale: 1.2,
//                 // padding: [10,10,10,10]
//             });
            

//             feature.setStyle(new ol.style.Style({
//                 text: textstyle,
//             }))
//         } 
//     })
// }





