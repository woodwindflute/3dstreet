!function(e,t){if("object"==typeof exports&&"object"==typeof module)module.exports=t();else if("function"==typeof define&&define.amd)define([],t);else{var i=t();for(var a in i)("object"==typeof exports?exports:e)[a]=i[a]}}(self,(function(){return e={631:e=>{var t=[new THREE.Vector2,new THREE.Vector2,new THREE.Vector2,new THREE.Vector2];function i(e,i,a,s){const n=1/s,r=1/a;return t[0].set(n*i,r*e+r),t[1].set(n*i,r*e),t[2].set(n*i+n,r*e),t[3].set(n*i+n,r*e+r),t}AFRAME.registerComponent("atlas-uvs",{dependencies:["geometry"],schema:{totalColumns:{type:"int",default:1},totalRows:{type:"int",default:1},column:{type:"int",default:1},row:{type:"int",default:1}},update:function(){const e=this.data,t=i(e.row-1,e.column-1,e.totalRows,e.totalColumns),a=this.el.getObject3D("mesh").geometry;var s=new Float32Array([t[0].x,t[0].y,t[3].x,t[3].y,t[1].x,t[1].y,t[2].x,t[2].y]);a.setAttribute("uv",new THREE.BufferAttribute(s,2)),a.uvsNeedUpdate=!0}}),AFRAME.registerComponent("dynamic-texture-atlas",{schema:{canvasId:{default:"dynamicAtlas"},canvasHeight:{default:1024},canvasWidth:{default:1024},debug:{default:!1},numColumns:{default:8},numRows:{default:8}},multiple:!0,init:function(){const e=this.canvas=document.createElement("canvas");e.id=this.data.canvasId,e.height=this.data.canvasHeight,e.width=this.data.canvasWidth,this.ctx=e.getContext("2d"),document.body.appendChild(e),this.data.debug&&(e.style.left=0,e.style.top=0,e.style.position="fixed",e.style.zIndex=9999999999)},drawTexture:function(e,t,a,s,n){const r=this.canvas,o=this.data;e.complete||(e.onload=()=>{this.drawTexture(e,t,a)});const l=n||r.height/o.numRows,d=s||r.width/o.numColumns;return this.ctx.drawImage(e,d*t,d*a,d,l),i(t,a,o.numRows,o.numColumns)}}),e.exports.getGridUvs=i},485:()=>{if("undefined"==typeof AFRAME)throw new Error("Component attempted to register before AFRAME was available.");var e={},t={};AFRAME.registerComponent("gltf-part-plus",{schema:{buffer:{default:!0},part:{type:"string"},src:{type:"asset"},resetPosition:{default:!1}},init:function(){this.dracoLoader=document.querySelector("a-scene").systems["gltf-model"].getDRACOLoader()},update:function(){var e=this.el,t=this.data;!this.data.part&&this.data.src||this.getModel((function(i){i&&(t.resetPosition&&(e.setAttribute("position",i.position.x+" "+i.position.y+" "+i.position.z),i.position.set(0,0,0)),e.setObject3D("mesh",i),e.emit("model-loaded",{format:"gltf",part:this.modelPart}))}))},getModel:function(i){var a=this;if(!t[this.data.src])return e[this.data.src]?e[this.data.src].then((function(e){i(a.selectFromModel(e))})):void(e[this.data.src]=new Promise((function(s){var n=new THREE.GLTFLoader;a.dracoLoader&&n.setDRACOLoader(a.dracoLoader),n.load(a.data.src,(function(n){var r=n.scene||n.scenes[0];t[a.data.src]=r,delete e[a.data.src],i(a.selectFromModel(r)),s(r)}),(function(){}),console.error)})));i(this.selectFromModel(t[this.data.src]))},selectFromModel:function(e){var t,i;if(i=e.getObjectByName(this.data.part))return t=i.getObjectByProperty("type","Mesh").clone(!0),this.data.buffer?(t.geometry=t.geometry.toNonIndexed(),t):(t.geometry=(new THREE.Geometry).fromBufferGeometry(t.geometry),t);console.error("[gltf-part] `"+this.data.part+"` not found in model.")}}),AFRAME.registerComponent("model-center",{schema:{bottomAlign:{default:!1}},init:function(){this.el.addEventListener("model-loaded",(e=>{var t=this.el.getObject3D("mesh");if(t.position.set(0,0,0),t.geometry.center(),this.data.bottomAlign){var i=(new THREE.Box3).setFromObject(t),a=i.max.sub(i.min).y;t.position.y=a/2}}))}}),AFRAME.registerComponent("anisotropy",{schema:{default:0},dependencies:["material","geometry"],init:function(){this.maxAnisotropy=this.el.sceneEl.renderer.capabilities.getMaxAnisotropy(),["model-loaded","materialtextureloaded"].forEach((e=>this.el.addEventListener(e,(()=>{const e=this.el.getObject3D("mesh");var t=this.data;0===(t=+t||0)&&(t=this.maxAnisotropy),e.traverse((e=>{!0===e.isMesh&&null!==e.material.map&&(e.material.map.anisotropy=t,e.material.map.needsUpdate=!0)}))}),!1)))}}),AFRAME.registerComponent("instancedmesh",{schema:{retainParent:{default:!1},retainChildren:{default:!1},inheritMat:{default:!0},mergeInstances:{default:!1},frustumCulled:{default:!0}},init:function(){},update:function(){var e,t,i,a,s=this.el,n=this.el.children,r=0,o=(e=new THREE.Vector3,t=new THREE.Euler,i=new THREE.Vector3,a=new THREE.Quaternion,function(n,r){e.x=s.children[n].object3D.position.x,e.y=s.children[n].object3D.position.y,e.z=s.children[n].object3D.position.z,t.x=s.children[n].object3D.rotation.x,t.y=s.children[n].object3D.rotation.y,t.z=s.children[n].object3D.rotation.z,a.setFromEuler(t),i.x=s.children[n].object3D.scale.x,i.y=s.children[n].object3D.scale.y,i.z=s.children[n].object3D.scale.z,r.compose(e,a,i)});for(var l of n)r+=1;var d=this.el.getObject3D("mesh");if(d){var c=d.material.clone(),m=null;d.traverse((function(e){!0===e.isMesh&&(m=e.geometry)}));for(var u=new THREE.InstancedMesh(m,c,r),p=0;p<r;p++){var g=new THREE.Matrix4;o(p,g),u.setMatrixAt(p,g)}u.frustumCulled=this.data.frustumCulled,this.el.object3D.add(u),this.data.retainParent||this.el.object3D.remove(d),this.data.inheritMat&&(this.el.components.material.material=c)}else this.el.addEventListener("model-loaded",(e=>{this.update(this.data)}))}})},844:(e,t,i)=>{var a=i(199),s=i(394),n={suffix:"-t1"},r={"bike-lane":1.8,"drive-lane":3,divider:.3,"parking-lane":3,sidewalk:3,"sidewalk-tree":3,"turn-lane":3,"bus-lane":3,"light-rail":3,streetcar:3,"sidewalk-wayfinding":3,"sidewalk-lamp":3,"sidewalk-bike-rack":3,"sidewalk-bench":3,"scooter-drop-zone":3,scooter:1.8,bikeshare:3,"flex-zone-curb":3,"transit-shelter":3};function o(e){for(var t=e.objectMixinId,i=void 0===t?"":t,a=e.parentEl,s=void 0===a?null:a,n=e.step,r=void 0===n?15:n,o=e.radius,l=void 0===o?60:o,d=e.rotation,c=void 0===d?"0 0 0":d,m=e.positionXYString,u=void 0===m?"0 0":m,p=e.randomY,g=void 0!==p&&p,h=-1*l;h<=l;h+=r){var f=document.createElement("a-entity");f.setAttribute("class",i),f.setAttribute("position",u+" "+h),f.setAttribute("mixin",i),g?f.setAttribute("rotation","0 "+Math.floor(361*Math.random())+" 0"):f.setAttribute("rotation",c),s.append(f)}}function l(e){var t=document.createElement("a-entity");return t.setAttribute("class","stencils-parent"),t.setAttribute("position",e),t}function d(e){var t=document.createElement("a-entity");return t.setAttribute("class","track-parent"),t.setAttribute("position",e+" -0.2 0"),t}function c(e){var t=document.createElement("a-entity");return t.setAttribute("class","safehit-parent"),t.setAttribute("position",e+" 0 0"),t}function m(e){return"colored"===e?"surface-red bus-lane":"grass"===e?"surface-green bus-lane":"bus-lane"}function u(e,t,i){var a="inbound"===e[0]?0:180,s=document.createElement("a-entity");return s.setAttribute("class",t),s.setAttribute("position",i+" 0 0"),s.setAttribute("rotation","0 "+a+" 0"),s.setAttribute("mixin",t),s}function p(e,t){var i=document.createElement("a-entity"),a=90*e,s=document.createElement("a-entity");s.setAttribute("class","bus"),s.setAttribute("position",t+" 1.4 0"),s.setAttribute("rotation","0 "+a+" 0"),s.setAttribute("mixin","bus"),i.append(s);var n=document.createElement("a-entity");return n.setAttribute("class","bus-shadow"),n.setAttribute("position",t+" 0.01 0"),n.setAttribute("rotation","-90 "+a+" 0"),n.setAttribute("mixin","bus-shadow"),i.append(n),i}function g(e){var t,i=document.createElement("a-entity");return(t=document.createElement("a-entity")).setAttribute("position",e+" 1 0"),t.setAttribute("mixin","wayfinding-box"),i.append(t),(t=document.createElement("a-entity")).setAttribute("position",e+" 1.2 0.06"),t.setAttribute("geometry","primitive: plane; width: 0.8; height: 1.6"),t.setAttribute("material","src:#wayfinding-map"),i.append(t),(t=document.createElement("a-entity")).setAttribute("position",e+" 1.2 -0.06"),t.setAttribute("rotation","0 180 0"),t.setAttribute("geometry","primitive: plane; width: 0.8; height: 1.6"),t.setAttribute("material","src:#wayfinding-map"),i.append(t),i}function h(e){var t=document.createElement("a-entity");return t.setAttribute("class","bench-parent"),t.setAttribute("position",e+" 0 3.5"),t}function f(e){var t=document.createElement("a-entity");return t.setAttribute("class","bikerack-parent"),t.setAttribute("position",e+" 0 -3.5"),t}function b(e,t){var i=document.createElement("a-entity");i.setAttribute("class","bikeshare"),i.setAttribute("position",e+" 0 0"),i.setAttribute("mixin","bikeshare");var a="left"===t[0]?90:270;return i.setAttribute("rotation","0 "+a+" 0"),i}function x(e){var t=document.createElement("a-entity");return t.setAttribute("class","tree-parent"),t.setAttribute("position",e+" 0 7"),t}function y(e){var t=document.createElement("a-entity");return t.setAttribute("class","lamp-parent"),t.setAttribute("position",e+" 0 0"),t}function v(e,t,i){var a=document.createElement("a-entity");return a.setAttribute("class","bus-stop"),a.setAttribute("position",e+.75*t+" 0 0"),a.setAttribute("rotation","-90 "+i+" 0"),a.setAttribute("mixin","bus-stop"),a}function w(e,t,i,a,s,r){var o=document.createElement("a-entity"),l=e+" "+r/150+" 1";return o.setAttribute("scale",l),console.log(l),o.setAttribute("position",t+" "+i+" 0"),o.setAttribute("rotation","270 "+a+" 0"),o.setAttribute("mixin",s+n.suffix),o}e.exports.processSegments=function(e,t,i){var n=i/2;i>12&&(n=(i-12)/2),t&&(e=function(e){function t(e){return"lane"===e.slice(e.length-4)||"light-rail"===e||"streetcar"===e}return e.reduce((function(e,i,a,s){if(0===a)return e.concat(i);var n=s[a-1];if(t(i.type)&&t(n.type)){var r="solid";i.type===n.type&&(r="dashed"),("drive-lane"===i.type&&"turn-lane"===n.type||"drive-lane"===n.type&&"turn-lane"===i.type)&&(r="dashed"),i.variantString.split("|")[0]!==n.variantString.split("|")[0]&&(r="doubleyellow","bike-lane"===i.type&&"bike-lane"===n.type&&(r="shortdashedyellow")),"turn-lane"===i.type&&"shared"===i.variantString.split("|")[1]?r="soliddashedyellow":"turn-lane"===n.type&&"shared"===n.variantString.split("|")[1]&&(r="soliddashedyellowinverted"),e.push({type:"separator",variantString:r,width:0})}return(t(i.type)&&"divider"===n.type||t(n.type)&&"divider"===i.type)&&e.push({type:"separator",variantString:"solid",width:0}),e.push(i),e}),[])}(e));var _=function(e){var t=document.createElement("a-entity"),i=0-s.calcStreetWidth(e)/2;return t.setAttribute("position",i+" 0 0"),t}(e);_.classList.add("street-parent");for(var A,E=0,S=0;S<e.length;S++){var M=document.createElement("a-entity");M.classList.add("segment-parent-"+S);var k=e[S].type,j=.3048*e[S].width,R=j/r[k],C=(E+=j)-.5*j,I=0,B=e[S].variantString.split("|"),L="inbound"===B[0]?180:0,T="outbound"===B[0]?1:-1,D=e[S].type;if("drive-lane"===e[S].type&&"sharrow"===B[1]){var O=l(C+" 0.015 0");o({objectMixinId:"stencils sharrow",parentEl:O,rotation:"-90 "+L+" 0",step:10,radius:n}),M.append(O)}else if("bike-lane"===e[S].type||"scooter"===e[S].type){var F=l(C+" 0.015 0");D="red"===(A=B[1])?"surface-red bike-lane":"green"===A?"surface-green bike-lane":"bike-lane",o({objectMixinId:"stencils bike-lane",parentEl:F,rotation:"-90 "+L+" 0",step:20,radius:n}),M.append(F)}else if("light-rail"===e[S].type||"streetcar"===e[S].type){D=m(B[1]);var P="streetcar"===e[S].type?"trolley":"tram";M.append(u(B,P,C));var H=d(C);o({objectMixinId:"track",parentEl:H,step:20.25,radius:n}),M.append(H)}else if("turn-lane"===e[S].type){D="drive-lane";var N=B[1];"inbound"===B[0]&&(N=N.replace(/left|right/g,(function(e){return"left"===e?"right":"left"}))),"shared"===B[1]&&(N="left"),"left-right-straight"===B[1]&&(N="all");var U="stencils "+N,J=l(C+" 0.015 0");if(o({objectMixinId:U,parentEl:J,rotation:"-90 "+L+" 0",step:15,radius:n}),M.append(J),"shared"===B[1]){var z=l(C+" 0.015 "+-3*T);o({objectMixinId:U,parentEl:z,rotation:"-90 "+(L+180)+" 0",step:15,radius:n}),M.append(z)}}else if("divider"===e[S].type&&"bollard"===B[0]){D="divider";var G=c(C);o({objectMixinId:"safehit",parentEl:G,step:4,radius:n}),M.append(G)}else if("bus-lane"===e[S].type){D=m(B[1]),M.append(p(T,C));var V=void 0;o({objectMixinId:"stencils word-bus",parentEl:V=l(C+" 0.015 0"),rotation:"-90 "+L+" 0",step:50,radius:n}),M.append(V),o({objectMixinId:"stencils word-taxi",parentEl:V=l(C+" 0.015 10"),rotation:"-90 "+L+" 0",step:50,radius:n}),M.append(V),o({objectMixinId:"stencils word-only",parentEl:V=l(C+" 0.015 20"),rotation:"-90 "+L+" 0",step:50,radius:n}),M.append(V)}else if("drive-lane"===e[S].type);else if("sidewalk-wayfinding"===e[S].type)M.append(g(C));else if("sidewalk-bench"===e[S].type){var W=h(C),q="right"===B[0]?-90:90;"center"===B[0]||(o({objectMixinId:"bench",parentEl:W,rotation:"0 "+q+" 0",radius:n}),M.append(W))}else if("sidewalk-bike-rack"===e[S].type){var Y=f(C);o({objectMixinId:"bikerack",parentEl:Y,rotation:"0 "+("sidewalk-parallel"===B[1]?90:0)+" 0",radius:n}),M.append(Y)}else if("bikeshare"===e[S].type)M.append(b(C,B));else if("sidewalk-tree"===e[S].type){var X=x(C);o({objectMixinId:P="palm-tree"===B[0]?"palm-tree":"tree3",parentEl:X,randomY:!0,radius:n}),M.append(X)}else if("sidewalk-lamp"!==e[S].type||"modern"!==B[1]&&"pride"!==B[1])if("sidewalk-lamp"===e[S].type&&"traditional"===B[1]){var K=y(C);o({objectMixinId:"lamp-traditional",parentEl:K,radius:n}),M.append(K)}else if("transit-shelter"===e[S].type){var Q="right"===B[0]?0:180,$="right"===B[0]?1:-1;M.append(v(C,$,Q))}else"separator"===e[S].type&&"dashed"===B[0]?(D="markings dashed-stripe",I+=.01,R=1):"separator"===e[S].type&&"solid"===B[0]?(D="markings solid-stripe",I+=.01,R=1):"separator"===e[S].type&&"doubleyellow"===B[0]?(D="markings solid-doubleyellow",I+=.01,R=1):"separator"===e[S].type&&"shortdashedyellow"===B[0]?(D="markings yellow short-dashed-stripe",I+=.01,R=1):"separator"===e[S].type&&"soliddashedyellow"===B[0]?(D="markings yellow solid-dashed",I+=.01,R=1):"separator"===e[S].type&&"soliddashedyellowinverted"===B[0]?(D="markings yellow solid-dashed",I+=.01,R=1,L="180"):"parking-lane"===e[S].type&&(D="drive-lane");else{var Z=y(C);o({objectMixinId:"lamp-modern",parentEl:Z,rotation:"0 "+("right"===B[0]?-90:90)+" 0",radius:n}),M.append(Z),"both"===B[0]&&o({objectMixinId:"lamp-modern",parentEl:Z,rotation:"0 -90 0",radius:n}),"pride"!==B[1]||"right"!==B[0]&&"both"!==B[0]||o({objectMixinId:"pride-flag",parentEl:Z,positionXYString:"0.409 3.345",radius:n}),"pride"!==B[1]||"left"!==B[0]&&"both"!==B[0]||o({objectMixinId:"pride-flag",parentEl:Z,rotation:"0 -180 0",positionXYString:"-0.409 3.345",radius:n})}a.isSidewalk(e[S].type)&&(D="sidewalk"),console.log("length",i),M.append(w(R,C,I,L,D,i)),_.append(M)}return _},e.exports.processBuildings=function(e,t,i,s,n){var r=document.createElement("a-entity");r.classList.add("buildings-parent");var l=150;return[e,t].forEach((function(e,t){if(0!==e.length){var n=0===t?"left":"right",d="left"===n?-1:1,c=(75+i/2)*d;if(s){var m=JSON.stringify(a.createGroundArray(e)),u=document.createElement("a-entity");u.setAttribute("create-from-json","jsonString",m),u.setAttribute("position",c+" 0 0"),u.classList.add("ground-"+n),r.appendChild(u)}if("narrow"===e||"wide"===e||"grass"===e){var p=a.createBuildingsArray(l),g=JSON.stringify(p),h=document.createElement("a-entity");h.setAttribute("position",c+-72*d+" 0 "+75*d),h.setAttribute("rotation","0 "+90*d+" 0"),h.setAttribute("create-from-json","jsonString",g),h.classList.add("block-"+n),r.append(h)}if("residential"===e){var f=a.createBuildingsArray(l,"residential"),b=JSON.stringify(f),x=document.createElement("a-entity");x.setAttribute("position",c+-64*d+" -0.75 "+75*d),x.setAttribute("rotation","0 "+90*d+" 0"),x.setAttribute("create-from-json","jsonString",b),x.classList.add("suburbia-"+n),r.append(x)}if("waterfront"===e){var y=c-d*l/2,v=document.createElement("a-entity");v.setAttribute("class","seawall-parent"),v.setAttribute("position",y+" 0 10"),v.classList.add("seawall-parent-"+n),r.appendChild(v),o({objectMixinId:"seawall",parentEl:v,rotation:"-90 "+("right"===n?-90:90)+" 0",step:15,radius:70})}if("fence"===e||"parking-lot"===e){var w=c-d*l/2,_=document.createElement("a-entity");_.setAttribute("class","fence-parent"),_.setAttribute("position",w+" 0 0"),_.classList.add("fence-parent-"+c),o({objectMixinId:"fence",parentEl:_,rotation:"0 "+("right"===n?-90:90)+" 0",step:9.25,radius:70}),r.appendChild(_)}}})),r}},234:()=>{var e,t;e=!1,t=new THREE.FileLoader,window.AFRAME.registerElement("streetmix-assets",{prototype:Object.create(window.AFRAME.ANode.prototype,{createdCallback:{value:function(){this.setAttribute("src",""),this.isAssetItem=!0,this.isAssets=!0,this.fileLoader=t,this.timeout=null}},attachedCallback:{value:function(){if(!e){var t;this.parentNode&&this.parentNode.hasLoaded&&console.warn("Assets have already loaded. streetmix-assets may have problems"),e=!0,this.innerHTML=((t=this.getAttribute("url"))||(t="https://github.3d.st/"),console.log("[street]","Using street assets from",t),'\n          \x3c!-- audio --\x3e\n          <audio id="ambientmp3" src="'.concat(t,'assets/audio/SSL_16_11_AMB_EXT_SF_ALAMO_SQ.mp3" preload="none" crossorigin="anonymous"></audio>\n          <audio id="tram-pass-mp3" src="').concat(t,'assets/audio/Tram-Pass-By-Fast-shortened.mp3" preload="auto" crossorigin="anonymous"></audio>\n          <audio id="trolley-pass-mp3" src="').concat(t,'assets/audio/Streetcar-passing.mp3" preload="auto" crossorigin="anonymous"></audio>\n          <audio id="suburbs-mp3" src="').concat(t,'assets/audio/AMB_Suburbs_Afternoon_Woods_Spring_Small_ST_MKH8050-30shortened_amplified.mp3" preload="none" crossorigin="anonymous"></audio>\n          <audio id="parking-lot-mp3" src="').concat(t,'assets/audio/Parking_lot_ambience_looping.mp3" preload="none" crossorigin="anonymous"></audio>\n          <audio id="waterfront-mp3" src="').concat(t,'assets/audio/combined_UKdock4_and_water_pier_underneath_ambience.mp3" preload="none" crossorigin="anonymous"></audio>\n          <audio id="suburbs2-mp3" src="').concat(t,'assets/audio/AMB_Suburbs_Spring_Day_Lawnmowers_Birds_MS_ST_MKH8050-30shortened.mp3" preload="none" crossorigin="anonymous"></audio>\n  \n          \x3c!-- sidewalk props --\x3e\n          <a-asset-item id="treemodel3" src="').concat(t,'assets/objects/SM_Env_Tree_03.gltf"></a-asset-item>\n          <a-asset-item id="palmtreemodel" src="').concat(t,'assets/objects/PalmTree.gltf"></a-asset-item>\n          <a-asset-item id="benchmodel" src="').concat(t,'assets/objects/SM_Prop_ParkBench_02.gltf"></a-asset-item>\n          <a-asset-item id="bikerackmodel" src="').concat(t,'assets/objects/bikerack.glb"></a-asset-item>\n          <a-asset-item id="bikesharemodel" src="').concat(t,'assets/objects/bikeshare.glb"></a-asset-item>\n          <a-asset-item id="lamp-modern-glb" src="').concat(t,'assets/objects/lamp-post-modern-centered.glb"></a-asset-item>\n          <a-asset-item id="lamp-traditional-glb" src="').concat(t,'assets/objects/lamp-post-traditional.glb"></a-asset-item>\n          <a-asset-item id="bus-stop-glb" src="').concat(t,'assets/objects/ccFO2EGGIq9-bus-stop.glb"></a-asset-item>\n          <img id="wayfinding-map" src="').concat(t,'assets/objects/wayfinding.jpg" crossorigin="anonymous" />\n  \n          \x3c!-- vehicles --\x3e\n          <a-asset-item id="trammodel" src="').concat(t,'assets/objects/tram_siemens_avenio.gltf"></a-asset-item>\n          <a-asset-item id="trolleymodel" src="').concat(t,'assets/objects/godarvilletram.gltf"></a-asset-item>\n          <a-asset-item id="xd40" src="').concat(t,'assets/objects/bus/xd40-draco.glb"></a-asset-item>\n          <a-asset-item id="carmodel" src="').concat(t,'assets/objects/SM_Veh_Car_Sedan_01.gltf"></a-asset-item>\n  \n          \x3c!-- blocks --\x3e\n          <a-asset-item id="blockmodel" src="').concat(t,'assets/objects/buildings.glb"></a-asset-item>\n          <a-asset-item id="suburbiamodel" src="').concat(t,'assets/objects/suburbia/suburbia-fixwindowuvs-only3-draco.glb"></a-asset-item>\n  \n          <a-asset-item id="fence-model" src="').concat(t,'assets/objects/fence4/fence4.gltf"></a-asset-item>\n          <a-asset-item id="seawall-model" src="').concat(t,'assets/objects/seawall.gltf"></a-asset-item>\n  \n          \x3c!-- lane objects --\x3e\n          <a-asset-item id="trackmodel" src="').concat(t,'assets/objects/track.gltf"></a-asset-item>\n          <a-asset-item id="flexiguide-glb" src="').concat(t,'assets/objects/flexiguide300.glb"></a-asset-item>\n          <img id="stencils-atlas" src="').concat(t,'assets/materials/stencils-atlas_2048.png" crossorigin="anonymous" />\n          <img id="markings-atlas" src="').concat(t,'assets/materials/lane-markings-atlas_1024.png" crossorigin="anonymous" />\n  \n          \x3c!-- optimized textures - used by default --\x3e\n          <img id="seamless-road" src="').concat(t,'assets/materials/TexturesCom_Roads0086_1_seamless_S_rotate.jpg" crossorigin="anonymous">\n          <img id="hatched-base" src="').concat(t,'assets/materials/hatched_Base_Color.jpg" crossorigin="anonymous">\n          <img id="hatched-normal" src="').concat(t,'assets/materials/hatched_Normal.jpg" crossorigin="anonymous">\n          <img id="seamless-sidewalk" src="').concat(t,'assets/materials/TexturesCom_FloorsRegular0301_1_seamless_S.jpg" crossorigin="anonymous">\n          <a-mixin id="drive-lane-t1" geometry="width:3;height:150;primitive:plane" material="repeat:0.3 25;offset:0.55 0;src:#seamless-road;"></a-mixin>\n          <a-mixin id="bike-lane-t1" geometry="width:1.8;height:150;primitive:plane" material="repeat:0.3 25;offset:0.55 0;roughness:1;metalness:0;src:#seamless-road;"></a-mixin>\n          <a-mixin id="sidewalk-t1" anisotropy geometry="width:3;height:150;primitive:plane" material="repeat:1.5 75;src:#seamless-sidewalk;"></a-mixin>\n          <a-mixin id="bus-lane-t1" geometry="width:3;height:150;primitive:plane" material="repeat:0.3 25;offset:0.55 0;src:#seamless-road;"></a-mixin>\n          <a-mixin id="divider-t1" geometry="width:0.3;height:150;primitive:plane" material="repeat:1 150;offset:0.415 0;normalTextureOffset:0.415 0;src:#hatched-base;normalTextureRepeat:0.21 150;normalMap:#hatched-normal"></a-mixin>\n          <a-mixin id="safehit" gltf-model="#flexiguide-glb" scale="1 1 1"></a-mixin>\n  \n          \x3c!-- lane separator markings atlas --\x3e\n          <a-mixin id="markings" anisotropy atlas-uvs="totalRows: 1; totalColumns: 8; row: 1" scale="1 1 1" material="src: #markings-atlas;alphaTest: 0;transparent:true;repeat:1 25;" geometry="primitive: plane; buffer: false; skipCache: true; width:0.2; height:150;"></a-mixin>\n          <a-mixin id="solid-stripe-t1" atlas-uvs="column: 3"></a-mixin>\n          <a-mixin id="dashed-stripe-t1" atlas-uvs="column: 4"></a-mixin>\n          <a-mixin id="short-dashed-stripe-t1" atlas-uvs="column: 4" material="repeat:1 50;"></a-mixin>\n          <a-mixin id="solid-doubleyellow-t1" atlas-uvs="totalColumns: 4; column: 3" geometry="width: 0.5"></a-mixin>\n          <a-mixin id="solid-dashed-t1" atlas-uvs="totalColumns: 4; column: 2" geometry="width: 0.4"></a-mixin>\n  \n          \x3c!-- color modifier mixins --\x3e\n          <a-mixin id="yellow" material="color:#f7d117"></a-mixin>\n          <a-mixin id="surface-green" material="color:#adff83"></a-mixin>\n          <a-mixin id="surface-red" material="color:#ff9393"></a-mixin>\n  \n          \x3c!-- stencils atlas --\x3e\n          <a-mixin id="stencils" anisotropy atlas-uvs="totalRows: 4; totalColumns: 4" scale="2 2 2" material="src: #stencils-atlas;alphaTest: 0;transparent:true;" geometry="primitive: plane; buffer: false; skipCache: true"></a-mixin>\n          <a-mixin id="right" atlas-uvs="column: 3; row: 2"></a-mixin>\n          <a-mixin id="left" atlas-uvs="column: 3; row: 3"></a-mixin>\n          <a-mixin id="both" atlas-uvs="column: 2; row: 1"></a-mixin>\n          <a-mixin id="all" atlas-uvs="column: 3; row: 1"></a-mixin>\n          <a-mixin id="left-straight" atlas-uvs="column: 2; row: 3"></a-mixin>\n          <a-mixin id="right-straight" atlas-uvs="column: 2; row: 2"></a-mixin>\n          <a-mixin id="straight" atlas-uvs="column: 2; row: 4"></a-mixin>\n          <a-mixin id="sharrow" atlas-uvs="totalRows: 4; totalColumns: 8; column: 2; row: 3" scale="1.5 3 1"></a-mixin>\n          <a-mixin id="bike-lane" atlas-uvs="totalRows: 2; totalColumns: 8; column: 1; row: 2" scale="1 4 1"></a-mixin>\n          <a-mixin id="word-bus" atlas-uvs="totalRows: 8; totalColumns: 8; column: 1; row: 4" scale="3 3 3"></a-mixin>\n          <a-mixin id="word-lane" atlas-uvs="totalRows: 8; totalColumns: 8; column: 2; row: 4" scale="3 3 3"></a-mixin>\n          <a-mixin id="word-taxi" atlas-uvs="totalRows: 8; totalColumns: 8; column: 1; row: 3" scale="3 3 3"></a-mixin>\n          <a-mixin id="word-only" atlas-uvs="totalRows: 8; totalColumns: 8; column: 2; row: 3" scale="3 3 3"></a-mixin>\n          <a-mixin id="word-yield" atlas-uvs="totalRows: 8; totalColumns: 8; column: 1; row: 2" scale="3 3 3"></a-mixin>\n          <a-mixin id="word-slow" atlas-uvs="totalRows: 8; totalColumns: 8; column: 2; row: 2" scale="3 3 3"></a-mixin>\n          <a-mixin id="word-xing" atlas-uvs="totalRows: 8; totalColumns: 8; column: 1; row: 1" scale="3 3 3"></a-mixin>\n          <a-mixin id="word-stop" atlas-uvs="totalRows: 8; totalColumns: 8; column: 2; row: 1" scale="3 3 3"></a-mixin>\n          <a-mixin id="perpendicular-stalls" atlas-uvs="totalRows: 4; totalColumns: 8; column: 5; row: 4" scale="5 10 5"></a-mixin>\n          <a-mixin id="parking-delimiter" atlas-uvs="totalRows: 8; totalColumns: 8; column: 2; row: 7" scale="1.8 1.8 1.8"></a-mixin>\n  \n          \x3c!-- vehicles --\x3e\n          <a-mixin id="bus" anisotropy gltf-model="#xd40" scale="1.55 1.55 1.55"></a-mixin>\n          <a-mixin id="car" gltf-model="#carmodel"></a-mixin>\n          <a-mixin id="tram" anisotropy gltf-model="#trammodel" sound="src: #tram-pass-mp3;positional:false;volume: 0.4"></a-mixin>\n          <a-mixin id="trolley" gltf-model="#trolleymodel" sound="src: #trolley-pass-mp3;positional:false;volume: 0.4"scale="1 1 1"></a-mixin>\n\n          <img id="shadow-texture" src="').concat(t,'assets/materials/bus-shadow.png" crossorigin="anonymous">\n          <a-mixin id="bus-shadow" geometry="width: 12; height: 3; primitive: plane"  material="src: #shadow-texture; alphaTest: 0;transparent:true; roughness: 1;" ></a-mixin>\n          <a-mixin id="car-shadow" geometry="width: 4.7; height: 2.5; primitive: plane"  material="src: #shadow-texture; alphaTest: 0;transparent:true; roughness: 1;" ></a-mixin>\n  \n          \x3c!-- street props --\x3e\n          <a-mixin id="tree3" gltf-model="#treemodel3" scale="1.25 1.25 1.25"></a-mixin>\n          <a-mixin id="palm-tree" gltf-model="#palmtreemodel" scale="1 1.5 1"></a-mixin>\n          <a-mixin id="bench" gltf-model="#benchmodel" scale="1 1 1"></a-mixin>\n          <a-mixin id="track" gltf-model="#trackmodel" scale="1 1 1"></a-mixin>\n          <a-mixin id="bikerack" gltf-model="#bikerackmodel" scale="0.25 0.25 0.25"></a-mixin>\n          <a-mixin id="bikeshare" gltf-model="#bikesharemodel" scale="1 1 1"></a-mixin>\n          <a-mixin id="lamp-modern" gltf-model="#lamp-modern-glb" scale="0.5 0.5 0.5"></a-mixin>\n          <a-mixin id="lamp-traditional" gltf-model="#lamp-traditional-glb" scale="0.2 0.2 0.2" ></a-mixin>\n          <a-mixin id="pride-flag" position="0.409 3.345 0" rotation="0 0 0" scale="0.5 0.75 0" geometry="width:2;height:2;primitive:plane" material="side:double; src:').concat(t,'assets/materials/rainbow-flag-poles_512.png;transparent: true;"></a-mixin>\n          <a-mixin id="bus-stop" gltf-model="#bus-stop-glb" rotation="-90 0 0" scale="0.001 0.001 0.001" ></a-mixin>\n          <a-mixin id="wayfinding-box" geometry="primitive: box; height: 2; width: 0.84; depth: 0.1" material="color: gray"></a-mixin>\n  \n          \x3c!-- buildings and blocks --\x3e\n          <a-mixin id="block" gltf-model="#blockmodel" scale="1 1 1"></a-mixin>\n          <a-mixin id="suburbia" gltf-model="#suburbiamodel" scale="1 1 1"></a-mixin>\n  \n          <a-mixin id="SM3D_Bld_Mixed_Corner_4fl" scale="1 1 1" rotation="0 0 0" gltf-part-plus="src: #blockmodel; part: SM3D_Bld_Mixed_Corner_4fl" model-center="bottomAlign: true"></a-mixin>\n          <a-mixin id="SM3D_Bld_Mixed_Double_5fl" scale="1 1 1" rotation="0 0 0" gltf-part-plus="src: #blockmodel; part: SM3D_Bld_Mixed_Double_5fl" model-center="bottomAlign: true"></a-mixin>\n          <a-mixin id="SM3D_Bld_Mixed_4fl_2" scale="1 1 1" rotation="0 0 0" gltf-part-plus="src: #blockmodel; part: SM3D_Bld_Mixed_4fl_2" model-center="bottomAlign: true"></a-mixin>\n          <a-mixin id="SM3D_Bld_Mixed_5fl" scale="1 1 1" rotation="0 0 0" gltf-part-plus="src: #blockmodel; part: SM3D_Bld_Mixed_5fl" model-center="bottomAlign: true"></a-mixin>\n          <a-mixin id="SM3D_Bld_Mixed_4fl" scale="1 1 1" rotation="0 0 0" gltf-part-plus="src: #blockmodel; part: SM3D_Bld_Mixed_4fl" model-center="bottomAlign: true"></a-mixin>\n  \n          <a-mixin id="SM_Bld_House_Preset_03_1800" scale="1 1 1" rotation="0 0 0" gltf-part-plus="src: #suburbiamodel; part: SM_Bld_House_Preset_03_1800" model-center="bottomAlign: true"></a-mixin>\n          <a-mixin id="SM_Bld_House_Preset_08_1809" scale="1 1 1" rotation="0 0 0" gltf-part-plus="src: #suburbiamodel; part: SM_Bld_House_Preset_08_1809" model-center="bottomAlign: true"></a-mixin>\n          <a-mixin id="SM_Bld_House_Preset_09_1845" scale="1 1 1" rotation="0 0 0" gltf-part-plus="src: #suburbiamodel; part: SM_Bld_House_Preset_09_1845" model-center="bottomAlign: true"></a-mixin>\n  \n          <a-mixin id="seawall" gltf-model="#seawall-model" scale="1 1 1" rotation="0 0 0"></a-mixin>\n          <a-mixin id="fence" gltf-model="#fence-model" scale="0.1 0.1 0.1"></a-mixin>\n  \n          \x3c!-- grounds --\x3e\n          <img id="grass-texture" src="').concat(t,'assets/materials/TexturesCom_Grass0052_1_seamless_S.jpg" crossorigin="anonymous">\n          <img id="parking-lot-texture" src="').concat(t,'assets/materials/TexturesCom_Roads0111_1_seamless_S.jpg" crossorigin="anonymous">\n          <img id="asphalt-texture" src="').concat(t,'assets/materials/TexturesCom_AsphaltDamaged0057_1_seamless_S.jpg" crossorigin="anonymous">\n\n          <a-mixin id="ground-grass" rotation="-90 0 0" geometry="primitive:plane;height:150;width:150" material="src:#grass-texture;repeat:5 5;roughness:1"></a-mixin>\n          <a-mixin id="ground-parking-lot" rotation="-90 0 0" geometry="primitive:plane;height:150;width:150" material="src:#parking-lot-texture;repeat:2 4;roughness:1"></a-mixin>\n          <a-mixin id="ground-asphalt" rotation="-90 0 0" geometry="primitive:plane;height:150;width:150" material="src:#asphalt-texture;repeat:5 5;roughness:1"></a-mixin>\n  \n          \x3c!-- ui / future use --\x3e\n          <img id="subtitle" src="').concat(t,'assets/materials/subtitle.png" crossorigin="anonymous" />\n  '));var i=this.parentNode;this.setAttribute("timeout",i.getAttribute("timeout")),this.parentNode.isScene=!0,Object.getPrototypeOf(i).attachedCallback.call(this),this.parentNode.isScene=!1}}},load:{value:function(){AFRAME.ANode.prototype.load.call(this,null,(function(e){return e.isAssetItem&&e.hasAttribute("src")}))}}})}),window.addEventListener("DOMContentLoaded",(function(t){if(!e){var i=document.querySelector("a-assets");i||(i=document.createElement("a-assets")),i.hasLoaded&&console.warn("Assets already loaded. May lead to bugs");var a=document.createElement("streetmix-assets");i.append(a),document.querySelector("a-scene").append(i)}})),document.addEventListener("DOMSubtreeModified",(function e(t){if("A-SCENE"===t.target.nodeName){var i=t.target.querySelector("a-assets");if(i||(i=document.createElement("a-assets"),t.target.append(i)),i.querySelector("streetmix-assets"))document.removeEventListener("DOMSubtreeModified",e);else{var a=document.createElement("streetmix-assets");i.append(a),document.removeEventListener("DOMSubtreeModified",e)}}}),!1)},391:(e,t,i)=>{var a=i(334);AFRAME.registerComponent("create-from-json",{schema:{jsonString:{type:"string",default:""}},update:function(e){var t=this.data,i=this.el;if(e.string&&t.string!==e.string)for(;i.firstChild;)i.removeChild(i.lastChild);a.appendChildElementsFromArray(JSON.parse(t.jsonString),i)}})},579:(e,t,i)=>{var a=i(844),s=i(394);i(234),i(391),i(631),i(485),AFRAME.registerComponent("street",{schema:{JSON:{type:"string"},type:{default:"streetmixSegmentsFeet"},left:{default:""},right:{default:""},showGround:{default:!0},showStriping:{default:!0},length:{default:150}},update:function(e){var t=this.data;if(0!==t.JSON.length){var i=JSON.parse(t.JSON);console.log(i);var n=a.processSegments(i.streetmixSegmentsFeet,t.showStriping,t.length);if(console.log(n),this.el.append(n),t.left||t.right){var r=s.calcStreetWidth(i.streetmixSegmentsFeet,t.autoStriping),o=a.processBuildings(t.left,t.right,r,t.showGround,t.length);this.el.append(o)}}else{if(void 0!==e.JSON&&0===e.JSON.length)return;console.log("[street]","No JSON provided yet, but it might be set at runtime")}}}),AFRAME.registerComponent("streetmix-loader",{dependencies:["street"],schema:{streetmixStreetURL:{type:"string"},streetmixAPIURL:{type:"string"},showBuildings:{default:!0}},update:function(e){var t=this.data,i=this.el;if(0!==t.streetmixAPIURL.length){var a=new XMLHttpRequest;console.log("[streetmix-loader]","GET "+t.streetmixAPIURL),a.open("GET",t.streetmixAPIURL,!0),a.onload=function(){if(this.status>=200&&this.status<400){var e=JSON.parse(this.response),a=e.data.street.segments;t.showBuildings&&(i.setAttribute("street","right",e.data.street.rightBuildingVariant),i.setAttribute("street","left",e.data.street.leftBuildingVariant)),i.setAttribute("street","type","streetmixSegmentsFeet"),i.setAttribute("street","JSON",JSON.stringify({streetmixSegmentsFeet:a}))}else console.log("[streetmix-loader]","Loading Error: We reached the target server, but it returned an error")},a.onerror=function(){console.log("[streetmix-loader]","Loading Error: There was a connection error of some sort")},a.send()}else{if(t.streetmixStreetURL.length>0){var n=s.streetmixUserToAPI(t.streetmixStreetURL);return console.log("[streetmix-loader]","setting `streetmixAPIURL` to",n),void i.setAttribute("streetmix-loader","streetmixAPIURL",n)}console.log("[streetmix-loader]","Neither `streetmixAPIURL` nor `streetmixStreetURL` properties provided, please provide at least one.")}}})},199:e=>{e.exports.isSidewalk=function(e){return e.startsWith("sidewalk")||["scooter-drop-zone","bikeshare","flex-zone-curb","transit-shelter"].includes(e)},e.exports.createBuildingsArray=function(){var e,t,i=arguments.length>0&&void 0!==arguments[0]?arguments[0]:150,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"narrow";"narrow"===a||"wide"===a?(e=[{id:"SM3D_Bld_Mixed_4fl",width:5.25221},{id:"SM3D_Bld_Mixed_Double_5fl",width:10.9041},{id:"SM3D_Bld_Mixed_4fl_2",width:5.58889},{id:"SM3D_Bld_Mixed_5fl",width:6.47593},{id:"SM3D_Bld_Mixed_Corner_4fl",width:6.94809}],t="41431323432402434130303230234102402341"):"residential"===a&&(e=[{id:"SM_Bld_House_Preset_03_1800",width:20},{id:"SM_Bld_House_Preset_08_1809",width:20},{id:"SM_Bld_House_Preset_09_1845",width:20}],t="12021201210101212021201012012021201210");for(var s=0,n=0,r=[];n<i;){var o=e[parseInt(t[s])],l={tag:"a-entity",mixin:o.id,position:n+o.width/2+" 0 0"};r.push(l),n+=o.width,s++}return r},e.exports.filterBuildingsArrayByMixin=function(e,t){var i=[];return e.forEach((function(e,a){e.mixin===t&&i.push(e)})),i},e.exports.removePropertyFromArray=function(e,t){return e.forEach((function(e,i){delete e[t]})),e},e.exports.createClonedEntitiesArray=function(e){for(var t=e.mixin,i=void 0===t?"":t,a=e.step,s=void 0===a?15:a,n=e.radius,r=void 0===n?60:n,o=e.rotation,l=void 0===o?"0 0 0":o,d=e.positionXYString,c=void 0===d?"0 0":d,m=e.randomY,u=void 0!==m&&m,p=[],g=-1*r;g<=r;g+=s){var h={tag:"a-entity",position:c+" "+g};i&&(h.class=i,h.mixin=i),h.rotation=u?"0 "+Math.floor(361*randomTestable())+" 0":l,p.push(h)}return p},e.exports.getAmbientSoundJSON=function(e){var t={fence:"#suburbs-mp3",grass:"#suburbs-mp3","parking-lot":"#parking-lot-mp3",waterfront:"#waterfront",residential:"#suburbs2-mp3",narrow:"#ambientmp3",wide:"#ambientmp3"},i=[],a=null;return e.forEach((function(e,s){if(!a||a!==t[e]){var n={tag:"a-entity",class:"playme",sound:"src: "+t[e]+"; positional: false; loop: true"};i.push(n),a=t[e]}})),i},e.exports.createGroundArray=function(e){var t=[],i="ground-grass";if("waterfront"===e)return t;["narrow","wide"].includes(e)&&(i="ground-asphalt"),"parking-lot"===e&&(i="ground-parking-lot");var a={tag:"a-entity",position:"0 -0.2 0",mixin:i};return t.push(a),t}},334:e=>{function t(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(e)){var i=[],a=!0,s=!1,n=void 0;try{for(var r,o=e[Symbol.iterator]();!(a=(r=o.next()).done)&&(i.push(r.value),!t||i.length!==t);a=!0);}catch(e){s=!0,n=e}finally{try{a||null==o.return||o.return()}finally{if(s)throw n}}return i}}(e,t)||function(e,t){if(e){if("string"==typeof e)return i(e,t);var a=Object.prototype.toString.call(e).slice(8,-1);return"Object"===a&&e.constructor&&(a=e.constructor.name),"Map"===a||"Set"===a?Array.from(e):"Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a)?i(e,t):void 0}}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,a=new Array(t);i<t;i++)a[i]=e[i];return a}function a(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},i=document.createElement(e.tag);delete e.tag;for(var a=0,s=Object.entries(e);a<s.length;a++){var n=t(s[a],2),r=n[0],o=n[1];i.setAttribute(r,o)}return i}e.exports.createElementFromObject=a,e.exports.appendChildElementsFromArray=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=arguments.length>1?arguments[1]:void 0;return e.forEach((function(e,i){t.appendChild(a(e))})),t}},394:e=>{e.exports.streetmixUserToAPI=function(e){var t=new URL(e).pathname.split("/"),i=t[1],a=t[2];return"-"===i?"https://streetmix.net/api/v1/streets?namespacedId="+a:"https://streetmix.net/api/v1/streets?namespacedId="+a+"&creatorId="+i},e.exports.pathStartsWithAPI=function(e){var t=document.createElement("a");return t.href=e,"api"===t.pathname.split("/")[1]},e.exports.streetmixAPIToUser=function(e){function t(e,t){for(var i=e.split("&"),a=0;a<i.length;a++){var s=i[a].split("=");if(decodeURIComponent(s[0])===t)return decodeURIComponent(s[1])}console.log("Query variable %s not found",t)}var i=new URL(e).search.substring(1),a=t(i,"namespacedId"),s=t(i,"creatorId");return void 0===s&&(s="-"),"https://streetmix.net/"+s+"/"+a},e.exports.calcStreetWidth=function(e){var t=0;return e.forEach((function(e){var i=e.width;t+=.3048*i})),t}}},t={},function i(a){if(t[a])return t[a].exports;var s=t[a]={exports:{}};return e[a](s,s.exports,i),s.exports}(579);var e,t}));