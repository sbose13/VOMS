import Principal "mo:base/Principal";
import Bool "mo:base/Bool";
import Nat "mo:base/Nat";

actor class Vehicle() = this {
  var rcNo : Text = "";
  var vid : Text = "";
  var imsAddr : Text = "";

  var alert : Bool = false;
  var warn : Bool = false;

  public func getVid() : async Text {
    return vid;
  };

  public func getRcNo() : async Text {
    return rcNo;
  };

  public func setRcNo(rc : Text) {
    rcNo := rc;
  };

  public func setImsAddr(addr : Text) {
    imsAddr := addr;
  };

  public func registerVehicle() {
    vid := Principal.toText(Principal.fromActor(this));

    let ims = actor (imsAddr) : actor {
      updateVehicleInfo : (Text, Text, Nat, Float, Float) -> async ();
    };
    await ims.updateVehicleInfo(vid, rcNo, 0, 0.0, 0.0);
  };

  public func updateVehicleInfo(speed : Nat, lat : Float, lon : Float) {
    let ims = actor (imsAddr) : actor {
      updateVehicleInfo : (Text, Text, Nat, Float, Float) -> async ();
    };
    await ims.updateVehicleInfo(vid, rcNo, speed, lat, lon);
  };

  public func setAlert() {
    alert := true;
  };

  public func resetAlert() {
    alert := false;
  };

  public func setWarning() {
    warn := true;
  };

  public func resetWarning() {
    warn := false;
  };

  public func alertListener() : async Bool {
    return alert;
  };

  public func warningListener() : async Bool {
    return warn;
  };

  public func getSL() : async Nat {
    let ims = actor (imsAddr) : actor {
      getSpeedLimit : () -> async (Nat);
    };
    return await ims.getSpeedLimit();
  };

};
