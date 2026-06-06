import React, { useEffect, useState } from 'react';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { View } from 'react-native';

export default function App() {
  const [buses, setBuses] = useState([]);

  const routeCoordinates = [
    {
      latitude: 16.506,
      longitude: 80.648,
    },
    {
      latitude: 16.507,
      longitude: 80.649,
    },
    {
      latitude: 16.508,
      longitude: 80.650,
    },
    {
      latitude: 16.509,
      longitude: 80.651,
    },
  ];

  useEffect(() => {
    const ws = new WebSocket('ws://192.168.1.5:8080');
    ws.onopen = () => {
      console.log('Connected to WebSocket Server');
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);

      setBuses(data);
    };

    ws.onerror = (error) => {
      console.log('WebSocket Error:', error.message);
    };

    ws.onclose = () => {
      console.log('WebSocket Disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 16.506,
          longitude: 80.648,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Polyline
          coordinates={routeCoordinates}
          strokeWidth={5}
        />

        {buses.map((bus) => (
          <Marker
            key={bus.id}
            coordinate={{
              latitude: bus.latitude,
              longitude: bus.longitude,
            }}
            title={`Bus ${bus.id}`}
            description="Current Bus Location"
          />
        ))}
      </MapView>
    </View>
  );
}