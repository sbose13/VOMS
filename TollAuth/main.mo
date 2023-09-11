import Principal "mo:base/Principal";

actor TollAuth {
  var tid : Text = "";
  var imsAddr : Text = "";
  var flaggedRC : Text = "";

  var alert : Bool = false;

  public func setImsAddr(addr : Text) {
    imsAddr := addr;
  };

  public func registerTollAuth(lat : Float, lon : Float) {
    tid := Principal.toText(Principal.fromActor(TollAuth));

    let ims = actor (imsAddr) : actor {
      updateTAInfo : (Text, Float, Float) -> async ();
    };
    await ims.updateTAInfo(tid, lat, lon);
  };

  public func setAlert(rcNo : Text) {
    alert := true;
    flaggedRC := rcNo;
  };

  public func alertListener() : async Text {
    if (alert) return flaggedRC;
    return "";
  };

  public func resetAlert() {
    alert := false;
    flaggedRC := "";
  };

};
