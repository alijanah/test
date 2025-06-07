
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const RaceLapsCalculator = () => {
  const [raceLaps, setRaceLaps] = useState<number>(0);
  const [consumptionPerLap, setConsumptionPerLap] = useState<number>(0);
  const [lapTimeMinutes, setLapTimeMinutes] = useState<number>(0);
  const [lapTimeSeconds, setLapTimeSeconds] = useState<number>(0);
  const [fuelNeeded, setFuelNeeded] = useState<number>(0);
  const [totalDuration, setTotalDuration] = useState<string>('');

  useEffect(() => {
    calculateFuelAndDuration();
  }, [raceLaps, consumptionPerLap, lapTimeMinutes, lapTimeSeconds]);

  const calculateFuelAndDuration = () => {
    if (raceLaps > 0 && consumptionPerLap > 0) {
      // Calculate fuel needed and round up
      const fuel = Math.ceil(raceLaps * consumptionPerLap);
      setFuelNeeded(fuel);
    } else {
      setFuelNeeded(0);
    }

    // Calculate total race duration
    if (raceLaps > 0 && (lapTimeMinutes > 0 || lapTimeSeconds > 0)) {
      const lapTimeInSeconds = (lapTimeMinutes * 60) + lapTimeSeconds;
      const totalSeconds = raceLaps * lapTimeInSeconds;
      
      const hours = Math.floor(totalSeconds / 3600);
      const minutes = Math.floor((totalSeconds % 3600) / 60);
      const seconds = Math.floor(totalSeconds % 60);
      
      let durationString = '';
      if (hours > 0) {
        durationString += `${hours}h `;
      }
      if (minutes > 0 || hours > 0) {
        durationString += `${minutes}m `;
      }
      durationString += `${seconds}s`;
      
      setTotalDuration(durationString.trim());
    } else {
      setTotalDuration('');
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/20 bg-gradient-to-br from-blue-50/5 to-purple-50/5">
        <CardHeader>
          <CardTitle className="text-blue-400">Race Laps Input</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="race-laps">Race Laps (number of laps)</Label>
            <Input
              id="race-laps"
              type="number"
              min="0"
              value={raceLaps || ''}
              onChange={(e) => setRaceLaps(Number(e.target.value))}
              placeholder="0"
              className="mt-1"
            />
          </div>
          
          <div>
            <Label htmlFor="consumption-laps">Consumption Per Lap (litres)</Label>
            <Input
              id="consumption-laps"
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
              <Label htmlFor="lap-minutes-laps">Average Lap Time (Minutes)</Label>
              <Input
                id="lap-minutes-laps"
                type="number"
                min="0"
                value={lapTimeMinutes || ''}
                onChange={(e) => setLapTimeMinutes(Number(e.target.value))}
                placeholder="0"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="lap-seconds-laps">Average Lap Time (Seconds)</Label>
              <Input
                id="lap-seconds-laps"
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
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-400 mb-2">
              {fuelNeeded} litres
            </div>
            <p className="text-muted-foreground">
              Minimum fuel needed for this session
            </p>
            {fuelNeeded > 0 && (
              <p className="text-sm text-muted-foreground">
                (Rounded up to the nearest litre)
              </p>
            )}
          </div>
          
          {totalDuration && (
            <div className="border-t pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400 mb-2">
                  {totalDuration}
                </div>
                <p className="text-muted-foreground">
                  Total race duration
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default RaceLapsCalculator;
