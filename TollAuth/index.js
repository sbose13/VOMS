import { TollAuth } from "../../declarations/TollAuth";

const kgecLoc = { lat: 22.986413037490088, lng: 88.44686391192141 };
var mLat = 22.986413037490088, mLng = 88.44686391192141;
var marker;
function addDraggableMarker(map, behavior) {

  marker = new H.map.Marker(kgecLoc, {
    volatility: true
  });

  marker.draggable = true;
  map.addObject(marker);

  map.addEventListener('dragstart', function (ev) {
    var target = ev.target,
      pointer = ev.currentPointer;
    if (target instanceof H.map.Marker) {
      var targetPosition = map.geoToScreen(target.getGeometry());
      target['offset'] = new H.math.Point(pointer.viewportX - targetPosition.x, pointer.viewportY - targetPosition.y);
      behavior.disable();
    }
  }, false);


  map.addEventListener('dragend', function (ev) {
    var coord = map.screenToGeo(ev.currentPointer.viewportX,
      ev.currentPointer.viewportY);

    //Handling new Lat, Lon here //console.log(coord.lat + '|'+ coord.lng);
    mLat = coord.lat;
    mLng = coord.lng;

    var target = ev.target;
    if (target instanceof H.map.Marker) {
      behavior.enable();
    }
  }, false);

  map.addEventListener('drag', function (ev) {
    var target = ev.target,
      pointer = ev.currentPointer;
    // console.log(pointer);
    if (target instanceof H.map.Marker) {
      target.setGeometry(map.screenToGeo(pointer.viewportX - target['offset'].x, pointer.viewportY - target['offset'].y));
    }
  }, false);
}

function initilizeMap() {
  //Map Initilization
  var platform = new H.service.Platform({
    apikey: 'u-JMJr3U89gmTJv46xeCiM_pVgh68NskOF0sc17bAv4'
  });
  var defaultLayers = platform.createDefaultLayers();


  var map = new H.Map(document.getElementById('mapContainer'),
    defaultLayers.vector.normal.map,
    {
      center: kgecLoc,
      zoom: 15,
      pixelRatio: window.devicePixelRatio || 1
    }
  );

  // window.addEventListener('load', (event) => {
  window.addEventListener('resize', () => map.getViewPort().resize());
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  addDraggableMarker(map, behavior);
}

window.addEventListener('load', () => {
  initilizeMap();
});

/////////////////////////////////////////////////////////////////////////////
const notificationBox = document.querySelector(".notif");
const spinner = document.querySelector(".spinner");
const spinnerText = document.querySelector(".spinner>strong");
const form = document.querySelector('.input-group');
const decomBtn = document.querySelector('.decom-btn');
const registerDiv = document.querySelector('.register-div');
const decomDiv = document.querySelector('.decom-div');
var flaggedVehicles = [];
var listener;

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  spinner.style.display = 'block';
  const imsid = document.querySelector('.input-group>input').value;

  try {
    await TollAuth.setImsAddr(imsid);
    await TollAuth.registerTollAuth(mLat, mLng);

    listener = setInterval(async () => {
      var res = await TollAuth.alertListener();
      if (res.length != 0 && !flaggedVehicles.includes(res)) {
        flaggedVehicles.push(res);
        sendAlert(res);
      }
    }, 5000)

    marker.draggable = false;
    spinnerText.textContent = 'Listening for activities...'
    registerDiv.style.display = 'none';
    decomDiv.style.display = 'block';
  }
  catch (e) {
    alert(e);
  }
});



decomBtn.addEventListener('click', async () => {
  clearInterval(listener);

  await TollAuth.resetAlert();
  flaggedVehicles = [];
  registerDiv.style.display = 'block';
  decomDiv.style.display = 'none';
  spinner.style.display = 'none';
  spinnerText.textContent = 'Loading...';
  marker.draggable = true;
  notificationBox.innerHTML = '<div></div>';
});

function sendAlert(rcno) {
  notificationBox.innerHTML = notificationBox.innerHTML + `<div class="alert alert-warning alert-dismissible fade show alert-box" style="margin: 1% 5%; z-index: 9999; font-size: 1rem"
  role="alert">
  <svg class="bi flex-shrink-0 me-2" width="20" height="20" role="img" aria-label="Danger:">
    <use xlink:href="#exclamation-triangle-fill" />
  </svg>
  <strong>Alert!</strong> A overspeeding vehicle may be nearby with RC-NO: <strong>${rcno}<strong>.
  <button type="button" class="btn-close " data-bs-dismiss="alert" aria-label="Close"></button>
  </div>`
}
