import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calculator, RotateCcw, Thermometer, Droplets } from "lucide-react";
interface THIResult {
  thi: number;
  classification: string;
  classificationColor: string;
}
const calculateTHI = (tempC: number, rh: number): THIResult => {
  // Nieuwolt formula for tropical THI
  const thi = 0.8 * tempC + rh * tempC / 500;

  // Determine classification
  if (thi < 29) {
    return {
      thi,
      classification: "Nyaman",
      classificationColor: "text-status-normal"
    };
  } else if (thi >= 29 && thi <= 30.5) {
    return {
      thi,
      classification: "Tidak Nyaman",
      classificationColor: "text-status-warning"
    };
  } else {
    return {
      thi,
      classification: "Sangat Tidak Nyaman",
      classificationColor: "text-status-danger"
    };
  }
};
const THICalculator = () => {
  const [temperature, setTemperature] = useState<string>("");
  const [humidity, setHumidity] = useState<string>("");
  const [result, setResult] = useState<THIResult | null>(null);
  const [errors, setErrors] = useState<{
    temp?: string;
    rh?: string;
  }>({});
  const validateInputs = (): boolean => {
    const newErrors: {
      temp?: string;
      rh?: string;
    } = {};
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
    const calculatedResult = calculateTHI(temp, rh);
    setResult(calculatedResult);
  };
  const handleReset = () => {
    setTemperature("");
    setHumidity("");
    setResult(null);
    setErrors({});
  };
  return <div className="space-y-6">
      {/* Input Fields */}
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="thi-temp" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Thermometer className="h-4 w-4 text-primary" />
            Suhu Udara (T)
          </Label>
          <div className="flex items-center gap-2">
            <Input id="thi-temp" type="number" value={temperature} onChange={e => setTemperature(e.target.value)} placeholder="Masukkan suhu" className="flex-1" />
            <span className="text-sm font-medium text-muted-foreground min-w-[32px]">°C</span>
          </div>
          {errors.temp && <p className="text-sm text-destructive">{errors.temp}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="thi-rh" className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Droplets className="h-4 w-4 text-secondary" />
            Kelembapan Relatif (RH)
          </Label>
          <div className="flex items-center gap-2">
            <Input id="thi-rh" type="number" value={humidity} onChange={e => setHumidity(e.target.value)} placeholder="Masukkan kelembapan" className="flex-1" />
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
      {result && <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border animate-in fade-in-50 duration-300">
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">THI (Temperature Humidity Index)</Label>
            <div className="flex items-center gap-2">
              <Input value={result.thi.toFixed(2)} readOnly className="flex-1 font-semibold text-lg bg-card" />
              <span className="text-sm font-medium text-muted-foreground min-w-[32px]">°C</span>
            </div>
          </div>

          <div className="space-y-1">
            <Label className="text-sm font-medium text-muted-foreground">Klasifikasi</Label>
            <p className={`text-lg font-semibold ${result.classificationColor}`}>
              {result.classification}
            </p>
          </div>

          {/* Comfort indicator */}
          <div className="flex items-center gap-2 pt-2">
            <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
              <div className={`h-full transition-all duration-500 ${result.thi < 29 ? "bg-status-normal w-1/3" : result.thi <= 30.5 ? "bg-status-warning w-2/3" : "bg-status-danger w-full"}`} />
            </div>
            <span className="text-xs text-muted-foreground">
              {result.thi < 29 ? "Baik" : result.thi <= 30.5 ? "Sedang" : "Buruk"}
            </span>
          </div>
        </div>}
    </div>;
};
export default THICalculator;