import {
  require_react
} from "./chunk-2PA4WPI3.js";
import {
  __toESM
} from "./chunk-ROME4SDB.js";

// node_modules/@uiball/loaders/dist/components/Ring.js
var import_react = __toESM(require_react(), 1);

// node_modules/@uiball/loaders/dist/lib/assert.js
function e(e26, p2, o7, t10) {
  if (!(typeof o7 === t10))
    throw new TypeError(`Invalid prop '${p2}' of type '${typeof o7}' supplied to '${e26}', expected '${t10}'.`);
}

// node_modules/@uiball/loaders/dist/style-inject.es-1f59c1d0.js
function e2(e26, t10) {
  void 0 === t10 && (t10 = {});
  var d = t10.insertAt;
  if (e26 && "undefined" != typeof document) {
    var n7 = document.head || document.getElementsByTagName("head")[0], s4 = document.createElement("style");
    s4.type = "text/css", "top" === d && n7.firstChild ? n7.insertBefore(s4, n7.firstChild) : n7.appendChild(s4), s4.styleSheet ? s4.styleSheet.cssText = e26 : s4.appendChild(document.createTextNode(e26));
  }
}

// node_modules/@uiball/loaders/dist/components/Ring.js
var t = "Ring-module_container__1mCd7";
function o(i11) {
  let { size: o7 = 40, color: s4 = "black", lineWeight: a14 = 5, speed: n7 = 2 } = i11;
  return e("Ring", "size", o7, "number"), e("Ring", "color", s4, "string"), e("Ring", "lineWeight", a14, "number"), e("Ring", "speed", n7, "number"), import_react.default.createElement("svg", { height: o7, width: o7, className: t, viewBox: "25 25 50 50", style: { "--uib-size": o7 + "px", "--uib-color": s4, "--uib-speed": n7 + "s" } }, import_react.default.createElement("circle", { cx: "50", cy: "50", r: "20", strokeWidth: a14, fill: "none" }));
}
e2(".Ring-module_container__1mCd7{animation:Ring-module_rotate__RBwLl var(--uib-speed) linear infinite;height:var(--uib-size);transform-origin:center;vertical-align:middle;width:var(--uib-size);will-change:transform}.Ring-module_container__1mCd7 circle{fill:none;stroke:var(--uib-color);stroke-dasharray:1,200;stroke-dashoffset:0;stroke-linecap:round;animation:Ring-module_stretch__L-1Qd calc(var(--uib-speed)*.75) ease-in-out infinite;will-change:stroke-dasharray,stroke-dashoffset}@keyframes Ring-module_rotate__RBwLl{to{transform:rotate(1turn)}}@keyframes Ring-module_stretch__L-1Qd{0%{stroke-dasharray:1,200;stroke-dashoffset:0}50%{stroke-dasharray:90,200;stroke-dashoffset:-35px}to{stroke-dashoffset:-124px}}");

// node_modules/@uiball/loaders/dist/components/Waveform.js
var import_react2 = __toESM(require_react(), 1);
var r = "Waveform-module_container__kGWZq";
var o2 = "Waveform-module_bar__5hNhf";
function t2(a14) {
  let { size: t10 = 40, color: m = "black", lineWeight: n7 = 3.5, speed: l5 = 1 } = a14;
  return e("Waveform", "size", t10, "number"), e("Waveform", "color", m, "string"), e("Waveform", "speed", l5, "number"), e("Waveform", "lineWeight", n7, "number"), import_react2.default.createElement("div", { className: r, style: { "--uib-size": t10 + "px", "--uib-color": m, "--uib-line-weight": n7 + "px", "--uib-speed": l5 + "s" } }, import_react2.default.createElement("div", { className: o2 }), import_react2.default.createElement("div", { className: o2 }), import_react2.default.createElement("div", { className: o2 }), import_react2.default.createElement("div", { className: o2 }));
}
e2(".Waveform-module_container__kGWZq{align-items:center;display:flex;height:calc(var(--uib-size)*.9);justify-content:space-between;width:var(--uib-size)}.Waveform-module_bar__5hNhf{background-color:var(--uib-color);height:100%;width:var(--uib-line-weight)}.Waveform-module_bar__5hNhf:first-child{animation:Waveform-module_grow__KV1Si var(--uib-speed) ease-in-out calc(var(--uib-speed)*-.45) infinite}.Waveform-module_bar__5hNhf:nth-child(2){animation:Waveform-module_grow__KV1Si var(--uib-speed) ease-in-out calc(var(--uib-speed)*-.3) infinite}.Waveform-module_bar__5hNhf:nth-child(3){animation:Waveform-module_grow__KV1Si var(--uib-speed) ease-in-out calc(var(--uib-speed)*-.15) infinite}.Waveform-module_bar__5hNhf:nth-child(4){animation:Waveform-module_grow__KV1Si var(--uib-speed) ease-in-out infinite}@keyframes Waveform-module_grow__KV1Si{0%,to{transform:scaleY(.3)}50%{transform:scaleY(1)}}");

// node_modules/@uiball/loaders/dist/components/Pulsar.js
var import_react3 = __toESM(require_react(), 1);
var i = "Pulsar-module_container__iLGP9";
function o3(a14) {
  let { size: o7 = 40, color: s4 = "black", speed: t10 = 1.75 } = a14;
  return e("Pulsar", "size", o7, "number"), e("Pulsar", "color", s4, "string"), e("Pulsar", "speed", t10, "number"), import_react3.default.createElement("div", { className: i, style: { "--uib-size": o7 + "px", "--uib-color": s4, "--uib-speed": t10 + "s" } });
}
e2('.Pulsar-module_container__iLGP9{height:var(--uib-size);position:relative;width:var(--uib-size)}.Pulsar-module_container__iLGP9:after,.Pulsar-module_container__iLGP9:before{animation:Pulsar-module_pulse__HlmYe var(--uib-speed) ease-in-out infinite;background-color:var(--uib-color);border-radius:50%;content:"";height:100%;left:0;position:absolute;top:0;transform:scale(0);width:100%}.Pulsar-module_container__iLGP9:after{animation-delay:calc(var(--uib-speed)/-2)}@keyframes Pulsar-module_pulse__HlmYe{0%,to{opacity:1;transform:scale(0)}50%{opacity:.25;transform:scale(1)}}');

// node_modules/@uiball/loaders/dist/components/Ping.js
var import_react4 = __toESM(require_react(), 1);
var r2 = "Ping-module_container__65lKE";
function t3(o7) {
  let { size: t10 = 45, color: a14 = "black", speed: n7 = 2 } = o7;
  return e("Ping", "size", t10, "number"), e("Ping", "color", a14, "string"), e("Ping", "speed", n7, "number"), import_react4.default.createElement("div", { className: r2, style: { "--uib-size": t10 + "px", "--uib-color": a14, "--uib-speed": n7 + "s" } });
}
e2('.Ping-module_container__65lKE{height:var(--uib-size);position:relative;width:var(--uib-size)}.Ping-module_container__65lKE:after,.Ping-module_container__65lKE:before{animation:Ping-module_pulse__6WP1M var(--uib-speed) linear infinite;background-color:var(--uib-color);border-radius:50%;content:"";height:100%;left:0;opacity:0;position:absolute;top:0;transform:scale(0);width:100%}.Ping-module_container__65lKE:after{animation-delay:calc(var(--uib-speed)/-2)}@keyframes Ping-module_pulse__6WP1M{0%{opacity:1;transform:scale(0)}to{opacity:0;transform:scale(1)}}');

// node_modules/@uiball/loaders/dist/components/Ripples.js
var import_react5 = __toESM(require_react(), 1);
var a = "Ripples-module_container__GMgBp";
var l = "Ripples-module_dot__fancY";
function p(o7) {
  let { size: p2 = 45, color: s4 = "black", speed: t10 = 2 } = o7;
  return e("Ripples", "size", p2, "number"), e("Ripples", "color", s4, "string"), e("Ripples", "speed", t10, "number"), import_react5.default.createElement("div", { className: a, style: { "--uib-size": p2 + "px", "--uib-color": s4, "--uib-speed": t10 + "s" } }, import_react5.default.createElement("div", { className: l }));
}
e2('.Ripples-module_container__GMgBp{height:var(--uib-size);position:relative;width:var(--uib-size)}.Ripples-module_container__GMgBp:after,.Ripples-module_container__GMgBp:before,.Ripples-module_dot__fancY:after,.Ripples-module_dot__fancY:before{animation:Ripples-module_pulse__exp9o var(--uib-speed) linear infinite;background-color:var(--uib-color);border-radius:50%;content:"";height:100%;left:0;opacity:0;position:absolute;top:0;transform:scale(0);width:100%}.Ripples-module_container__GMgBp:after{animation-delay:calc(var(--uib-speed)/-4)}.Ripples-module_dot__fancY:before{animation-delay:calc(var(--uib-speed)*-.5)}.Ripples-module_dot__fancY:after{animation-delay:calc(var(--uib-speed)*-.75)}@keyframes Ripples-module_pulse__exp9o{0%{opacity:1;transform:scale(0)}to{opacity:0;transform:scale(1)}}');

// node_modules/@uiball/loaders/dist/components/ThreeBody.js
var import_react6 = __toESM(require_react(), 1);
var r3 = "ThreeBody-module_container__zwmpn";
var a2 = "ThreeBody-module_dot__a-77j";
function i2(t10) {
  let { size: i11 = 35, color: d = "black", speed: n7 = 1.1 } = t10;
  return e("ThreeBody", "size", i11, "number"), e("ThreeBody", "color", d, "string"), e("ThreeBody", "speed", n7, "number"), import_react6.default.createElement("div", { className: r3, style: { "--uib-size": i11 + "px", "--uib-color": d, "--uib-speed": n7 + "s" } }, import_react6.default.createElement("div", { className: a2 }), import_react6.default.createElement("div", { className: a2 }), import_react6.default.createElement("div", { className: a2 }));
}
e2('.ThreeBody-module_container__zwmpn{animation:ThreeBody-module_spin__MnSMQ calc(var(--uib-speed)*2.5) infinite linear;display:inline-block;height:var(--uib-size);position:relative;width:var(--uib-size)}.ThreeBody-module_dot__a-77j{height:100%;position:absolute;width:30%}.ThreeBody-module_dot__a-77j:after{background-color:var(--uib-color);border-radius:50%;content:"";height:0;padding-bottom:100%;position:absolute;width:100%}.ThreeBody-module_dot__a-77j:first-child{bottom:5%;left:0;transform:rotate(60deg);transform-origin:50% 85%}.ThreeBody-module_dot__a-77j:first-child:after{animation:ThreeBody-module_wobble1__yeW4k var(--uib-speed) infinite ease-in-out;animation-delay:calc(var(--uib-speed)*-.3);bottom:0;left:0}.ThreeBody-module_dot__a-77j:nth-child(2){bottom:5%;right:0;transform:rotate(-60deg);transform-origin:50% 85%}.ThreeBody-module_dot__a-77j:nth-child(2):after{animation:ThreeBody-module_wobble1__yeW4k var(--uib-speed) infinite calc(var(--uib-speed)*-.15) ease-in-out;bottom:0;left:0}.ThreeBody-module_dot__a-77j:nth-child(3){bottom:-5%;left:0;transform:translateX(116.666%)}.ThreeBody-module_dot__a-77j:nth-child(3):after{animation:ThreeBody-module_wobble2__t-bwC var(--uib-speed) infinite ease-in-out;left:0;top:0}@keyframes ThreeBody-module_spin__MnSMQ{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes ThreeBody-module_wobble1__yeW4k{0%,to{opacity:1;transform:translateY(0) scale(1)}50%{opacity:.8;transform:translateY(-66%) scale(.65)}}@keyframes ThreeBody-module_wobble2__t-bwC{0%,to{opacity:1;transform:translateY(0) scale(1)}50%{opacity:.8;transform:translateY(66%) scale(.65)}}');

// node_modules/@uiball/loaders/dist/components/Orbit.js
var import_react7 = __toESM(require_react(), 1);
var e9 = "Orbit-module_container__EECud";
function i3(t10) {
  let { size: i11 = 25, color: s4 = "black", speed: c = 1.5 } = t10;
  return e("Orbit", "size", i11, "number"), e("Orbit", "color", s4, "string"), e("Orbit", "speed", c, "number"), import_react7.default.createElement("div", { className: e9, style: { "--uib-size": i11 + "px", "--uib-color": s4, "--uib-speed": c + "s" } });
}
e2('.Orbit-module_container__EECud{align-items:center;display:flex;height:var(--uib-size);justify-content:center;position:relative;width:var(--uib-size)}.Orbit-module_container__EECud:after,.Orbit-module_container__EECud:before{background-color:var(--uib-color);border-radius:50%;content:"";flex-shrink:0;height:60%;position:absolute;width:60%}.Orbit-module_container__EECud:before{animation:Orbit-module_orbit__MW-0b var(--uib-speed) linear infinite}.Orbit-module_container__EECud:after{animation:Orbit-module_orbit__MW-0b var(--uib-speed) linear calc(var(--uib-speed)/-2) infinite}@keyframes Orbit-module_orbit__MW-0b{0%{opacity:.65;transform:translate(calc(var(--uib-size)*.5)) scale(.73684)}5%{opacity:.58;transform:translate(calc(var(--uib-size)*.4)) scale(.684208)}10%{opacity:.51;transform:translate(calc(var(--uib-size)*.3)) scale(.631576)}15%{opacity:.44;transform:translate(calc(var(--uib-size)*.2)) scale(.578944)}20%{opacity:.37;transform:translate(calc(var(--uib-size)*.1)) scale(.526312)}25%{opacity:.3;transform:translate(0) scale(.47368)}30%{opacity:.37;transform:translate(calc(var(--uib-size)*-.1)) scale(.526312)}35%{opacity:.44;transform:translate(calc(var(--uib-size)*-.2)) scale(.578944)}40%{opacity:.51;transform:translate(calc(var(--uib-size)*-.3)) scale(.631576)}45%{opacity:.58;transform:translate(calc(var(--uib-size)*-.4)) scale(.684208)}50%{opacity:.65;transform:translate(calc(var(--uib-size)*-.5)) scale(.73684)}55%{opacity:.72;transform:translate(calc(var(--uib-size)*-.4)) scale(.789472)}60%{opacity:.79;transform:translate(calc(var(--uib-size)*-.3)) scale(.842104)}65%{opacity:.86;transform:translate(calc(var(--uib-size)*-.2)) scale(.894736)}70%{opacity:.93;transform:translate(calc(var(--uib-size)*-.1)) scale(.947368)}75%{opacity:1;transform:translate(0) scale(1)}80%{opacity:.93;transform:translate(calc(var(--uib-size)*.1)) scale(.947368)}85%{opacity:.86;transform:translate(calc(var(--uib-size)*.2)) scale(.894736)}90%{opacity:.79;transform:translate(calc(var(--uib-size)*.3)) scale(.842104)}95%{opacity:.72;transform:translate(calc(var(--uib-size)*.4)) scale(.789472)}to{opacity:.65;transform:translate(calc(var(--uib-size)*.5)) scale(.73684)}}');

// node_modules/@uiball/loaders/dist/components/ChaoticOrbit.js
var import_react8 = __toESM(require_react(), 1);
var r4 = "ChaoticOrbit-module_container__viK6x";
function e10(i11) {
  let { size: e26 = 25, color: c = "black", speed: s4 = 1.5 } = i11;
  return e("ChaoticOrbit", "size", e26, "number"), e("ChaoticOrbit", "color", c, "string"), e("ChaoticOrbit", "speed", s4, "number"), import_react8.default.createElement("div", { className: r4, style: { "--uib-size": e26 + "px", "--uib-color": c, "--uib-speed": s4 + "s" } });
}
e2('.ChaoticOrbit-module_container__viK6x{align-items:center;animation:ChaoticOrbit-module_rotate__EiQQN calc(var(--uib-speed)*1.667) infinite linear;display:flex;height:var(--uib-size);justify-content:center;position:relative;width:var(--uib-size)}.ChaoticOrbit-module_container__viK6x:after,.ChaoticOrbit-module_container__viK6x:before{background-color:var(--uib-color);border-radius:50%;content:"";flex-shrink:0;height:60%;position:absolute;width:60%}.ChaoticOrbit-module_container__viK6x:before{animation:ChaoticOrbit-module_orbit__7gDLi var(--uib-speed) linear infinite}.ChaoticOrbit-module_container__viK6x:after{animation:ChaoticOrbit-module_orbit__7gDLi var(--uib-speed) linear calc(var(--uib-speed)/-2) infinite}@keyframes ChaoticOrbit-module_rotate__EiQQN{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}@keyframes ChaoticOrbit-module_orbit__7gDLi{0%{opacity:.65;transform:translate(calc(var(--uib-size)*.5)) scale(.73684)}5%{opacity:.58;transform:translate(calc(var(--uib-size)*.4)) scale(.684208)}10%{opacity:.51;transform:translate(calc(var(--uib-size)*.3)) scale(.631576)}15%{opacity:.44;transform:translate(calc(var(--uib-size)*.2)) scale(.578944)}20%{opacity:.37;transform:translate(calc(var(--uib-size)*.1)) scale(.526312)}25%{opacity:.3;transform:translate(0) scale(.47368)}30%{opacity:.37;transform:translate(calc(var(--uib-size)*-.1)) scale(.526312)}35%{opacity:.44;transform:translate(calc(var(--uib-size)*-.2)) scale(.578944)}40%{opacity:.51;transform:translate(calc(var(--uib-size)*-.3)) scale(.631576)}45%{opacity:.58;transform:translate(calc(var(--uib-size)*-.4)) scale(.684208)}50%{opacity:.65;transform:translate(calc(var(--uib-size)*-.5)) scale(.73684)}55%{opacity:.72;transform:translate(calc(var(--uib-size)*-.4)) scale(.789472)}60%{opacity:.79;transform:translate(calc(var(--uib-size)*-.3)) scale(.842104)}65%{opacity:.86;transform:translate(calc(var(--uib-size)*-.2)) scale(.894736)}70%{opacity:.93;transform:translate(calc(var(--uib-size)*-.1)) scale(.947368)}75%{opacity:1;transform:translate(0) scale(1)}80%{opacity:.93;transform:translate(calc(var(--uib-size)*.1)) scale(.947368)}85%{opacity:.86;transform:translate(calc(var(--uib-size)*.2)) scale(.894736)}90%{opacity:.79;transform:translate(calc(var(--uib-size)*.3)) scale(.842104)}95%{opacity:.72;transform:translate(calc(var(--uib-size)*.4)) scale(.789472)}to{opacity:.65;transform:translate(calc(var(--uib-size)*.5)) scale(.73684)}}');

// node_modules/@uiball/loaders/dist/components/SuperBalls.js
var import_react9 = __toESM(require_react(), 1);
var t4 = "SuperBalls-module_container__snRQD";
var l2 = "SuperBalls-module_electron__w53nG";
function s(r14) {
  let { size: s4 = 45, color: i11 = "black", speed: c = 1.4 } = r14;
  return e("SuperBalls", "size", s4, "number"), e("SuperBalls", "color", i11, "string"), e("SuperBalls", "speed", c, "number"), import_react9.default.createElement("div", { className: t4, style: { "--uib-size": s4 + "px", "--uib-color": i11, "--uib-speed": c + "s" } }, import_react9.default.createElement("div", { className: l2 }), import_react9.default.createElement("div", { className: l2 }));
}
e2('.SuperBalls-module_container__snRQD{align-items:center;display:flex;height:var(--uib-size);justify-content:center;position:relative;width:var(--uib-size)}.SuperBalls-module_electron__w53nG{align-items:center;display:flex;height:100%;justify-content:center;left:0;position:absolute;top:0;width:100%}.SuperBalls-module_electron__w53nG:before{background-color:var(--uib-color);border-radius:50%;content:"";flex-shrink:0;height:35%;width:35%}.SuperBalls-module_electron__w53nG:first-child{transform:rotate(45deg)}.SuperBalls-module_electron__w53nG:first-child:before{animation:SuperBalls-module_orbit__OQtrA var(--uib-speed) linear calc(var(--uib-speed)*-.143) infinite}.SuperBalls-module_electron__w53nG:nth-child(2){transform:rotate(-45deg)}.SuperBalls-module_electron__w53nG:nth-child(2):before{animation:SuperBalls-module_orbit__OQtrA var(--uib-speed) linear calc(var(--uib-speed)/-2) infinite}@keyframes SuperBalls-module_orbit__OQtrA{0%{opacity:.65;transform:translate(calc(var(--uib-size)*.5)) scale(.73684)}5%{opacity:.58;transform:translate(calc(var(--uib-size)*.4)) scale(.684208)}10%{opacity:.51;transform:translate(calc(var(--uib-size)*.3)) scale(.631576)}15%{opacity:.44;transform:translate(calc(var(--uib-size)*.2)) scale(.578944)}20%{opacity:.37;transform:translate(calc(var(--uib-size)*.1)) scale(.526312)}25%{opacity:.3;transform:translate(0) scale(.47368)}30%{opacity:.37;transform:translate(calc(var(--uib-size)*-.1)) scale(.526312)}35%{opacity:.44;transform:translate(calc(var(--uib-size)*-.2)) scale(.578944)}40%{opacity:.51;transform:translate(calc(var(--uib-size)*-.3)) scale(.631576)}45%{opacity:.58;transform:translate(calc(var(--uib-size)*-.4)) scale(.684208)}50%{opacity:.65;transform:translate(calc(var(--uib-size)*-.5)) scale(.73684)}55%{opacity:.72;transform:translate(calc(var(--uib-size)*-.4)) scale(.789472)}60%{opacity:.79;transform:translate(calc(var(--uib-size)*-.3)) scale(.842104)}65%{opacity:.86;transform:translate(calc(var(--uib-size)*-.2)) scale(.894736)}70%{opacity:.93;transform:translate(calc(var(--uib-size)*-.1)) scale(.947368)}75%{opacity:1;transform:translate(0) scale(1)}80%{opacity:.93;transform:translate(calc(var(--uib-size)*.1)) scale(.947368)}85%{opacity:.86;transform:translate(calc(var(--uib-size)*.2)) scale(.894736)}90%{opacity:.79;transform:translate(calc(var(--uib-size)*.3)) scale(.842104)}95%{opacity:.72;transform:translate(calc(var(--uib-size)*.4)) scale(.789472)}to{opacity:.65;transform:translate(calc(var(--uib-size)*.5)) scale(.73684)}}');

// node_modules/@uiball/loaders/dist/components/Wobble.js
var import_react10 = __toESM(require_react(), 1);
var t5 = "Wobble-module_container__db3A-";
function i4(r14) {
  let { size: i11 = 45, color: a14 = "black", speed: b = 0.9 } = r14;
  return e("Wobble", "size", i11, "number"), e("Wobble", "color", a14, "string"), e("Wobble", "speed", b, "number"), import_react10.default.createElement("div", { className: t5, style: { "--uib-size": i11 + "px", "--uib-color": a14, "--uib-speed": b + "s" } });
}
e2('.Wobble-module_container__db3A-{align-items:center;display:flex;height:var(--uib-size);justify-content:flex-start;position:relative;width:var(--uib-size)}.Wobble-module_container__db3A-:before{animation:Wobble-module_wobble__y6EQa var(--uib-speed) ease-in-out infinite;background-color:var(--uib-color);border-radius:50%;content:"";height:25%;transform:translateY(calc(var(--uib-size)*-.4));width:25%}@keyframes Wobble-module_wobble__y6EQa{0%,to{transform:translateX(0)}50%{transform:translateX(calc(var(--uib-size)*.75))}}');

// node_modules/@uiball/loaders/dist/components/Metronome.js
var import_react11 = __toESM(require_react(), 1);
var a6 = "Metronome-module_container__-pwcV";
var r5 = "Metronome-module_dot__apNmF";
function i5(o7) {
  let { size: i11 = 40, color: m = "black", speed: n7 = 1.6 } = o7;
  return e("Metronome", "size", i11, "number"), e("Metronome", "color", m, "string"), e("Metronome", "speed", n7, "number"), import_react11.default.createElement("div", { className: a6, style: { "--uib-size": i11 + "px", "--uib-color": m, "--uib-speed": n7 + "s" } }, import_react11.default.createElement("div", { className: r5 }), import_react11.default.createElement("div", { className: r5 }), import_react11.default.createElement("div", { className: r5 }), import_react11.default.createElement("div", { className: r5 }));
}
e2('.Metronome-module_container__-pwcV{align-items:center;display:flex;height:var(--uib-size);justify-content:flex-start;position:relative;width:var(--uib-size)}.Metronome-module_dot__apNmF{align-items:center;animation:Metronome-module_swing__VxNuU var(--uib-speed) linear infinite;display:flex;height:100%;justify-content:flex-start;left:0;position:absolute;top:13.5%;width:100%}.Metronome-module_dot__apNmF:before{background-color:var(--uib-color);border-radius:50%;content:"";height:25%;width:25%}.Metronome-module_dot__apNmF:first-child{animation-delay:calc(var(--uib-speed)*-.36)}.Metronome-module_dot__apNmF:nth-child(2){animation-delay:calc(var(--uib-speed)*-.27);opacity:.8}.Metronome-module_dot__apNmF:nth-child(2):before{transform:scale(.9)}.Metronome-module_dot__apNmF:nth-child(3){animation-delay:calc(var(--uib-speed)*-.18);opacity:.6}.Metronome-module_dot__apNmF:nth-child(3):before{transform:scale(.8)}.Metronome-module_dot__apNmF:nth-child(4){animation-delay:calc(var(--uib-speed)*-.09);opacity:.4}.Metronome-module_dot__apNmF:nth-child(4):before{transform:scale(.7)}@keyframes Metronome-module_swing__VxNuU{0%{transform:rotate(0deg)}15%{transform:rotate(0deg)}50%{transform:rotate(180deg)}65%{transform:rotate(180deg)}to{transform:rotate(0deg)}}');

// node_modules/@uiball/loaders/dist/components/DotWave.js
var import_react12 = __toESM(require_react(), 1);
var i6 = "DotWave-module_container__s1Aiz";
var o4 = "DotWave-module_dot__8LtwH";
function s2(a14) {
  let { size: s4 = 47, color: d = "black", speed: r14 = 1 } = a14;
  return e("DotWave", "size", s4, "number"), e("DotWave", "color", d, "string"), e("DotWave", "speed", r14, "number"), import_react12.default.createElement("div", { className: i6, style: { "--uib-size": s4 + "px", "--uib-color": d, "--uib-speed": r14 + "s" } }, import_react12.default.createElement("div", { className: o4 }), import_react12.default.createElement("div", { className: o4 }), import_react12.default.createElement("div", { className: o4 }), import_react12.default.createElement("div", { className: o4 }));
}
e2(".DotWave-module_container__s1Aiz{align-items:flex-end;display:flex;height:calc(var(--uib-size)*.5);justify-content:space-between;width:var(--uib-size)}.DotWave-module_dot__8LtwH{background-color:var(--uib-color);border-radius:50%;flex-shrink:0;height:calc(var(--uib-size)*.17);width:calc(var(--uib-size)*.17)}.DotWave-module_dot__8LtwH:first-child{animation:DotWave-module_jump__eYFYd var(--uib-speed) ease-in-out calc(var(--uib-speed)*-.45) infinite}.DotWave-module_dot__8LtwH:nth-child(2){animation:DotWave-module_jump__eYFYd var(--uib-speed) ease-in-out calc(var(--uib-speed)*-.3) infinite}.DotWave-module_dot__8LtwH:nth-child(3){animation:DotWave-module_jump__eYFYd var(--uib-speed) ease-in-out calc(var(--uib-speed)*-.15) infinite}.DotWave-module_dot__8LtwH:nth-child(4){animation:DotWave-module_jump__eYFYd var(--uib-speed) ease-in-out infinite}@keyframes DotWave-module_jump__eYFYd{0%,to{transform:translateY(0)}50%{transform:translateY(-200%)}}");

// node_modules/@uiball/loaders/dist/components/DotPulse.js
var import_react13 = __toESM(require_react(), 1);
var s3 = "DotPulse-module_container__Q1oww";
var i7 = "DotPulse-module_dot__P2HVz";
function l3(t10) {
  let { size: l5 = 40, color: a14 = "black", speed: u = 1.3 } = t10;
  return e("DotPulse", "size", l5, "number"), e("DotPulse", "color", a14, "string"), e("DotPulse", "speed", u, "number"), import_react13.default.createElement("div", { className: s3, style: { "--uib-size": l5 + "px", "--uib-color": a14, "--uib-speed": u + "s" } }, import_react13.default.createElement("div", { className: i7 }));
}
e2('.DotPulse-module_container__Q1oww{align-items:center;display:flex;height:calc(var(--uib-size)*.27);justify-content:space-between;position:relative;width:var(--uib-size)}.DotPulse-module_container__Q1oww:after,.DotPulse-module_container__Q1oww:before,.DotPulse-module_dot__P2HVz{background-color:var(--uib-color);border-radius:50%;content:"";display:block;height:calc(var(--uib-size)*.18);transform:scale(0);width:calc(var(--uib-size)*.18)}.DotPulse-module_container__Q1oww:before{animation:DotPulse-module_pulse__DbFpM var(--uib-speed) ease-in-out infinite}.DotPulse-module_dot__P2HVz{animation:DotPulse-module_pulse__DbFpM var(--uib-speed) ease-in-out calc(var(--uib-speed)*.125) infinite both}.DotPulse-module_container__Q1oww:after{animation:DotPulse-module_pulse__DbFpM var(--uib-speed) ease-in-out calc(var(--uib-speed)*.25) infinite}@keyframes DotPulse-module_pulse__DbFpM{0%,to{transform:scale(0)}50%{transform:scale(1.5)}}');

// node_modules/@uiball/loaders/dist/components/LeapFrog.js
var import_react14 = __toESM(require_react(), 1);
var r6 = "LeapFrog-module_container__XNG48";
var o5 = "LeapFrog-module_dot__Jkx1u";
function i8(t10) {
  let { size: i11 = 40, color: s4 = "black", speed: l5 = 2.5 } = t10;
  return e("LeapFrog", "size", i11, "number"), e("LeapFrog", "color", s4, "string"), e("LeapFrog", "speed", l5, "number"), import_react14.default.createElement("div", { className: r6, style: { "--uib-size": i11 + "px", "--uib-color": s4, "--uib-speed": l5 + "s" } }, import_react14.default.createElement("div", { className: o5 }), import_react14.default.createElement("div", { className: o5 }), import_react14.default.createElement("div", { className: o5 }));
}
e2('.LeapFrog-module_container__XNG48{align-items:center;display:flex;height:var(--uib-size);justify-content:space-between;position:relative;width:var(--uib-size)}.LeapFrog-module_dot__Jkx1u{align-items:center;display:flex;height:100%;justify-content:flex-start;left:0;position:absolute;top:0;width:100%}.LeapFrog-module_dot__Jkx1u:before{background-color:var(--uib-color);border-radius:50%;content:"";display:block;height:calc(var(--uib-size)*.22);width:calc(var(--uib-size)*.22)}.LeapFrog-module_dot__Jkx1u:first-child{animation:LeapFrog-module_leapFrog__umJ9T var(--uib-speed) ease infinite}.LeapFrog-module_dot__Jkx1u:nth-child(2){animation:LeapFrog-module_leapFrog__umJ9T var(--uib-speed) ease calc(var(--uib-speed)/-1.5) infinite;transform:translateX(calc(var(--uib-size)*.4))}.LeapFrog-module_dot__Jkx1u:nth-child(3){animation:LeapFrog-module_leapFrog__umJ9T var(--uib-speed) ease calc(var(--uib-speed)/-3) infinite;transform:translateX(calc(var(--uib-size)*.8)) rotate(0deg)}@keyframes LeapFrog-module_leapFrog__umJ9T{0%{transform:translateX(0) rotate(0deg)}33.333%{transform:translateX(0) rotate(180deg)}66.666%{transform:translateX(calc(var(--uib-size)*-.4)) rotate(180deg)}99.999%{transform:translateX(calc(var(--uib-size)*-.8)) rotate(180deg)}to{transform:translateX(0) rotate(0deg)}}');

// node_modules/@uiball/loaders/dist/components/NewtonsCradle.js
var import_react15 = __toESM(require_react(), 1);
var n = "NewtonsCradle-module_container__yvLC6";
var a7 = "NewtonsCradle-module_dot__R8MrQ";
function r7(i11) {
  let { size: r14 = 40, color: o7 = "black", speed: s4 = 1.4 } = i11;
  return e("NewtonsCradle", "size", r14, "number"), e("NewtonsCradle", "color", o7, "string"), e("NewtonsCradle", "speed", s4, "number"), import_react15.default.createElement("div", { className: n, style: { "--uib-size": r14 + "px", "--uib-color": o7, "--uib-speed": s4 + "s" } }, import_react15.default.createElement("div", { className: a7 }), import_react15.default.createElement("div", { className: a7 }), import_react15.default.createElement("div", { className: a7 }), import_react15.default.createElement("div", { className: a7 }));
}
e2('.NewtonsCradle-module_container__yvLC6{align-items:center;display:flex;height:var(--uib-size);justify-content:center;position:relative;width:var(--uib-size)}.NewtonsCradle-module_dot__R8MrQ{align-items:center;display:flex;height:100%;position:relative;transform-origin:center top;width:25%}.NewtonsCradle-module_dot__R8MrQ:after{background-color:var(--uib-color);border-radius:50%;content:"";display:block;height:25%;width:100%}.NewtonsCradle-module_dot__R8MrQ:first-child{animation:NewtonsCradle-module_swing__tWgDv var(--uib-speed) linear infinite}.NewtonsCradle-module_dot__R8MrQ:last-child{animation:NewtonsCradle-module_swing2__rnCq2 var(--uib-speed) linear infinite}@keyframes NewtonsCradle-module_swing__tWgDv{0%{animation-timing-function:ease-out;transform:rotate(0deg)}25%{animation-timing-function:ease-in;transform:rotate(70deg)}50%{animation-timing-function:linear;transform:rotate(0deg)}}@keyframes NewtonsCradle-module_swing2__rnCq2{0%{animation-timing-function:linear;transform:rotate(0deg)}50%{animation-timing-function:ease-out;transform:rotate(0deg)}75%{animation-timing-function:ease-in;transform:rotate(-70deg)}}');

// node_modules/@uiball/loaders/dist/components/Momentum.js
var import_react16 = __toESM(require_react(), 1);
var r8 = "Momentum-module_container__Yyu8l";
function n2(o7) {
  let { size: n7 = 40, color: a14 = "black", speed: m = 1.1 } = o7;
  return e("Momentum", "size", n7, "number"), e("Momentum", "color", a14, "string"), e("Momentum", "speed", m, "number"), import_react16.default.createElement("div", { className: r8, style: { "--uib-size": n7 + "px", "--uib-color": a14, "--uib-speed": m + "s" } });
}
e2('.Momentum-module_container__Yyu8l{align-items:center;animation:Momentum-module_rotate__B3XSB var(--uib-speed) linear infinite;display:flex;height:var(--uib-size);justify-content:center;position:relative;width:var(--uib-size)}.Momentum-module_container__Yyu8l:after,.Momentum-module_container__Yyu8l:before{background-color:var(--uib-color);border-radius:50%;content:"";height:25%;width:25%}.Momentum-module_container__Yyu8l:before{animation:Momentum-module_wobble2__8LzCM calc(var(--uib-speed)*1.25) ease-in-out infinite}.Momentum-module_container__Yyu8l:after{animation:Momentum-module_wobble__3Yjup calc(var(--uib-speed)*1.25) ease-in-out infinite}.Momentum-module_container__Yyu8l:before{margin-right:10%}@keyframes Momentum-module_wobble__3Yjup{0%,to{transform:translateX(0)}50%{transform:translateX(calc(var(--uib-size)*.2)) scale(1.1)}}@keyframes Momentum-module_wobble2__8LzCM{0%,to{transform:translateX(0)}50%{transform:translateX(calc(var(--uib-size)*-.2)) scale(1.1)}}@keyframes Momentum-module_rotate__B3XSB{0%{transform:rotate(0deg)}to{transform:rotate(1turn)}}');

// node_modules/@uiball/loaders/dist/components/Jelly.js
var import_react17 = __toESM(require_react(), 1);
var r9 = "Jelly-module_container__LB5dG";
var a8 = "Jelly-module_svg__Ae81n";
function i9(t10) {
  let { size: i11 = 50, color: o7 = "black", speed: n7 = 0.9 } = t10;
  return e("Jelly", "size", i11, "number"), e("Jelly", "color", o7, "string"), e("Jelly", "speed", n7, "number"), import_react17.default.createElement(import_react17.default.Fragment, null, import_react17.default.createElement("div", { className: r9, style: { "--uib-size": i11 + "px", "--uib-color": o7, "--uib-speed": n7 + "s" } }), import_react17.default.createElement("svg", { width: "0", height: "0", className: a8 }, import_react17.default.createElement("defs", null, import_react17.default.createElement("filter", { id: "uib-jelly-ooze" }, import_react17.default.createElement("feGaussianBlur", { in: "SourceGraphic", stdDeviation: i11 / 8, result: "blur" }), import_react17.default.createElement("feColorMatrix", { in: "blur", mode: "matrix", values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7", result: "ooze" }), import_react17.default.createElement("feBlend", { in: "SourceGraphic", in2: "ooze" })))));
}
e2('.Jelly-module_container__LB5dG{animation:Jelly-module_rotate__gDXQZ calc(var(--uib-speed)*2) linear infinite;filter:url(#uib-jelly-ooze);height:calc(var(--uib-size)/2);position:relative;width:var(--uib-size);will-change:transform}.Jelly-module_container__LB5dG:after,.Jelly-module_container__LB5dG:before{background:var(--uib-color);border-radius:100%;content:"";height:100%;left:25%;position:absolute;top:0;width:50%;will-change:transform}.Jelly-module_container__LB5dG:before{animation:Jelly-module_shift-left__20PCG var(--uib-speed) ease infinite}.Jelly-module_container__LB5dG:after{animation:Jelly-module_shift-right__WCf3m var(--uib-speed) ease infinite}.Jelly-module_svg__Ae81n{height:0;position:absolute;width:0}@keyframes Jelly-module_rotate__gDXQZ{0%,49.999%,to{transform:none}50%,99.999%{transform:rotate(90deg)}}@keyframes Jelly-module_shift-left__20PCG{0%,to{transform:translateX(0)}50%{transform:scale(.65) translateX(-75%)}}@keyframes Jelly-module_shift-right__WCf3m{0%,to{transform:translateX(0)}50%{transform:scale(.65) translateX(75%)}}');

// node_modules/@uiball/loaders/dist/components/JellyTriangle.js
var import_react18 = __toESM(require_react(), 1);
var r10 = "JellyTriangle-module_container__4ehF3";
var a9 = "JellyTriangle-module_dot__2Eie0";
var t6 = "JellyTriangle-module_traveler__ypmB8";
var n3 = "JellyTriangle-module_svg__9e8PL";
function o6(i11) {
  let { size: o7 = 44, color: s4 = "black", speed: m = 1.75 } = i11;
  return e("JellyTriangle", "size", o7, "number"), e("JellyTriangle", "color", s4, "string"), e("JellyTriangle", "speed", m, "number"), import_react18.default.createElement(import_react18.default.Fragment, null, import_react18.default.createElement("div", { className: r10, style: { "--uib-size": o7 + "px", "--uib-color": s4, "--uib-speed": m + "s" } }, import_react18.default.createElement("div", { className: a9 }), import_react18.default.createElement("div", { className: t6 })), import_react18.default.createElement("svg", { width: "0", height: "0", className: n3 }, import_react18.default.createElement("defs", null, import_react18.default.createElement("filter", { id: "uib-jelly-triangle-ooze" }, import_react18.default.createElement("feGaussianBlur", { in: "SourceGraphic", stdDeviation: o7 / 6, result: "blur" }), import_react18.default.createElement("feColorMatrix", { in: "blur", mode: "matrix", values: "1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7", result: "ooze" }), import_react18.default.createElement("feBlend", { in: "SourceGraphic", in2: "ooze" })))));
}
e2('.JellyTriangle-module_container__4ehF3{filter:url(#uib-jelly-triangle-ooze);height:var(--uib-size);position:relative;width:var(--uib-size)}.JellyTriangle-module_container__4ehF3:after,.JellyTriangle-module_container__4ehF3:before,.JellyTriangle-module_dot__2Eie0{background:var(--uib-color);border-radius:100%;content:"";height:33%;position:absolute;width:33%;will-change:transform}.JellyTriangle-module_dot__2Eie0{animation:JellyTriangle-module_grow__hs2if var(--uib-speed) ease infinite;left:30%;top:6%}.JellyTriangle-module_container__4ehF3:before{animation:JellyTriangle-module_grow__hs2if var(--uib-speed) ease calc(var(--uib-speed)*-.666) infinite;bottom:6%;right:0}.JellyTriangle-module_container__4ehF3:after{animation:JellyTriangle-module_grow__hs2if var(--uib-speed) ease calc(var(--uib-speed)*-.333) infinite;bottom:6%;left:0}.JellyTriangle-module_traveler__ypmB8{animation:JellyTriangle-module_triangulate__8nYye var(--uib-speed) ease infinite;background:var(--uib-color);border-radius:100%;height:33%;left:30%;position:absolute;top:6%;width:33%}.JellyTriangle-module_svg__9e8PL{height:0;position:absolute;width:0}@keyframes JellyTriangle-module_triangulate__8nYye{0%,to{transform:none}33.333%{transform:translate(120%,175%)}66.666%{transform:translate(-95%,175%)}}@keyframes JellyTriangle-module_grow__hs2if{0%,to{transform:scale(1.5)}20%,70%{transform:none}}');

// node_modules/@uiball/loaders/dist/components/DotSpinner.js
var import_react19 = __toESM(require_react(), 1);
var n4 = "DotSpinner-module_container__KTuXu";
var i10 = "DotSpinner-module_dot__-MwLA";
function a10(o7) {
  let { size: a14 = 40, color: r14 = "black", speed: d = 0.9 } = o7;
  return e("DotSpinner", "size", a14, "number"), e("DotSpinner", "color", r14, "string"), e("DotSpinner", "speed", d, "number"), import_react19.default.createElement("div", { className: n4, style: { "--uib-size": a14 + "px", "--uib-color": r14, "--uib-speed": d + "s" } }, import_react19.default.createElement("div", { className: i10 }), import_react19.default.createElement("div", { className: i10 }), import_react19.default.createElement("div", { className: i10 }), import_react19.default.createElement("div", { className: i10 }), import_react19.default.createElement("div", { className: i10 }), import_react19.default.createElement("div", { className: i10 }), import_react19.default.createElement("div", { className: i10 }), import_react19.default.createElement("div", { className: i10 }));
}
e2('.DotSpinner-module_container__KTuXu{align-items:center;display:flex;height:var(--uib-size);justify-content:flex-start;position:relative;width:var(--uib-size)}.DotSpinner-module_dot__-MwLA{align-items:center;display:flex;height:100%;justify-content:flex-start;left:0;position:absolute;top:0;width:100%}.DotSpinner-module_dot__-MwLA:before{animation:DotSpinner-module_pulse__uQSiw calc(var(--uib-speed)*1.111) ease-in-out infinite;background-color:var(--uib-color);border-radius:50%;content:"";height:20%;opacity:.5;transform:scale(0);width:20%}.DotSpinner-module_dot__-MwLA:nth-child(2){transform:rotate(45deg)}.DotSpinner-module_dot__-MwLA:nth-child(2):before{animation-delay:calc(var(--uib-speed)*-.875)}.DotSpinner-module_dot__-MwLA:nth-child(3){transform:rotate(90deg)}.DotSpinner-module_dot__-MwLA:nth-child(3):before{animation-delay:calc(var(--uib-speed)*-.75)}.DotSpinner-module_dot__-MwLA:nth-child(4){transform:rotate(135deg)}.DotSpinner-module_dot__-MwLA:nth-child(4):before{animation-delay:calc(var(--uib-speed)*-.625)}.DotSpinner-module_dot__-MwLA:nth-child(5){transform:rotate(180deg)}.DotSpinner-module_dot__-MwLA:nth-child(5):before{animation-delay:calc(var(--uib-speed)*-.5)}.DotSpinner-module_dot__-MwLA:nth-child(6){transform:rotate(225deg)}.DotSpinner-module_dot__-MwLA:nth-child(6):before{animation-delay:calc(var(--uib-speed)*-.375)}.DotSpinner-module_dot__-MwLA:nth-child(7){transform:rotate(270deg)}.DotSpinner-module_dot__-MwLA:nth-child(7):before{animation-delay:calc(var(--uib-speed)*-.25)}.DotSpinner-module_dot__-MwLA:nth-child(8){transform:rotate(315deg)}.DotSpinner-module_dot__-MwLA:nth-child(8):before{animation-delay:calc(var(--uib-speed)*-.125)}@keyframes DotSpinner-module_pulse__uQSiw{0%,to{opacity:.5;transform:scale(0)}50%{opacity:1;transform:scale(1)}}');

// node_modules/@uiball/loaders/dist/components/RaceBy.js
var import_react20 = __toESM(require_react(), 1);
var r11 = "RaceBy-module_container__pu79P";
function a11(i11) {
  let { size: a14 = 80, color: o7 = "black", lineWeight: n7 = 5, speed: c = 1.4 } = i11;
  return e("RaceBy", "size", a14, "number"), e("RaceBy", "color", o7, "string"), e("RaceBy", "speed", c, "number"), e("RaceBy", "lineWeight", n7, "number"), import_react20.default.createElement("div", { className: r11, style: { "--uib-size": a14 + "px", "--uib-color": o7, "--uib-line-weight": n7 + "px", "--uib-speed": c + "s" } });
}
e2('.RaceBy-module_container__pu79P{align-items:center;border-radius:calc(var(--uib-line-weight)/2);display:flex;height:var(--uib-line-weight);justify-content:center;overflow:hidden;position:relative;transform:translateZ(0);width:var(--uib-size)}.RaceBy-module_container__pu79P:before{background-color:var(--uib-color);content:"";height:100%;left:0;opacity:.1;position:absolute;top:0;width:100%}.RaceBy-module_container__pu79P:after{animation:RaceBy-module_raceBy__g-TGB var(--uib-speed) ease-in-out infinite;background-color:var(--uib-color);border-radius:calc(var(--uib-line-weight)/2);content:"";height:100%;transform:translateX(-100%);width:100%}@keyframes RaceBy-module_raceBy__g-TGB{0%{transform:translateX(-100%)}to{transform:translateX(100%)}}');

// node_modules/@uiball/loaders/dist/components/LineWobble.js
var import_react21 = __toESM(require_react(), 1);
var t7 = "LineWobble-module_container__IkLcd";
function r12(o7) {
  let { size: r14 = 80, color: n7 = "black", lineWeight: l5 = 5, speed: a14 = 1.75 } = o7;
  return e("LineWobble", "size", r14, "number"), e("LineWobble", "color", n7, "string"), e("LineWobble", "speed", a14, "number"), e("LineWobble", "lineWeight", l5, "number"), import_react21.default.createElement("div", { className: t7, style: { "--uib-size": r14 + "px", "--uib-color": n7, "--uib-line-weight": l5 + "px", "--uib-speed": a14 + "s" } });
}
e2('.LineWobble-module_container__IkLcd{align-items:center;border-radius:calc(var(--uib-line-weight)/2);display:flex;height:var(--uib-line-weight);justify-content:center;overflow:hidden;position:relative;transform:translateZ(0);width:var(--uib-size)}.LineWobble-module_container__IkLcd:before{background-color:var(--uib-color);content:"";height:100%;left:0;opacity:.1;position:absolute;top:0;width:100%}.LineWobble-module_container__IkLcd:after{animation:LineWobble-module_wobble__XpxDM var(--uib-speed) ease-in-out infinite;background-color:var(--uib-color);border-radius:calc(var(--uib-line-weight)/2);content:"";height:100%;transform:translateX(-95%);width:100%}@keyframes LineWobble-module_wobble__XpxDM{0%,to{transform:translateX(-95%)}50%{transform:translateX(95%)}}');

// node_modules/@uiball/loaders/dist/components/Handsprings.js
var import_react22 = __toESM(require_react(), 1);
var a12 = "Handsprings-module_container__nNwDF";
function n5(r14) {
  let { size: n7 = 37, color: t10 = "black", lineWeight: s4 = 5, speed: o7 = 2 } = r14;
  return e("Handsprings", "size", n7, "number"), e("Handsprings", "color", t10, "string"), e("Handsprings", "lineWeight", s4, "number"), e("Handsprings", "speed", o7, "number"), import_react22.default.createElement("div", { className: a12, style: { "--uib-size": n7 + "px", "--uib-color": t10, "--uib-line-weight": s4 + "px", "--uib-speed": o7 + "s" } });
}
e2('.Handsprings-module_container__nNwDF{align-items:center;animation:Handsprings-module_rotate__TaVHW var(--uib-speed) linear infinite;border-radius:calc(var(--uib-line-weight)/2);display:flex;height:var(--uib-line-weight);justify-content:center;margin-bottom:calc(var(--uib-size)*.65);overflow:hidden;position:relative;width:calc(var(--uib-size)*2)}.Handsprings-module_container__nNwDF:before{animation:Handsprings-module_wobble__6Xfea var(--uib-speed) ease-in-out calc(var(--uib-speed)*-.225) infinite;background-color:var(--uib-color);border-radius:calc(var(--uib-line-weight)/2);content:"";height:100%;transform:translateX(-120%);width:40%}@keyframes Handsprings-module_wobble__6Xfea{0%,to{transform:translateX(-120%)}50%{transform:translateX(120%)}}@keyframes Handsprings-module_rotate__TaVHW{0%{transform:translateY(calc(var(--uib-size)*-.125)) rotate(0deg)}to{transform:translateY(calc(var(--uib-size)*-.125)) rotate(1turn)}}');

// node_modules/@uiball/loaders/dist/components/Pinwheel.js
var import_react23 = __toESM(require_react(), 1);
var a13 = "Pinwheel-module_container__GGm-6";
var t8 = "Pinwheel-module_line__0NJWV";
function n6(l5) {
  let { size: n7 = 35, color: o7 = "black", lineWeight: r14 = 3.5, speed: c = 1 } = l5;
  return e("Pinwheel", "size", n7, "number"), e("Pinwheel", "color", o7, "string"), e("Pinwheel", "speed", c, "number"), e("Pinwheel", "lineWeight", r14, "number"), import_react23.default.createElement("div", { className: a13, style: { "--uib-size": n7 + "px", "--uib-color": o7, "--uib-line-weight": r14 + "px", "--uib-speed": c + "s" } }, import_react23.default.createElement("div", { className: t8 }), import_react23.default.createElement("div", { className: t8 }), import_react23.default.createElement("div", { className: t8 }), import_react23.default.createElement("div", { className: t8 }), import_react23.default.createElement("div", { className: t8 }), import_react23.default.createElement("div", { className: t8 }));
}
e2(".Pinwheel-module_container__GGm-6{align-items:center;display:flex;height:var(--uib-size);justify-content:center;position:relative;width:var(--uib-size)}.Pinwheel-module_line__0NJWV{animation:Pinwheel-module_rotate__Lqw4D var(--uib-speed) ease-in-out infinite;background-color:var(--uib-color);border-radius:calc(var(--uib-line-weight)/2);height:var(--uib-line-weight);left:0;position:absolute;top:calc(50% - var(--uib-line-weight)/2);width:100%}.Pinwheel-module_line__0NJWV:nth-child(2){animation-delay:calc(var(--uib-speed)*.075);opacity:.8}.Pinwheel-module_line__0NJWV:nth-child(3){animation-delay:calc(var(--uib-speed)*.15);opacity:.6}.Pinwheel-module_line__0NJWV:nth-child(4){animation-delay:calc(var(--uib-speed)*.225);opacity:.4}.Pinwheel-module_line__0NJWV:nth-child(5){animation-delay:calc(var(--uib-speed)*.3);opacity:.2}.Pinwheel-module_line__0NJWV:nth-child(6){animation-delay:calc(var(--uib-speed)*.375);opacity:.1}@keyframes Pinwheel-module_rotate__Lqw4D{0%{transform:rotate(0deg)}to{transform:rotate(180deg)}}");

// node_modules/@uiball/loaders/dist/components/MrMiyagi.js
var import_react24 = __toESM(require_react(), 1);
var t9 = "MrMiyagi-module_container__Rld70";
var l4 = "MrMiyagi-module_line__XVgwi";
function r13(a14) {
  let { size: r14 = 35, color: n7 = "black", lineWeight: o7 = 3.5, speed: c = 1 } = a14;
  return e("MrMiyagi", "size", r14, "number"), e("MrMiyagi", "color", n7, "string"), e("MrMiyagi", "speed", c, "number"), e("MrMiyagi", "lineWeight", o7, "number"), import_react24.default.createElement("div", { className: t9, style: { "--uib-size": r14 + "px", "--uib-color": n7, "--uib-line-weight": o7 + "px", "--uib-speed": c + "s" } }, import_react24.default.createElement("div", { className: l4 }), import_react24.default.createElement("div", { className: l4 }), import_react24.default.createElement("div", { className: l4 }), import_react24.default.createElement("div", { className: l4 }), import_react24.default.createElement("div", { className: l4 }), import_react24.default.createElement("div", { className: l4 }));
}
e2(".MrMiyagi-module_container__Rld70{align-items:center;display:flex;height:var(--uib-size);justify-content:center;position:relative;width:var(--uib-size)}.MrMiyagi-module_line__XVgwi{animation:MrMiyagi-module_rotate__V8TX8 var(--uib-speed) ease-in-out infinite alternate;background-color:var(--uib-color);border-radius:calc(var(--uib-line-weight)/2);height:var(--uib-line-weight);left:0;position:absolute;top:calc(50% - var(--uib-line-weight)/2);width:100%}.MrMiyagi-module_line__XVgwi:nth-child(2){animation-delay:calc(var(--uib-speed)*.075);opacity:.8}.MrMiyagi-module_line__XVgwi:nth-child(3){animation-delay:calc(var(--uib-speed)*.15);opacity:.6}.MrMiyagi-module_line__XVgwi:nth-child(4){animation-delay:calc(var(--uib-speed)*.225);opacity:.4}.MrMiyagi-module_line__XVgwi:nth-child(5){animation-delay:calc(var(--uib-speed)*.3);opacity:.2}.MrMiyagi-module_line__XVgwi:nth-child(6){animation-delay:calc(var(--uib-speed)*.375);opacity:.1}@keyframes MrMiyagi-module_rotate__V8TX8{0%{transform:rotate(0deg)}to{transform:rotate(180deg)}}");

// node_modules/@uiball/loaders/dist/index.js
var import_react25 = __toESM(require_react());
export {
  e10 as ChaoticOrbit,
  l3 as DotPulse,
  a10 as DotSpinner,
  s2 as DotWave,
  n5 as Handsprings,
  i9 as Jelly,
  o6 as JellyTriangle,
  i8 as LeapFrog,
  r12 as LineWobble,
  i5 as Metronome,
  n2 as Momentum,
  r13 as MrMiyagi,
  r7 as NewtonsCradle,
  i3 as Orbit,
  t3 as Ping,
  n6 as Pinwheel,
  o3 as Pulsar,
  a11 as RaceBy,
  o as Ring,
  p as Ripples,
  s as SuperBalls,
  i2 as ThreeBody,
  t2 as Waveform,
  i4 as Wobble
};
//# sourceMappingURL=@uiball_loaders.js.map
