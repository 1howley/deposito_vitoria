import { Input } from "../atoms/input";
import { Label } from "../atoms/label";

export function FormField({
    id,
    label,
    type = "text",
    placeholder,
    value,
    onChange,
    disabled,
    icon: Icon,
}) {
    return (
        <div className="space-y-2">
            <Label htmlFor={id}>{label}</Label>
            <div className="relative">
                {Icon && (
                    <Icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                )}
                <Input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    onChange={onChange}
                    className={Icon ? "pl-10" : ""}
                    disabled={disabled}
                />
            </div>
        </div>
    );
}
