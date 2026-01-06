import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import HeatIndexCalculator from "@/components/HeatIndexCalculator";
import THICalculator from "@/components/THICalculator";
import { Thermometer, CloudSun } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background py-8 px-4">
      {/* Header */}
      <div className="max-w-lg mx-auto mb-8 text-center">
        <div className="inline-flex items-center justify-center mb-4">
          <img 
            src="/Logo_BMKG.png" 
            alt="BMKG Logo" 
            className="h-24 w-auto"
          />
        </div>
        <h1 className="text-xl md:text-2xl font-bold text-foreground mb-2">
          Kalkulator Indeks Kenyamanan Termal
        </h1>
        <p className="text-muted-foreground text-sm md:text-base">
          Hitung tingkat kenyamanan termal berdasarkan suhu dan kelembapan udara
        </p>
      </div>

      {/* Main Calculator Card */}
      <div className="max-w-lg mx-auto">
        <Tabs defaultValue="thi" className="w-full space-y-2">
          {/* Tab Switcher */}
          <Card className="shadow-lg border-0 overflow-hidden">
            <TabsList className="w-full grid grid-cols-2 h-auto p-1 bg-muted rounded-lg">
              <TabsTrigger value="thi" className="gap-2 py-3">
                <CloudSun className="h-4 w-4" />
                <span className="hidden sm:inline">THI - Tropis</span>
                <span className="sm:hidden">THI</span>
              </TabsTrigger>
              <TabsTrigger value="heat-index" className="gap-2 py-3">
                <Thermometer className="h-4 w-4" />
                <span className="hidden sm:inline">THI - Subtropis</span>
                <span className="sm:hidden">THI - Subtropis </span>
              </TabsTrigger>
            </TabsList>
          </Card>

          {/* Calculator Content */}
          <Card className="shadow-xl border-0 overflow-hidden">
            <TabsContent value="thi" className="m-0">
              <CardHeader className="bg-primary text-primary-foreground pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <CloudSun className="h-5 w-5" />
                  Kalkulator Indeks Kenyamanan (THI) - Tropis
                </CardTitle>
                <p className="text-primary-foreground/80 text-sm">
                  Rumus Nieuwolt untuk iklim tropis
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <THICalculator />
              </CardContent>
            </TabsContent>

            <TabsContent value="heat-index" className="m-0">
              <CardHeader className="bg-primary text-primary-foreground pb-4">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  <Thermometer className="h-5 w-5" />
                  Kalkulator Heat Index (NWS/NOAA)
                </CardTitle>
                <p className="text-primary-foreground/80 text-sm">
                  Metode standar NOAA untuk menghitung indeks panas
                </p>
              </CardHeader>
              <CardContent className="pt-6">
                <HeatIndexCalculator />
              </CardContent>
            </TabsContent>
          </Card>
        </Tabs>

        {/* Footer Info */}
        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p>Data referensi: NOAA/NWS Heat Index & Nieuwolt THI Formula</p>
          <p className="mt-1">© 2026 Kalkulator Indeks Kenyamanan Termal</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
