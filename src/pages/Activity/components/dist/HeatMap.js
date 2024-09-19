"use strict";
// import React, { useEffect } from 'react';
// import { MapContainer, TileLayer, useMap } from 'react-leaflet';
// import L from 'leaflet';
// import 'leaflet.heat';
// import { ProCard } from '@ant-design/pro-components';
exports.__esModule = true;
// const HeatMap = () => {
//   const points = [
//     // Global coordinates for heatmap (e.g., San Francisco, London, etc.)
//     [37.7749, -122.4194], [34.0522, -118.2437], [51.5074, -0.1278], 
//     [35.6895, 139.6917], [19.4326, -99.1332], [-33.8688, 151.2093], 
//     [48.8566, 2.3522], [40.7128, -74.0060], [55.7558, 37.6173], 
//     [28.6139, 77.2090], [-23.5505, -46.6333], [1.3521, 103.8198],
//     [39.9042, 116.4074], [41.9028, 12.4964], [30.0444, 31.2357],
//   ];
//   function HeatLayer() {
//     const map = useMap();
//     useEffect(() => {
//       const heatLayer = L.heatLayer(points, { radius: 25, blur: 15 }).addTo(map);
//       return () => {
//         map.removeLayer(heatLayer);
//       };
//     }, [map]);
//     return null;
//   }
//   return (
//     <ProCard
//       title="World Heat Map"
//       style={{ marginBottom: 24, height: '350px' }} // Adjust the height of the card
//       bordered
//       bodyStyle={{ padding: 0, height: '100%', overflow: 'hidden' }} // Prevent overflow
//     >
//       <div style={{ height: '100%', width: '100%', overflow: 'hidden' }}>
//         <MapContainer
//           center={[0, 0]} // Center the map on the equator and prime meridian
//           zoom={2} // Set zoom level to show the entire world
//           style={{ height: '100%', width: '100%' }} // Ensure the map fits within the container
//           scrollWheelZoom={false} // Disable scroll wheel zoom if desired
//         >
//           <TileLayer
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//             attribution="&copy; OpenStreetMap contributors"
//           />
//           <HeatLayer />
//         </MapContainer>
//       </div>
//     </ProCard>
//   );
// };
// export default HeatMap;
var react_1 = require("react");
var react_leaflet_1 = require("react-leaflet");
require("leaflet/dist/leaflet.css");
var leaflet_1 = require("leaflet");
require("leaflet.heat");
var pro_components_1 = require("@ant-design/pro-components");
var HeatMap = function () {
    var points = [
        [37.7749, -122.4194], [34.0522, -118.2437], [51.5074, -0.1278],
        [35.6895, 139.6917], [19.4326, -99.1332], [-33.8688, 151.2093],
        [48.8566, 2.3522], [40.7128, -74.0060], [55.7558, 37.6173],
        [28.6139, 77.2090], [-23.5505, -46.6333], [1.3521, 103.8198],
        [39.9042, 116.4074], [41.9028, 12.4964], [30.0444, 31.2357],
    ];
    var HeatLayer = function () {
        var map = react_leaflet_1.useMap();
        react_1.useEffect(function () {
            var heatLayer = leaflet_1["default"].heatLayer(points, { radius: 25, blur: 15 }).addTo(map);
            return function () {
                map.removeLayer(heatLayer);
            };
        }, [map]);
        return null;
    };
    return (react_1["default"].createElement(pro_components_1.ProCard, { title: "World Heat Map", style: { marginBottom: 24, height: '500px' }, bordered: true, bodyStyle: { padding: 0, height: '100%', overflow: 'hidden' } },
        react_1["default"].createElement("div", { style: { height: '100%', width: '100%' } },
            react_1["default"].createElement(react_leaflet_1.MapContainer, { center: [0, 0], zoom: 2, style: { height: '100%', width: '100%' }, scrollWheelZoom: false, minZoom: 2, maxZoom: 19 },
                react_1["default"].createElement(react_leaflet_1.TileLayer, { url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", attribution: "\u00A9 OpenStreetMap contributors" }),
                react_1["default"].createElement(HeatLayer, null)))));
};
exports["default"] = HeatMap;
