import { IMS } from "../../declarations/IMS";

const copyBtn = document.querySelector('.copy-btn');
const restartBtn = document.querySelector('.btn-restart');

window.addEventListener('load', async () => {
  const imsid = await IMS.getId();
  console.log(imsid);
  document.getElementById("ims-id").innerText = imsid
  document.querySelector(".copy-btn").style.display = "block";
  document.querySelector(".btn-group-utility").style.visibility = "visible";
  document.querySelector(".spinner").style.display = "none";
});

copyBtn.addEventListener('click', async () => {
  var copyText = document.getElementById("ims-id").innerText;
  navigator.clipboard.writeText(copyText);
  copyBtn.innerText = "Copied";
  setTimeout(() => {
    copyBtn.innerText = "Copy";
  }, 1000);
});

//Get Vehicle Info.
document.querySelector(".btn-get-vi").addEventListener('click', async () => {
  let vid = prompt('Enter the VID of Vehicle :');
  var output = await IMS.getVehicleInfo(vid);
  alert(output);
});

document.querySelector(".btn-set-sl").addEventListener('click', async () => {
  let speed = prompt('Enter the new Speed Limit');
  var output = await IMS.setSpeedLimit(parseInt(speed));
  alert(output);
});


// restartBtn.addEventListener('click', async ()=>{
//  await IMS.restartServer();
// });
