import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, RotateCcw, Thermometer, Droplets } from "lucide-react";

interface HeatIndexResult {
  heatIndex: number;
  classification: string;
  classificationColor: string;
  warning: string;
  warningColor: string;
}

const calculateHeatIndex = (tempC: number, rh: number): HeatIndexResult => {
  // Convert Celsius to Fahrenheit
  // const tempF = tempC * (9 / 5) + 32;

  // NOAA Heat Index regression coefficients
  const c1 = -8.78469475556;
  const c2 = 1.61139411;
  const c3 = 2.33854883889;
  const c4 = -0.14611605;
  const c5 = -0.012308094;
  const c6 = -0.0164248277778;
  const c7 = 2.211732e-3;
  const c8 = 7.2546e-4;
  const c9 = -3.582e-6;

  // Calculate Heat Index in Fahrenheit
  const hiC =
    c1 +
    c2 * tempC +
    c3 * rh +
    c4 * tempC * rh +
    c5 * tempC * tempC +
    c6 * rh * rh +
    c7 * tempC * tempC * rh +
    c8 * tempC * rh * rh +
    c9 * tempC * tempC * rh * rh;

  // Convert back to Celsius
  // const hiC = (hiF - 32) * (5 / 9);

  // Determine classification and warning
  if (hiC < 27) {
    return {
      heatIndex: hiC,
      classification: "Normal / Nyaman",
      classificationColor: "text-status-normal",
      warning: "",
      warningColor: "",
    };
  } else if (hiC >= 27 && hiC <= 32) {
    return {
      heatIndex: hiC,
      classification: "Waspada",
      classificationColor: "text-status-caution",
      warning:
        "Kelelahan dapat terjadi bila terpapar lama. Jika tetap beraktivitas, dapat mengalami kram panas.",
      warningColor: "text-status-caution",
    };
  } else if (hiC > 32 && hiC < 40) {
    return {
      heatIndex: hiC,
      classification: "Ekstra Waspada",
      classificationColor: "text-status-warning",
      warning:
        "Kram panas dan kelelahan panas sangat mungkin terjadi. Sengatan panas (heat stroke) dapat terjadi dengan aktivitas yang berkepanjangan.",
      warningColor: "text-status-warning",
    };
  } else if (hiC >= 40 && hiC < 53) {
    return {
      heatIndex: hiC,
      classification: "Bahaya",
      classificationColor: "text-status-danger",
      warning:
        "Sengatan panas (heat stroke) mungkin terjadi. Sangat disarankan untuk membatasi aktivitas luar ruangan.",
      warningColor: "text-status-danger",
    };
  } else {
    return {
      heatIndex: hiC,
      classification: "Sangat Berbahaya",
      classificationColor: "text-status-extreme",
      warning:
        "Sengatan panas (heat stroke) sangat mungkin terjadi dan dapat berakibat fatal.",
      warningColor: "text-status-extreme",
    };
  }
};

const HeatIndexCalculator = () => {
  const [temperature, setTemperature] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");
  const [result, setResult] = useState<HeatIndexResult | null>(null);
  const [errors, setErrors] = useState<{ temp?: string; rh?: string }>({});

  const validateInputs = (): boolean => {
    const newErrors: { temp?: string; rh?: string } = {};
    const temp = parseFloat(temperature);
    const rh = parseFloat(humidity);

    if (isNaN(temp)) {
      newErrors.temp = "Masukkan suhu yang valid";
    }

    if (isNaN(rh)) {
      newErrors.rh = "Masukkan kelembapan yang valid";
    } else if (rh < 0 || rh > 100) {
      newErrors.rh = "Kelembapan harus antara 0-100%";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCalculate = () => {
    if (!validateInputs()) return;

    const temp = parseFloat(temperature);
    const rh = parseFloat(humidity);
    const calculatedResult = calculateHeatIndex(temp, rh);
    setResult(calculatedResult);
  };

  const handleReset = () => {
    setTemperature("");
    setHumidity("");
    setResult(null);
    setErrors({});
  };

  return (
    <div className="space-y-6">
      {/* Input Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="hi-temp" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Thermometer className="h-4 w-4 text-primary" />
            Suhu Udara (T)
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="hi-temp"
              type="number"
              value={temperature}
              onChange={(e) => setTemperature(e.target.value)}
              placeholder="Masukkan suhu"
              className="flex-1"
            />
            <span className="text-sm font-medium text-muted-foreground min-w-[32px]">°C</span>
          </div>
          {errors.temp && <p className="text-sm text-destructive">{errors.temp}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="hi-rh" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Droplets className="h-4 w-4 text-secondary" />
            Kelembapan Relatif (RH)
          </Label>
          <div className="flex items-center gap-2">
            <Input
              id="hi-rh"
              type="number"
              value={humidity}
              onChange={(e) => setHumidity(e.target.value)}
              placeholder="Masukkan kelembapan"
              className="flex-1"
            />
            <span className="text-sm font-medium text-muted-foreground min-w-[32px]">%</span>
          </div>
          {errors.rh && <p className="text-sm text-destructive">{errors.rh}</p>}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <Button onClick={handleCalculate} className="flex-1 gap-2">
          <Calculator className="h-4 w-4" />
          Hitung
        </Button>
        <Button onClick={handleReset} variant="secondary" className="flex-1 gap-2">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Results */}
      {result && (
        <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border animate-in fade-in-50 duration-300">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Heat Index (HI)</Label>
            <div className="flex items-center gap-2">
              <Input
                value={result.heatIndex.toFixed(1)}
                readOnly
                className="flex-1 font-semibold text-lg bg-card"
              />
              <span className="text-sm font-medium text-muted-foreground min-w-[32px]">°C</span>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Klasifikasi</Label>
            <p className={`text-lg font-semibold ${result.classificationColor}`}>
              {result.classification}
            </p>
          </div>

          {result.warning && (
            <div className={`p-3 rounded-md border ${result.warningColor} bg-card/50`}>
              <p className={`text-sm ${result.warningColor}`}>
                ⚠️ {result.warning}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HeatIndexCalculator;
