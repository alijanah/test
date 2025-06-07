
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RaceDurationCalculator = () => {
  const [durationHours, setDurationHours] = useState<number>(0);
  const [durationMinutes, setDurationMinutes] = useState<number>(0);
  const [consumptionPerLap, setConsumptionPerLap] = useState<number>(0);
  const [lapTimeMinutes, setLapTimeMinutes] = useState<number>(0);
  const [lapTimeSeconds, setLapTimeSeconds] = useState<number>(0);
  const [fuelNeeded, setFuelNeeded] = useState<number>(0);
  const [totalLaps, setTotalLaps] = useState<number>(0);

  useEffect(() => {
    calculateFuel();
  }, [durationHours, durationMinutes, consumptionPerLap, lapTimeMinutes, lapTimeSeconds]);

  const calculateFuel = () => {
    // Convert total race duration to seconds
    const totalRaceSeconds = (durationHours * 3600) + (durationMinutes * 60);
    
    // Convert lap time to seconds
    const lapTimeInSeconds = (lapTimeMinutes * 60) + lapTimeSeconds;
    
    if (totalRaceSeconds > 0 && lapTimeInSeconds > 0 && consumptionPerLap > 0) {
      // Calculate number of laps
      const numberOfLaps = totalRaceSeconds / lapTimeInSeconds;
      setTotalLaps(Math.floor(numberOfLaps));
      
      // Calculate fuel needed and round up
      const fuel = Math.ceil(numberOfLaps * consumptionPerLap);
      setFuelNeeded(fuel);
    } else {
      setFuelNeeded(0);
      setTotalLaps(0);
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-orange-500/20 bg-gradient-to-br from-orange-50/5 to-red-50/5">
        <CardHeader>
          <CardTitle className="text-orange-400">Race Duration Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="duration-hours">Race Duration (Hours)</Label>
              <Input
                id="duration-hours"
                type="number"
                min="0"
                value={durationHours || ''}
                onChange={(e) => setDurationHours(Number(e.target.value))}
                placeholder="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="duration-minutes">Race Duration (Minutes)</Label>
              <Input
                id="duration-minutes"
                type="number"
                min="0"
                max="59"
                value={durationMinutes || ''}
                onChange={(e) => setDurationMinutes(Number(e.target.value))}
                placeholder="0"
                className="mt-1"
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="consumption">Consumption Per Lap (litres)</Label>
            <Input
              id="consumption"
              type="number"
              step="0.1"
              min="0"
              value={consumptionPerLap || ''}
              onChange={(e) => setConsumptionPerLap(Number(e.target.value))}
              placeholder="0.0"
              className="mt-1"
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="lap-minutes">Average Lap Time (Minutes)</Label>
              <Input
                id="lap-minutes"
                type="number"
                min="0"
                value={lapTimeMinutes || ''}
                onChange={(e) => setLapTimeMinutes(Number(e.target.value))}
                placeholder="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lap-seconds">Average Lap Time (Seconds)</Label>
              <Input
                id="lap-seconds"
                type="number"
                min="0"
                max="59"
                step="0.1"
                value={lapTimeSeconds || ''}
                onChange={(e) => setLapTimeSeconds(Number(e.target.value))}
                placeholder="0.0"
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-gradient-to-br from-green-50/5 to-blue-50/5">
        <CardHeader>
          <CardTitle className="text-green-400">Calculation Results</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                {fuelNeeded} litres
              </div>
              <p className="text-muted-foreground">
                Minimum fuel needed
              </p>
              {fuelNeeded > 0 && (
                <p className="text-sm text-muted-foreground mt-2">
                  (Rounded up to the nearest litre)
                </p>
              )}
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {totalLaps} laps
              </div>
              <p className="text-muted-foreground">
                Total number of laps
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RaceDurationCalculator;
