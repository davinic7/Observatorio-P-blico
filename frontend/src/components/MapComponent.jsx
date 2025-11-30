import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const MapComponent = ({ empresas }) => {
    const [position, setPosition] = useState([-28.4696, -65.7852]); // Catamarca coordinates

    return (
        <MapContainer center={position} zoom={13} style={{ height: '500px', width: '100%' }}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {empresas.map((empresa) => (
                empresa.ubicacion && (
                    <Marker
                        key={empresa.id}
                        position={[
                            empresa.ubicacion.coordinates[1],
                            empresa.ubicacion.coordinates[0]
                        ]}
                    >
                        <Popup>
                            <strong>{empresa.razon_social}</strong><br />
                            {empresa.rubro_sector}<br />
                            Dotación: {empresa.dotacion_personal}
                        </Popup>
                    </Marker>
                )
            ))}
        </MapContainer>
    );
};

export default MapComponent;
