import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dispatch, SetStateAction } from "react";

export function SelectNetwork({
  setValue,
  placeholder,
  simplified = false,
}: {
  setValue: Dispatch<SetStateAction<any>>;
  placeholder?: string;
  simplified?: boolean;
}) {
  return (
    <Select onValueChange={setValue}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder={placeholder ?? "Select a Network"} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="mainnet">Mainnet</SelectItem>
          {simplified ? (
            <SelectItem value="testnet">Testnet</SelectItem>
          ) : (
            <>
              <SelectItem value="preprod">Preprod</SelectItem>
              <SelectItem value="preview">Preview</SelectItem>
            </>
          )}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}

export function SelectService({
  setValue,
}: {
  setValue: Dispatch<SetStateAction<any>>;
}) {
  return (
    <Select onValueChange={setValue}>
      <SelectTrigger className="w-[240px]">
        <SelectValue placeholder="Select a Provider" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="blockfrost">Blockfrost</SelectItem>
          <SelectItem value="maestro">Maestro</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
