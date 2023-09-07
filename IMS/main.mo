import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Float "mo:base/Float";
import Principal "mo:base/Principal";

actor IMS {
  //speedlimit is in Kmph
  var speedLimit : Nat = 80;
  //alert range is in Km
  var alertRange : Float = 0.5;

  var vehmap = HashMap.HashMap<Text, { rcNo : Text; speed : Nat; lat : Float; lon : Float }>(
    10,
    Text.equal,
    Text.hash,
  );

  var tollmap = HashMap.HashMap<Text, { lat : Float; lon : Float }>(
    10,
    Text.equal,
    Text.hash,
  );

  public func setSpeedLimit(speed : Nat) : async Text {
    speedLimit := speed;
    return "SPEED LIMIT SET TO " # Nat.toText(speedLimit) # " KMPH.";
  };

  public func getSpeedLimit() : async Nat {
    return speedLimit;
  };

  public func getId() : async Text {
    return Principal.toText(Principal.fromActor(IMS));
  };

  func toRad(l : Float) : Float {
    return (l * Float.pi / 180);
  };

  //Haversine Formulae
  func calculateDistance(lat1 : Float, lon1 : Float, lat2 : Float, lon2 : Float) : async Float {
    var dLat = toRad(lat2 - lat1);
    var dLon = toRad(lon2 - lon1);

    var a = Float.pow(Float.sin(dLat / 2), 2) + Float.pow(
      Float.sin(dLon / 2),
      2,
    ) * Float.cos(toRad(lat1)) * Float.cos(toRad(lat2));
    var rad = 6371.0;
    var c = 2 * Float.arcsin(Float.sqrt(a));

    return (rad * c);
  };

  public func updateVehicleInfo(
    vid : Text,
    rcNo : Text,
    speed : Nat,
    lat : Float,
    lon : Float,
  ) {
    vehmap.put(vid, { rcNo = rcNo; speed = speed; lat = lat; lon = lon });

    if (Nat.greater(speed, speedLimit)) {
      // For Vehicles
      for ((key, value) in vehmap.entries()) {
        let vehicle = actor (key) : actor {
          setAlert : () -> async ();
          setWarning : () -> async ();
        };

        if (key == vid) {
          await vehicle.setWarning();
        } else if ((value.speed != 0) and Float.lessOrEqual(await calculateDistance(lat, lon, value.lat, value.lon), alertRange)) {
          await vehicle.setAlert();
        };
      };

      //For Toll Nakas
      for ((key, value) in tollmap.entries()) {
        if (Float.lessOrEqual(await calculateDistance(lat, lon, value.lat, value.lon), alertRange +0.5)) {
          let tollauth = actor (key) : actor {
            setAlert : (Text) -> async ();
          };
          await tollauth.setAlert(rcNo);
        };
      };
    };
  };

  public func updateTAInfo(
    tid : Text,
    lat : Float,
    lon : Float,
  ) {
    tollmap.put(tid, { lat = lat; lon = lon });
  };

  public func getVehicleInfo(vid : Text) : async Text {
    let res = vehmap.get(vid);
    let output = switch (res) {
      case null "No data found";
      case (?r)("RC-NO: " # r.rcNo # "\nSpeed: " # Nat.toText(r.speed) # "\nLatitude: " # Float.toText(r.lat) # "\nLongitude: " # Float.toText(r.lon));
    };
    return output;
  };
};
