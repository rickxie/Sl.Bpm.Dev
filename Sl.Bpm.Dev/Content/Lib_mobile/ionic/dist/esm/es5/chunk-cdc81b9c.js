function hapticAvailable() { return !!window.TapticEngine; }
function hapticSelection() { var i = window.TapticEngine; i && i.selection(); }
function hapticSelectionStart() { var i = window.TapticEngine; i && i.gestureSelectionStart(); }
function hapticSelectionChanged() { var i = window.TapticEngine; i && i.gestureSelectionChanged(); }
function hapticSelectionEnd() { var i = window.TapticEngine; i && i.gestureSelectionEnd(); }
function hapticNotification(i) { var t = window.TapticEngine; t && t.notification(i); }
function hapticImpact(i) { var t = window.TapticEngine; t && t.impact(i); }
export { hapticSelectionChanged as a, hapticSelectionEnd as b, hapticSelectionStart as c, hapticSelection as d, hapticAvailable as e, hapticNotification as f, hapticImpact as g };
