
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import RaceDurationCalculator from '@/components/RaceDurationCalculator';
import RaceLapsCalculator from '@/components/RaceLapsCalculator';
import { Clock, Target } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-foreground p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            Sim Racing Fuel Calculator
          </h1>
          <p className="text-lg text-muted-foreground">
            Calculate the exact fuel needed for your racing sessions
          </p>
        </div>

        <Card className="backdrop-blur-sm bg-card/90 border-border">
          <CardHeader>
            <CardTitle className="text-center text-2xl">Choose Calculation Method</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="duration" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="duration" className="flex items-center gap-2">
                  <Clock size={18} />
                  By Race Duration
                </TabsTrigger>
                <TabsTrigger value="laps" className="flex items-center gap-2">
                  <Target size={18} />
                  By Race Laps
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="duration">
                <RaceDurationCalculator />
              </TabsContent>
              
              <TabsContent value="laps">
                <RaceLapsCalculator />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Professional fuel calculations for sim racing sessions</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
