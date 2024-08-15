import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface YearSelectorProps {
    year: number;
    setYear: (year: number) => void;
}

export const YearSelector = ({year, setYear}: YearSelectorProps) => {
    const years = Array.from({ length: 2 }, (_, index) => 2024 + index);
    return <Select
        value={year?.toString()}
        onValueChange={(value) => {
            setYear(Number(value))
        }}
    >
        <SelectTrigger className="pr-1.5 w-24">
            <SelectValue>{year}</SelectValue>
        </SelectTrigger>
        <SelectContent position="popper" className="w-24">
                {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                        {year}
                    </SelectItem>
                ))}
        </SelectContent>
    </Select>
}