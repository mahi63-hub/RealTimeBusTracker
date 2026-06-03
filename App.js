import MapView, {Marker} from 'react-native-maps';
import { Button, View } from 'react-native';
import {useState, useEffect} from 'react';

export default function App() {
  const [buses, setBuses] = useState([
    {
      id: 1,
      latitude: 16.506,
      longitude: 80.648,
    },
    {
      id: 2,
      latitude: 16.508,
      longitude: 80.650,
    },
    {
      id: 3,
      latitude: 16.504,
      longitude: 80.646,
    },
  ]);

  useEffect(()  => {
    const interval = setInterval(() => {
      setBuses(prevBuses => prevBuses.map(bus =>({
        ...bus, 
        latitude: bus.latitude + 0.001,
        longitude: bus.longitude + 0.001,
      })))
    }, 2000);

    return () => clearInterval(interval);
  }, []);


  return (
    <View style={{ flex: 1 }}>
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: 16.506,
        longitude: 80.648,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
      }}
    >
      {buses.map((bus) => (
        <Marker
          key={bus.id}
          coordinate={{ latitude: bus.latitude, longitude: bus.longitude }}
          title={`Bus ${bus.id}`}
          description="Current Bus Location"
        />
      ))}
    </MapView>

  </View>
  );
}