import { VehicleB } from '../../declarations/VehicleB';

const registerGroup = document.getElementById('register-group');
const vehicleDashboardGroup = document.querySelector('.vehicle-dashboard');
const regBtn = document.querySelector('.register-btn');
const imsInputField = document.querySelector('.ims-id');
const rcInputField = document.querySelector('.rc-no');
const progressBar = document.getElementById('progress-bar');
const spinnerDiv = document.querySelector('.spinner-div');

// registerGroup.style.display = 'none';
// vehicleDashboardGroup.style.display = 'block';
// regBtn.disabled = true;

var imsId = '';
var rcNo = '';

//##################### Registration Portal #####################

regBtn.addEventListener('click', async (e) => {
  imsId = imsInputField.value;
  rcNo = rcInputField.value;
  if (imsId.length === 0) {
    alert('Please enter a valid IMS Canister ID');
    imsInputField.focus();
  }
  else if (rcNo.length === 0) {
    rcInputField.focus();
    alert('Please enter a valid RC Number');
  }
  else {
    progressBar.style.display = 'block';
    progressBar.play();
    try {
      await VehicleB.setRcNo(rcNo);
      await VehicleB.setImsAddr(imsId);
      await VehicleB.registerVehicle();
      alert("Vehicle registeration Successful! \nThis portal will now  be transformed into user's Vehicle dashboard");
      var rcNoFromCan = await VehicleB.getRcNo();
      registerGroup.style.display = 'none';
      vehicleDashboardGroup.style.display = 'block';
      progressBar.stop();
      initilizeMap();
      document.querySelector('.btn-rc-disp').innerText = rcNoFromCan;
    }
    catch (e) {
      progressBar.style.display = 'none';
      alert(e);
    }
  }
});


document.querySelector('.btn-rc-disp').addEventListener('click', async () => {
  var copyText = await VehicleB.getVid();
  console.log(copyText);
  navigator.clipboard.writeText(copyText).then(() => {
    alert('VID copied to clipboard');
  });
});



//##################### MAP HANDLING ######################

const kgecLoc = { lat: 22.986413037490088, lng: 88.44686391192141 };
var mLat = 22.986413037490088, mLng = 88.44686391192141;

function addDraggableMarker(map, behavior) {

  var marker = new H.map.Marker(kgecLoc, {
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

  window.addEventListener('load', async () => {
    await VehicleB.resetAlert();
    await VehicleB.resetWarning();
  });

  window.addEventListener('resize', () => map.getViewPort().resize());
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));
  var ui = H.ui.UI.createDefault(map, defaultLayers);
  addDraggableMarker(map, behavior);

  document.getElementById('btn-default-centre').addEventListener('click', () => {
    map.setCenter(kgecLoc);
    map.setZoom(15);
  });

  document.getElementById('btn-marker-centre').addEventListener('click', () => {
    map.setCenter({ lat: mLat, lng: mLng });
    map.setZoom(15);
  });
  // });
}



//######################## Speedometer & Start/Stop Handling ########################

const speedRange = document.getElementById('speed-range');
speedRange.disabled = true;

async function refresh() {
  await VehicleB.resetAlert();
  await VehicleB.resetWarning();
  notificationBox.innerHTML = "";
}
var speedData = [
  {
    domain: { x: [0, 1], y: [0, 1] },
    gauge: {
      axis: { range: [null, 200] },
      //   bar: {color: 'red'}
    },
    value: 0,
    title: { text: 'SPEED' },
    type: 'indicator',
    mode: 'gauge+number'
  }
];
var layout = { width: 500, height: 350, margin: { t: 0, b: 0 } };
Plotly.newPlot('speedometer', speedData, layout);

speedRange.addEventListener('change', () => {
  speedData[0].value = speedRange.value;
  Plotly.newPlot('speedometer', speedData, layout);
});

const startBtn = document.querySelector('.start-btn');
var isRunning = false;
var listener;

startBtn.addEventListener('click', async () => {
  if (isRunning) {
    //Active --> Inactive
    clearInterval(listener);
    await VehicleB.resetAlert();
    await VehicleB.resetWarning();
    await VehicleB.updateVehicleInfo(0, mLat, mLng);
    spinnerDiv.style.display = "none";
    isRunning = !isRunning;
    startBtn.classList.remove('btn-danger');
    startBtn.classList.add('btn-success');
    startBtn.innerText = 'Start';
    speedRange.disabled = true;
    speedRange.value = 0;
    speedData[0].value = speedRange.value;
    Plotly.newPlot('speedometer', speedData, layout);
    await refresh();
  } else {
    //Inactive --> Active
    refresh();
    spinnerDiv.style.display = "block";
    listener = setInterval(async () => {
      try {
        await VehicleB.updateVehicleInfo(parseInt(speedRange.value), mLat, mLng);
        console.log(parseInt(speedRange.value));
        var x = await VehicleB.getSL();
        console.log(x);


        if (await VehicleB.alertListener()) {
          sendAlert();
          await VehicleB.resetAlert();
          // cooldown++;
        }
        else if (await VehicleB.warningListener()) {
          sendWarning();
          await VehicleB.resetWarning();
          // cooldown++;
        }
      }
      catch (e) {
        console.log(e);
      }
    }, 1000);
    isRunning = !isRunning;
    startBtn.classList.remove('btn-success');
    startBtn.classList.add('btn-danger');
    startBtn.innerText = 'Stop';
    speedRange.disabled = false;
    speedRange.value = 10;
    speedData[0].value = speedRange.value;
    Plotly.newPlot('speedometer', speedData, layout);
  }
});



//######################### Notification Services #########################

var alertHtml = `<div class="alert alert-warning alert-dismissible fade show alert-box" style="margin: 1% 25%; z-index: 9999; font-size: 1.2rem"
role="alert">
<svg class="bi flex-shrink-0 me-2" width="20" height="20" role="img" aria-label="Danger:">
  <use xlink:href="#exclamation-triangle-fill" />
</svg>
<strong>Caution!</strong> A overspeeding vehicle may be nearby.
<button type="button" class="btn-close " data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

var warningHtml = `<div class="alert alert-danger alert-dismissible fade show alert-box" style="margin: 1% 25%; z-index: 9999; font-size: 1.2rem"
role="alert">
<svg class="bi flex-shrink-0 me-2" width="20" height="20" role="img" aria-label="Danger:">
  <use xlink:href="#exclamation-triangle-fill" />
</svg>
<strong>Warning!</strong> You are above speed limit. Please slow down.
<button type="button" class="btn-close " data-bs-dismiss="alert" aria-label="Close"></button>
</div>`;

const notificationBox = document.querySelector(".notification-box");
function sendAlert() {
  notificationBox.innerHTML = alertHtml;
}

function sendWarning() {
  notificationBox.innerHTML = warningHtml;
}
