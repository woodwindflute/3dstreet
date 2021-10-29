/* global AFRAME, XMLHttpRequest */
var streetmixParsers = require("./aframe-streetmix-parsers");
var streetmixUtils = require("./tested/streetmix-utils");
require("./assets.js");
require("./components/create-from-json");
require("aframe-atlas-uvs-component");
require("aframe-gltf-helpers");

AFRAME.registerComponent("street", {
  schema: {
    JSON: { type: "string" },
    type: { default: "streetmixSegmentsFeet" }, // alt: sharedRowMeters, streetmixJSONResponse
    left: { default: "" },
    right: { default: "" },
    showGround: { default: true },
    showStriping: { default: true },
    length: { default: 150 },
  },
  update: function (oldData) {
    // fired once at start and at each subsequent change of a schema value
    var data = this.data;

    if (data.JSON.length === 0) {
      if (oldData.JSON !== undefined && oldData.JSON.length === 0) {
        return;
      } // this has happened before, surpress console log
      console.log(
        "[street]",
        "No JSON provided yet, but it might be set at runtime"
      );
      return;
    }

    const streetmixSegments = JSON.parse(data.JSON);
    console.log(streetmixSegments);
    const streetEl = streetmixParsers.processSegments(
      streetmixSegments.streetmixSegmentsFeet,
      data.showStriping,
      data.length
    );
    console.log(streetEl);
    this.el.append(streetEl);

    if (data.left || data.right) {
      const streetWidth = streetmixUtils.calcStreetWidth(
        streetmixSegments.streetmixSegmentsFeet,
        data.autoStriping
      );
      const buildingsEl = streetmixParsers.processBuildings(
        data.left,
        data.right,
        streetWidth,
        data.showGround,
        data.length
      );
      // buildingsEl.setAttribute("position","0 0 -30")
      this.el.append(buildingsEl);
    }
  },
});

AFRAME.registerComponent("streetmix-loader", {
  dependencies: ["street"],
  schema: {
    streetmixStreetURL: { type: "string" },
    streetmixAPIURL: { type: "string" },
    showBuildings: { default: true },
  },
  update: function (oldData) {
    // fired once at start and at each subsequent change of a schema value
    var data = this.data;
    var el = this.el;

    // if no value for 'streetmixAPIURL' then let's see if there's a streetmixURL
    if (data.streetmixAPIURL.length === 0) {
      if (data.streetmixStreetURL.length > 0) {
        const streetmixAPIURL = streetmixUtils.streetmixUserToAPI(
          data.streetmixStreetURL
        );
        console.log(
          "[streetmix-loader]",
          "setting `streetmixAPIURL` to",
          streetmixAPIURL
        );
        el.setAttribute("streetmix-loader", "streetmixAPIURL", streetmixAPIURL);
        return;
      }
      console.log(
        "[streetmix-loader]",
        "Neither `streetmixAPIURL` nor `streetmixStreetURL` properties provided, please provide at least one."
      );
      return;
    }

    var request = new XMLHttpRequest();
    console.log("[streetmix-loader]", "GET " + data.streetmixAPIURL);

    request.open("GET", data.streetmixAPIURL, true);
    request.onload = function () {
      if (this.status >= 200 && this.status < 400) {
        // Connection success
        const streetmixResponseObject = JSON.parse(this.response);
        const streetmixSegments = streetmixResponseObject.data.street.segments;

        console.log(streetmixSegments);
        //15m
        if (
          streetmixSegments[0].type == "sidewalk" &&
          streetmixSegments[0].width == 10 &&
          streetmixSegments[1].type == "drive-lane" &&
          streetmixSegments[1].variantString == "inbound|sharrow" &&
          streetmixSegments[1].width == 15 &&
          streetmixSegments[2].type == "drive-lane" &&
          streetmixSegments[1].variantString == "inbound|sharrow" &&
          streetmixSegments[2].width == 15 &&
          streetmixSegments[3].type == "sidewalk" &&
          streetmixSegments[3].width == 10
        )
          window.location.replace("15m.html");

        //20m
        if (
          streetmixSegments[0].type == "sidewalk" &&
          streetmixSegments[0].width == 8.33333 &&
          streetmixSegments[1].type == "drive-lane" &&
          streetmixSegments[1].variantString == "inbound|sharrow" &&
          streetmixSegments[1].width == 15 &&
          streetmixSegments[2].type == "turn-lane" &&
          streetmixSegments[2].variantString == "inbound|right-straight" &&
          streetmixSegments[2].width == 10 &&
          streetmixSegments[3].type == "turn-lane" &&
          streetmixSegments[3].variantString == "outbound|left-straight" &&
          streetmixSegments[3].width == 10 &&
          streetmixSegments[4].type == "drive-lane" &&
          streetmixSegments[4].variantString == "outbound|sharrow" &&
          streetmixSegments[4].width == 15 &&
          streetmixSegments[5].type == "sidewalk" &&
          streetmixSegments[5].width == 8.33333
        )
          window.location.replace("20m.html");

        //25m
        if (
          streetmixSegments[0].type == "sidewalk" &&
          streetmixSegments[0].width == 6.66667 &&
          streetmixSegments[1].type == "sidewalk" &&
          streetmixSegments[1].width == 5 &&
          streetmixSegments[2].type == "parking-lane" &&
          streetmixSegments[2].variantString == "inbound|right" &&
          streetmixSegments[2].width == 3.33333 &&
          streetmixSegments[3].type == "drive-lane" &&
          streetmixSegments[3].variantString == "inbound|car" &&
          streetmixSegments[3].width == 11.66667 &&
          streetmixSegments[4].type == "turn-lane" &&
          streetmixSegments[4].variantString == "inbound|left-straight" &&
          streetmixSegments[4].width == 10 &&
          streetmixSegments[5].type == "parking-lane" &&
          streetmixSegments[5].variantString == "inbound|right" &&
          streetmixSegments[5].width == 1.66667 &&
          streetmixSegments[6].type == "divider" &&
          streetmixSegments[6].variantString == "median" &&
          streetmixSegments[6].width == 6.66667 &&
          streetmixSegments[7].type == "parking-lane" &&
          streetmixSegments[7].variantString == "inbound|left" &&
          streetmixSegments[7].width == 1.66667 &&
          streetmixSegments[8].type == "turn-lane" &&
          streetmixSegments[8].variantString == "outbound|left-straight" &&
          streetmixSegments[8].width == 10 &&
          streetmixSegments[9].type == "drive-lane" &&
          streetmixSegments[9].variantString == "outbound|car" &&
          streetmixSegments[9].width == 11.66667 &&
          streetmixSegments[10].type == "parking-lane" &&
          streetmixSegments[10].variantString == "inbound|left" &&
          streetmixSegments[10].width == 3.33333 &&
          streetmixSegments[11].type == "sidewalk" &&
          streetmixSegments[11].width == 5 &&
          streetmixSegments[12].type == "sidewalk" &&
          streetmixSegments[12].width == 6.66667
        )
          window.location.replace("25m.html");

        //30m
        if (
          streetmixSegments[0].type == "sidewalk" &&
          streetmixSegments[0].variantString == "normal" &&
          streetmixSegments[0].width == 8.33333 &&
          streetmixSegments[1].type == "bike-lane" &&
          streetmixSegments[1].variantString == "inbound|regular|road" &&
          streetmixSegments[1].width == 5 &&
          streetmixSegments[2].type == "sidewalk" &&
          streetmixSegments[2].variantString == "empty" &&
          streetmixSegments[2].width == 6.66667 &&
          streetmixSegments[3].type == "parking-lane" &&
          streetmixSegments[3].variantString == "inbound|right" &&
          streetmixSegments[3].width == 3.33333 &&
          streetmixSegments[4].type == "drive-lane" &&
          streetmixSegments[4].variantString == "inbound|car" &&
          streetmixSegments[4].width == 11.66667 &&
          streetmixSegments[5].type == "turn-lane" &&
          streetmixSegments[5].variantString == "inbound|left-straight" &&
          streetmixSegments[5].width == 10 &&
          streetmixSegments[6].type == "parking-lane" &&
          streetmixSegments[6].variantString == "inbound|right" &&
          streetmixSegments[6].width == 1.66667 &&
          streetmixSegments[7].type == "divider" &&
          streetmixSegments[7].variantString == "median" &&
          streetmixSegments[7].width == 6.66667 &&
          streetmixSegments[8].type == "parking-lane" &&
          streetmixSegments[8].variantString == "inbound|left" &&
          streetmixSegments[8].width == 1.66667 &&
          streetmixSegments[9].type == "turn-lane" &&
          streetmixSegments[9].variantString == "outbound|left-straight" &&
          streetmixSegments[9].width == 10 &&
          streetmixSegments[10].type == "drive-lane" &&
          streetmixSegments[10].variantString == "outbound|car" &&
          streetmixSegments[10].width == 11.66667 &&
          streetmixSegments[11].type == "parking-lane" &&
          streetmixSegments[11].variantString == "inbound|left" &&
          streetmixSegments[11].width == 3.33333 &&
          streetmixSegments[12].type == "sidewalk" &&
          streetmixSegments[12].variantString == "empty" &&
          streetmixSegments[12].width == 6.66667 &&
          streetmixSegments[13].type == "bike-lane" &&
          streetmixSegments[13].variantString == "outbound|regular|road" &&
          streetmixSegments[13].width == 5 &&
          streetmixSegments[14].type == "sidewalk" &&
          streetmixSegments[14].variantString == "normal" &&
          streetmixSegments[14].width == 8.33333
        )
          window.location.replace("30m.html");

        //40m
        if (
          streetmixSegments[0].type == "sidewalk" &&
          streetmixSegments[0].variantString == "normal" &&
          streetmixSegments[0].width == 8.33333 &&
          streetmixSegments[1].type == "divider" &&
          streetmixSegments[1].variantString == "median" &&
          streetmixSegments[1].width == 5 &&
          streetmixSegments[2].type == "bike-lane" &&
          streetmixSegments[2].variantString == "inbound|regular|road" &&
          streetmixSegments[2].width == 6.66667 &&
          streetmixSegments[3].type == "sidewalk" &&
          streetmixSegments[3].variantString == "empty" &&
          streetmixSegments[3].width == 5 &&
          streetmixSegments[4].type == "parking-lane" &&
          streetmixSegments[4].variantString == "inbound|right" &&
          streetmixSegments[4].width == 3.33333 &&
          streetmixSegments[5].type == "drive-lane" &&
          streetmixSegments[5].variantString == "inbound|sharrow" &&
          streetmixSegments[5].width == 11.66667 &&
          streetmixSegments[6].type == "drive-lane" &&
          streetmixSegments[6].variantString == "inbound|car" &&
          streetmixSegments[6].width == 11.66667 &&
          streetmixSegments[7].type == "turn-lane" &&
          streetmixSegments[7].variantString == "inbound|left-straight" &&
          streetmixSegments[7].width == 10 &&
          streetmixSegments[8].type == "parking-lane" &&
          streetmixSegments[8].variantString == "inbound|right" &&
          streetmixSegments[8].width == 1.66667 &&
          streetmixSegments[9].type == "divider" &&
          streetmixSegments[9].variantString == "median" &&
          streetmixSegments[9].width == 6.66667 &&
          streetmixSegments[10].type == "parking-lane" &&
          streetmixSegments[10].variantString == "inbound|left" &&
          streetmixSegments[10].width == 1.66667 &&
          streetmixSegments[11].type == "turn-lane" &&
          streetmixSegments[11].variantString == "outbound|left-straight" &&
          streetmixSegments[11].width == 10 &&
          streetmixSegments[12].type == "drive-lane" &&
          streetmixSegments[12].variantString == "outbound|car" &&
          streetmixSegments[12].width == 11.66667 &&
          streetmixSegments[13].type == "drive-lane" &&
          streetmixSegments[13].variantString == "outbound|sharrow" &&
          streetmixSegments[13].width == 11.66667 &&
          streetmixSegments[14].type == "parking-lane" &&
          streetmixSegments[14].variantString == "inbound|left" &&
          streetmixSegments[14].width == 3.33333 &&
          streetmixSegments[15].type == "sidewalk" &&
          streetmixSegments[15].variantString == "empty" &&
          streetmixSegments[15].width == 5 &&
          streetmixSegments[16].type == "bike-lane" &&
          streetmixSegments[16].variantString == "outbound|regular|road" &&
          streetmixSegments[16].width == 6.66667 &&
          streetmixSegments[17].type == "divider" &&
          streetmixSegments[17].variantString == "median" &&
          streetmixSegments[17].width == 5 &&
          streetmixSegments[18].type == "sidewalk" &&
          streetmixSegments[18].variantString == "normal" &&
          streetmixSegments[18].width == 8.33333
        )
          window.location.replace("40m.html");

        let totalWidth = 0;
        for (let i = 0; i < streetmixSegments.length; i++) {
          totalWidth += parseFloat(streetmixSegments[i].width);
        }
        el.setAttribute("totalWidth", totalWidth * 0.3048);

        if (data.showBuildings) {
          el.setAttribute(
            "street",
            "right",
            streetmixResponseObject.data.street.rightBuildingVariant
          );
          el.setAttribute(
            "street",
            "left",
            streetmixResponseObject.data.street.leftBuildingVariant
          );
        }
        el.setAttribute("street", "type", "streetmixSegmentsFeet");
        // set JSON attribute last or it messes things up
        el.setAttribute(
          "street",
          "JSON",
          JSON.stringify({ streetmixSegmentsFeet: streetmixSegments })
        );
      } else {
        // We reached our target server, but it returned an error
        console.log(
          "[streetmix-loader]",
          "Loading Error: We reached the target server, but it returned an error"
        );
      }
    };
    request.onerror = function () {
      // There was a connection error of some sort
      console.log(
        "[streetmix-loader]",
        "Loading Error: There was a connection error of some sort"
      );
    };
    request.send();
  },
});
